(ns doralprops.core
  (:require [ring.util.response :as response]
            [ring.adapter.jetty :as jetty])
  (:use [ring.middleware.params :only [wrap-params]]))

(def ^:const target-param "_escaped_fragment_")
(def ^:const body-404 "<h1>404 Not found</h1>")

(defn handler [request]
  (if-let [escaped-fragment (get (:query-params request) target-param)]
    (-> (response/response escaped-fragment)
        (response/header "Content-Type" "text/html"))
    (response/not-found body-404)))

(def app
  (-> handler
      wrap-params))

(defn -main []
  (jetty/run-jetty app {:port 8000 :join? false}))
