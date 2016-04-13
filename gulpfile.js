/* 
to run this file from command line: npm run gulp (task name)
default task will run if no task name is given
 */

var gulp = require('gulp');
var path = require('path');
var del = require('del');
var fs = require('fs');

var debug = require('gulp-debug');
var runSequence = require('run-sequence');
var swig = require('swig')
var gulpSwig = require('gulp-swig');
var sass = require('gulp-sass');

var paths = {
    build:'./build',
    src: './src',
    templates: './src/templates',
    css: './src/css',
    scripts: './scripts'
}


gulp.task('start-server', function() {
    var express = require('express');
    var app = express();
    var serverPath = path.join(__dirname, build);
    app.use(express.static(serverPath));
    app.listen(4000);
});

gulp.task('compile-html', function() {

    function swigSortOnKey(input, sortKey, reverse) {
        if (!input){
            return input
        }
        function compare(a, b) {
            if (a[sortKey] < b[sortKey])
                return -1;
            else if (a[sortKey] > b[sortKey])
                return 1;
            else
                return 0;
        }
        var sorted = input.sort(compare)
        if (reverse){
            return sorted.reverse()
        }
        else {
            return sorted
        }
    }
    
    var swigOpts = {
        setup: function (swig) {
            swig.setFilter('sortOnKey', swigSortOnKey);
        }
    }
    
    return gulp.src('./src/**/*.html')
        .pipe(gulpSwig(swigOpts))
        .pipe(gulp.dest('./build'));
});


gulp.task('compile-css', function () {
    return gulp.src('./src/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./build'));
});


gulp.task('compile-js', function () {
    return gulp.src('./src/**/*.js')
        .pipe(gulp.dest('./build'));
});


gulp.task('clean', function() {
    return del('./build');
});


gulp.task('compile-all', function(cb) {
    runSequence('clean',
        ['compile-html',
            'compile-css',
            'compile-js',],
        cb);
});


gulp.task('server', function(cb) {
    runSequence('compile-all', 'start-server', cb)
});


gulp.task('default', ['compile-all'], function () {
});
