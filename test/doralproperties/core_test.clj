(ns doralproperties.core-test
  (:use clojure.test
        doralproperties.core
        [ring.mock.request :only [request]]))

(deftest handler-without-escaped-fragment
  (let [response (app (request :get "/"))]
    (is (= (:status response) 404))))

(deftest handler-with-escaped-fragment
  (let [response (app (request :get "/?_escaped_fragment_="))]
    (is (= (:status response) 200))))
