(ns doralprops.core-test
  (:use clojure.test
        doralprops.core
        [ring.mock.request :only [request]]))

(defn create-uri [uri & {:keys [fragment-path] :or {fragment-path ""}}]
  (str uri "?" target-param "=" fragment-path))

(defn assert-contains [response text]
  (is (>= (.indexOf (:body response) text) 0)))

(deftest request-without-escaped-fragment-key-404s
  (let [response (app (request :get "/"))]
    (is (= (:status response) 404))
    (assert-contains response body-404)))

(deftest request-with-non-empty-escaped-fragment-value-404s
  (let [uri (create-uri "/" :fragment-path "/test")
        response (app (request :get uri))]
    (is (= (:status response) 404))))

(deftest request-with-valid-uri-returns-html
  (let [response (app (request :get (create-uri "/page/about")))]
    (is (= (:status response) 200))
    (assert-contains response "<h1>About</h1>")))

(deftest only-file-component-of-uri-tested-for-partial
  (let [response (app (request :get (create-uri "/page/unknown/about")))]
    (is (= (:status response) 200) "this should return 404 in the future")
    (assert-contains response "<h1>About</h1>")))

(deftest uri-partials-inspected-for-special-partial-paths
  (let [response (app (request :get (create-uri "/")))]
    (is (= (:status response) 200))
    (assert-contains response "<h1>Welcome</h1>")))
