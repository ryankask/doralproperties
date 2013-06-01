(defproject doralprops "0.1.0-SNAPSHOT"
  :description "Doral Properties crawler template rendering."
  :url "https://github.com/ryankask/doralproperties"
  :dependencies [[org.clojure/clojure "1.5.1"]
                 [ring/ring-core "1.1.8"]
                 [ring/ring-jetty-adapter  "1.1.8"]]
  :plugins [[lein-ring "0.8.5"]]
  :profiles {:dev {:dependencies [[ring-mock "0.1.3"]]}}
  :ring {:handler doralprops.core/app}
  :main doralprops.core)
