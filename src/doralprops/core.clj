(ns doralprops.core
  (:require [ring.util.response :as response]
            [ring.adapter.jetty :as jetty]
            [clojure.java.io :as io]
            [me.raynes.laser :as laser])
  (:use [ring.middleware.params :only [wrap-params]]))

(def ^:const target-param "_escaped_fragment_")
(def ^:const uri-partials {"/" "home.html"})
(def ^:const index "index.html")
(def ^:const partials-dir "partials")
(def ^:const body-404 "<h1>404 Not found</h1>")

(defn set-inner-html [template fragment]
  (let [parsed-template (laser/parse template)
        main-div-sel (laser/attr= "role" "main")
        content (laser/content (laser/parse-fragment fragment))]
    (laser/document parsed-template main-div-sel content)))

(defn get-partial-path [uri]
  (.getPath (io/file partials-dir
                     (or (uri-partials uri)
                         (str (.getName (io/file uri)) ".html")))))

(defn render [uri]
  (if-let [sub-template (io/resource (get-partial-path uri))]
    (set-inner-html (io/resource index) sub-template)))

(defn handler [request]
  (if (= ((:query-params request) target-param) "")
    (if-let [rendered-html (render (:uri request))]
     (-> (response/response rendered-html)
          (response/header "Content-Type" "text/html")))))

(defn wrap-error [handler]
  (fn [request]
    (if-let [response (handler request)]
      response
      (response/not-found body-404))))

(def app
  (-> handler
      wrap-params
      wrap-error))

(defn -main []
  (jetty/run-jetty app {:port 8000 :join? false}))
