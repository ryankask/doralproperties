var gulp = require('gulp');
var gutil = require('gulp-util');
var sass = require('gulp-ruby-sass');
var source = require('vinyl-source-stream');
var uglify = require('gulp-uglify');
var isProduction = process.env.NODE_ENV === 'production';

gulp.task('styles', function() {
  return gulp.src('sass/screen.scss')
    .pipe(sass({ compass: true }))
    .on('error', logError)
    .pipe(gulp.dest('app/dist'));
});

gulp.task('browserify', function() {
  return gulpBrowserify();
});

gulp.task('uglify', ['browserify'], function() {
  return gulp.src('app/dist/bundle.js')
    .pipe(uglify({
      mangle: false
    }))
    .pipe(gulp.dest('app/dist'));
});

gulp.task('watch', function() {
  gulpBrowserify({ isWatching: true });
  gulp.watch('sass/**/*.scss', ['styles']);
});

gulp.task('devserver', [], function() {
  startHttpServer();
})

gulp.task('develop', ['styles', 'watch', 'devserver']);

gulp.task('build', ['styles', 'uglify']);

gulp.task('default', ['styles', 'browserify']);

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

  var server = httpServer.createServer({
    root: 'app',
    cache: -1,
    before: [pageMiddleware]
  });

  server.listen(8080, '127.0.0.1', function() {
    gutil.log(bracketed(gutil.colors.green('Dev HTTP Server')), 'running on port 8080');
  });
}

function pageMiddleware(req, res, next) {
  // Treat all requests for "/page/xyz" as requests for "/" since the routing
  // is handled by ngRoute
  if (/^\/page\/[-\w]+$/.test(req.url)) {
    req.url = '/';
  }
  next();
}
