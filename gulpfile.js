'use strict';

var gulp         = require('gulp');
var stylus       = require('gulp-stylus');
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
var plumber      = require('gulp-plumber');

var dir = {
  src: {
    css   : 'src/stylus',
    js    : 'src/js',
    images: 'src/images'
  },
  dist: {
    css   : './',
    js    : 'assets/js',
    images: 'assets/images'
  }
}

/**
 * Build CSS
 */
gulp.task('css', function() {
  return stylusCompile(dir.src.css + '/*.styl', dir.dist.css);
});

function stylusCompile(src, dest) {
  return gulp.src(src)
    .pipe(plumber())
    .pipe(stylus({
      'resolve url nocheck': true
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
    .pipe(plumber())
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
  rimraf(dir.dist.images, cb);
});

/**
 * Copy images to assets directory
 */
gulp.task('copy-images',['remove-images'], function() {
  return gulp.src(dir.src.images + '/**/*')
    .pipe(gulp.dest(dir.dist.images));
});

/**
 * Build Mimizuku
 */
gulp.task('build', ['css', 'js', 'copy-images']);

/**
 * browsersync
 */
gulp.task('browsersync', function() {
  browser_sync.init({
    proxy: '127.0.0.1:8080',
		files: [
      '**/*.php',
      dir.dist.js + '/app.min.js',
      dir.dist.css + 'style.min.css'
		]
  });
});

/**
 * Auto build and browsersync
 */
gulp.task('default', ['build', 'browsersync'], function() {
  gulp.watch([dir.src.css + '/**/*.styl'], ['css']);
  gulp.watch([dir.src.js + '/**/*.js'] , ['js']);
  gulp.watch([dir.src.images + '/**/*'] , ['copy-images']);
});
