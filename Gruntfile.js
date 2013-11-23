module.exports = function(grunt) {

  grunt.initConfig({
    concat: {
      options: {
        separator: ';',
      },
      dist: {
        src: [
          'app/static/js/vendor/jquery-2.0.3.min.js',
          'app/static/js/vendor/jquery.slides.min.js',
          'app/static/js/vendor/angular.min.js',
          'app/static/js/vendor/angular-route.min.js',
          'app/static/js/vendor/angular-animate.min.js',
          'app/static/js/app.js',
          'app/static/js/directives.js',
          'app/static/js/controllers.js'
        ],
        dest: 'app/static/js/build.js'
      }
    },
    watch: {
      scrits: {
        files: ['app/static/**/*.js'],
        tasks: ['concat'],
        options: {
          spawn: false
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.registerTask('default', ['concat']);
};
