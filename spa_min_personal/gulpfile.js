'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var cssnano = require('gulp-cssnano');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var imagemin = require('gulp-imagemin');

gulp.task('workflow', function() {
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

gulp.task('imagemin', function() {
    gulp.src('./images/**/*', { cwd: 'src' })
        .pipe(imagemin())
        .pipe(gulp.dest('./dist/images/'));
});

gulp.task('copy_index', function() {
    gulp.src('index.html', { cwd: 'src' })
        .pipe(gulp.dest('./dist/'));
});

gulp.task('default', function() {
    gulp.watch('src/**/*', ['imagemin', 'copy_index', 'workflow']);
});