var gulp = require('gulp');
var gutil = require('gulp-util');
var sass = require('gulp-ruby-sass');
var source = require('vinyl-source-stream');

gulp.task('styles', function() {
  return gulp.src('sass/screen.scss')
    .pipe(sass({ compass: true }))
    .on('error', logError)
    .pipe(gulp.dest('app/dist'));
});

gulp.task('browserify', function() {
  return gulpBrowserify();
});

gulp.task('watch', function() {
  gulpBrowserify({ isWatching: true });
  gulp.watch('sass/**/*.scss', ['styles']);
});

gulp.task('develop', ['styles', 'watch'], function() {
  startHttpServer();
});

gulp.task('default', ['styles', 'scripts']);

// Helpers

function bracketed(msg) {
  return '[' + msg + ']';
}

function logError(error) {
  gutil.log(bracketed(gutil.colors.red('Compile Error')), error);
  this.emit('end');
}

function gulpBrowserify(config) {
  config = config || {};
  var isWatching = config.isWatching || false;
  var bundleMethod = config.isWatching ? require('watchify') : require('browserify');
  var bundler = bundleMethod('./app/static/js/app.js');

  if (isWatching) {
    bundler.on('update', rebundle);
    bundler.on('log', function(msg) {
      gutil.log(bracketed(gutil.colors.green('Watchify')), msg);
    });
  }

  function rebundle() {
    return bundler.bundle({ debug: true })
      .on('error', logError)
      .pipe(source('bundle.js'))
      .pipe(gulp.dest('app/dist'));
  }

  return rebundle();
}

function startHttpServer() {
  var httpServer = require('http-server');

  server = httpServer.createServer({
    root: 'app',
    cache: -1
  });

  server.listen(8080, '127.0.0.1', function() {
    gutil.log(bracketed(gutil.colors.green('Dev HTTP Server')), 'running on port 8080');
  });
}
