'use strict';

var gulp         = require('gulp');
var sass         = require('gulp-sass');
var sassGlob     = require('gulp-sass-glob');
var postcss      = require('gulp-postcss');
var cssnano      = require('cssnano');
var rename       = require('gulp-rename');
var uglify       = require('gulp-uglify');
var browser_sync = require('browser-sync');
var autoprefixer = require('autoprefixer');
var rimraf       = require('rimraf');
var rollup       = require('gulp-rollup');
var nodeResolve  = require('rollup-plugin-node-resolve');
var commonjs     = require('rollup-plugin-commonjs');
var babel        = require('rollup-plugin-babel');

var dir = {
  src: {
    css: 'src/css',
    js : 'src/js',
    img: 'src/img'
  },
  dist: {
    css: 'assets/css',
    js : 'assets/js',
    img: 'assets/img'
  }
}

/**
 * Build CSS
 */
gulp.task('css', function() {
  return sassCompile(dir.src.css + '/*.scss', dir.dist.css);
});

function sassCompile(src, dest) {
  return gulp.src(src)
    .pipe(sassGlob())
    .pipe(sass({
      includePaths: require('node-normalize-scss').includePaths
    }))
    .pipe(postcss([
      autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
      })
    ]))
    .pipe(gulp.dest(dest))
    .pipe(postcss([
      cssnano({
        'zindex': false
      })
    ]))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(dest))
}

/**
 * Build javascript
 */
gulp.task('js', function() {
  gulp.src(dir.src.js + '/**/*.js')
    .pipe(rollup({
      allowRealFiles: true,
      entry: dir.src.js + '/app.js',
      format: 'iife',
      external: ['jquery', '_', 'Backbone'],
      globals: {
        jquery: "jQuery"
      },
      plugins: [
        nodeResolve({ jsnext: true }),
        commonjs(),
        babel({
          presets: ['es2015-rollup'],
          babelrc: false
        })
      ]
    }))
    .pipe(gulp.dest(dir.dist.js))
    .on('end', function() {
      gulp.src([dir.dist.js + '/app.js'])
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(dir.dist.js));
    });
});

/**
 * Remove images in assets directory
 */
gulp.task('remove-images', function(cb) {
  rimraf(dir.dist.img, cb);
});

/**
 * Copy images to assets directory
 */
gulp.task('img', ['remove-images'], function() {
  return gulp.src(dir.src.img + '/**/*')
    .pipe(gulp.dest(dir.dist.img));
});

/**
 * Build Mimizuku
 */
gulp.task('build', ['css', 'js', 'img']);

/**
 * browsersync
 */
gulp.task('browsersync', function() {
  browser_sync.init({
    proxy: '127.0.0.1:8080',
		files: [
      '**/*.php',
      dir.dist.js + '/app.min.js',
      dir.dist.css + '/style.min.css'
		]
  });
});

/**
 * Auto build and browsersync
 */
gulp.task('default', ['build', 'browsersync'], function() {
  gulp.watch([dir.src.css + '/**/*.scss'], ['css']);
  gulp.watch([dir.src.js + '/**/*.js'] , ['js']);
  gulp.watch([dir.src.img + '/**/*'] , ['img']);
});
