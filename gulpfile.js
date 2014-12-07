var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    browserify = require('gulp-browserify'),
    concat = require('gulp-concat'),
    gulpif = require('gulp-if'),
    uglify = require('gulp-uglify'),
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish'),
    sequence = require('run-sequence'),
    less = require('gulp-less'),
    zip = require('gulp-zip'),
		rev = require('gulp-rev-append'),
    gutil =  require('gulp-util');

var production = gutil.env.type === "production";
var game_name = gutil.env.name || 'fp'

var paths = {
  source: {
    canvas_js: './app/js/' + game_name + '/canvas.js',
    web_js: './app/js/' + game_name + '/web.js',
    canvas_css: './app/less/' + game_name + '/canvas.less',
    web_css: './app/less/' + game_name + '/web.less',
    baseJsDir: './app/js/**',
    js: './app/js/**/*.js',
    css: './app/less/**/*.less',
		libs: [
    	'./bower_components/phaser/build/phaser.js'
		]
  },
  dest: {
		base: './public/' + game_name + '/',
		html: './public/' + game_name + '/index.html',
    js: './public/' + game_name + '/js',
    css: './public/' + game_name + '/css'
  }
};

gulp.task('rev', function() {
  gulp.src(paths.dest.html)
    .pipe(rev())
    .pipe(gulp.dest(paths.dest.base));
});


gulp.task('copy_libs', function () {
  gulp.src(paths.source.libs)
    .pipe(uglify({outSourceMaps: false}))
    .pipe(gulp.dest(paths.dest.js));
});

gulp.task('canvas_js', function() {
  gulp.src(paths.source.canvas_js)
    .pipe(plumber())
    .pipe(browserify())
    .pipe(concat('canvas.js'))
    .pipe(gulpif(production, uglify()))
    .pipe(gulp.dest(paths.dest.js));
});

gulp.task('web_js', function() {
  gulp.src(paths.source.web_js)
    .pipe(plumber())
    .pipe(browserify())
    .pipe(concat('web.js'))
    .pipe(gulpif(production, uglify()))
    .pipe(gulp.dest(paths.dest.js));
});

gulp.task('canvas_css', function() {
  gulp.src(paths.source.canvas_css)
    .pipe(plumber())
    .pipe(less({ compress: true }))
    .pipe(gulp.dest(paths.dest.css));
});

gulp.task('web_css', function() {
  gulp.src(paths.source.web_css)
    .pipe(plumber())
    .pipe(less({ compress: true }))
    .pipe(gulp.dest(paths.dest.css));
});

gulp.task('lint', function() {
  gulp.src(paths.source.js)
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});

gulp.task('watch', function() {
  gulp.watch(paths.source.baseJsDir, function() {
    sequence('canvas_js', 'web_js', 'lint')
  });
  gulp.watch(paths.source.css, function() {
    sequence('canvas_css', 'web_css')
  })
});

gulp.task('zip', function () {
  return gulp.src([
      'public/' + game_name + '/**/*'
    ])
    .pipe(zip(game_name +'_dist.zip'))
    .pipe(gulp.dest('./dist'))
});

gulp.task('build', [
  'canvas_js',
  'web_js',
  'canvas_css',
  'web_css',
	'rev'
]);
