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

    .pipe(gulp.dest('./pre-build/css/'));
});

gulp.task('js_minify', function() {
    gulp.src('./js/**/*', { cwd: 'src' })
        .pipe(uglify())
        .pipe(gulp.dest('./pre-build/js/'));
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
        .pipe(gulp.dest('./pre-build/'));
});

gulp.task('copy_css_js', function() {
    return gulp.src('lib/**/*', { cwd: 'src' })
        .pipe(gulp.dest('./pre-build/lib/'));
});

// Make sure to have the return's
// The difference is, that you need to return the actual task and gulp knows on its own when it's done. To specify the running order of the tasks, you need to add the dependent tasks, which should be finished first, as the second parameter to a task. In my case it's pretty obvious, that the directory needs to be cleaned first, before the concat task may run.


gulp.task('inlinesource', ['pugify', 'copy_css_js'], function() {
    return gulp.src('./pre-build/index.html')
        .pipe(inlinesource())
        .pipe(gulp.dest('./dist'));
});

gulp.task('default', function() {
    gulp.watch('src/**/*', [
        'imagemin', 'css_minify', 'js_minify', 'pugify', 'copy_css_js', 'inlinesource'
    ]);
});