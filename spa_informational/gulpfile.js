'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var cssnano = require('gulp-cssnano');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var imagemin = require('gulp-imagemin');
var uglify = require('gulp-uglify');
var inlinesource = require('gulp-inline-source');
var pug = require('gulp-pug');

gulp.task('css_minify', function() {
    gulp.src('./src/sass/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(cssnano())
        .pipe(sourcemaps.write('./'))

    .pipe(gulp.dest('./dist/css/'));
});

gulp.task('js_minify', function() {
    gulp.src('./js/**/*', { cwd: 'src' })
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js/'));
});

gulp.task('imagemin', function() {
    gulp.src('./images/**/*', { cwd: 'src' })
        .pipe(imagemin())
        .pipe(gulp.dest('./dist/images/'));
});

// gulp.task('copy_index', function() {
//     gulp.src('index.html', { cwd: 'src' })
//         .pipe(gulp.dest('./dist/'));
// });

gulp.task('pugify', function() {
    return gulp.src('index.pug', { cwd: 'src' })
        .pipe(pug())
        .pipe(gulp.dest('./dist/'));
});

// gulp.task('inlinesource', function() {
//     return gulp.src('./src/index.html')
//         .pipe(inlinesource())
//         .pipe(gulp.dest('./dist'));
// });

gulp.task('default', function() {
    gulp.watch('src/**/*', [
        'imagemin', 'pugify', 'css_minify', 'js_minify'
    ]);
});