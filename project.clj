(defproject doralprops "0.1.0-SNAPSHOT"
  :description "Doral Properties crawler template rendering."
  :url "https://github.com/ryankask/doralproperties"
  :dependencies [[org.clojure/clojure "1.5.1"]
                 [ring/ring-core "1.1.8"]
                 [http-kit "2.1.4"]
                 [me.raynes/laser "1.1.1"]]
  :plugins [[lein-ring "0.8.5"]]
  :profiles {:dev {:dependencies [[ring/ring-jetty-adapter  "1.1.0"]
                                  [ring-mock "0.1.5"]]}}
  :resource-paths ["app"]
  :ring {:handler doralprops.core/app}
  :main doralprops.core)
