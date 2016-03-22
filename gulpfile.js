/**
 * Gulp build file
 */
var gulp = require('gulp');

/**
 * Load plugins
 */
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sass   = require('gulp-sass');
var exec   = require('gulp-exec');

var assets = {
  scripts: [
    'assets/jquery/dist/jquery.min.js',
    'assets/angular/angular.min.js',
    'assets/angular-route/angular-route.min.js',
    'assets/angular-resource/angular-resource.min.js',
    'assets/bootstrap/dist/js/bootstrap.min.js'
  ],
  styles: [
    'assets/bootstrap/dist/css/bootstrap.min.css'
  ]
};

var app = {
  scripts: [
    'src/scripts/*.js',
    'src/scripts/**/*.js'
  ],
  styles: [
    'src/styles/*.scss',
    'src/styles/**/*.scss',
  ]
};

/*
 Build assets
*/
gulp.task('assets-scripts', function() {
  return gulp.src(assets.scripts)
    .pipe(concat('assets.min.js'))
    .pipe(gulp.dest('dist'))
});

gulp.task('assets-styles', function() {
  return gulp.src(assets.styles)
    .pipe(concat('assets.min.css'))
    .pipe(gulp.dest('dist'))
});

/*
 Build app
 */
gulp.task('app-scripts', function() {
  return gulp.src(app.scripts)
    .pipe(concat('app.min.js'))
    .pipe(gulp.dest('dist'));
});

gulp.task('app-styles', function() {
    return gulp.src(app.styles)
        .pipe(concat('app.min.css'))
        .pipe(sass({outputStyle: 'compact'}))
        .pipe(gulp.dest('dist'));
});


gulp.task('assets', ['assets-scripts', 'assets-styles']);

gulp.task('app', ['app-scripts', 'app-styles']);


gulp.task('serve', function(){
  gulp.src('')
    .pipe(exec('caddy -conf Caddyfile', {continueOnError: false}));
});

/**
 * Watch less files for changes
 */
gulp.task('watch-scripts', function () {
  gulp.watch([app.scripts], ['app-scripts']);
});

/** 
 * Run development tasks
 */
gulp.task('default', ['styles', 'watch-less']);

/** 
 * Build production app
 */
gulp.task('build', ['scripts', 'styles']);
