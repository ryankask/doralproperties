(ns doralprops.core-test
  (:use clojure.test
        doralprops.core
        [ring.mock.request :only [request]]))

(defn create-escaped-fragment [path]
  (str "/?_escaped_fragment_=" path))

(defn assert-contains [response text]
  (is (>= (.indexOf (:body response) text) 0)))

(deftest handler-without-escaped-fragment-404s
  (let [response (app (request :get "/"))]
    (is (= (:status response) 404))
    (assert-contains response body-404)))

(deftest handler-with-empty-unknown-fragment-404s
  (let [response (app (request :get (create-escaped-fragment "/unknown")))]
    (is (= (:status response) 404))
    (assert-contains response body-404)))

(deftest handler-with-empty-escaped-fragment-returns-index
  (let [response (app (request :get (create-escaped-fragment "")))]
    (is (= (:status response) 200))
    (assert-contains response "class=\"intro\"")))

(deftest handler-with-valid-escaped-fragment-path-returns-html
  (let [path (create-escaped-fragment "/page/services")
        response (app (request :get path))]
    (is (= (:status response) 200))
    (assert-contains response "<h1>Services</h1>")))

(deftest handler-only-inspects-final-path-part-for-partial
  (let [path (create-escaped-fragment "/page/unknonw/services")
        response (app (request :get path))]
    (is (= (:status response) 200) "this should return 404 in the future")
    (assert-contains response "<h1>Services</h1>")))
