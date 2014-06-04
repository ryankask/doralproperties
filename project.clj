(defproject doralprops "0.2.0-SNAPSHOT"
  :description "Doral Properties crawler template rendering."
  :url "https://github.com/ryankask/doralproperties"
  :dependencies [[org.clojure/clojure "1.6.0"]
                 [ring/ring-core "1.3.0"]
                 [http-kit "2.1.18"]
                 [me.raynes/laser "1.1.1"]]
  :plugins [[lein-ring "0.8.5"]]
  :profiles {:dev {:dependencies [[ring/ring-jetty-adapter  "1.3.0"]
                                  [ring-mock "0.1.5"]]}}
  :resource-paths ["app"]
  :ring {:handler doralprops.core/app}
  :main doralprops.core)
