var gulp = require('gulp'),
    watch = require('gulp-watch'),
    less = require('gulp-less'),
    cleanCSS = require('gulp-clean-css'),
    plumber = require('gulp-plumber'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    babel = require('gulp-babel');

// root folder for all styles
var paths = {
    webroot: "./"
};

// less folder within root
paths.less = paths.webroot + "styles/less/*.less";
paths.js = {
    config: paths.webroot + "scripts/config/config.js",
    controllers: paths.webroot + "scripts/controllers/*.js",
    directives: paths.webroot + "scripts/directives/*.js",
    services: paths.webroot + "scripts/services/*.js",
    app: paths.webroot + "scripts/app.js"
};

// compile less files, concat into single css file and minify
gulp.task('less-common', function () {
    return gulp.src(['!./styles/less/typography.less', paths.less])
        .pipe(plumber())
        .pipe(less())
        .pipe(cleanCSS())
        .pipe(concat('styles.min.css'))
        .pipe(gulp.dest(paths.webroot + "styles"));
});

gulp.task('compress', function () {
    return gulp.src([paths.js.config, paths.js.controllers, paths.js.directives, paths.js.services, paths.js.app])
        .pipe(plumber())
        .pipe(babel({ presets: ['es2015'] }))
        .pipe(concat('app.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(paths.webroot + "scripts/compressed"));
});

// watch less task for changes
gulp.task('watch', function () {
    gulp.watch(paths.less, ['less-common']);
    gulp.watch([paths.js.config, paths.js.controllers, paths.js.directives, paths.js.services, paths.js.app], ['compress']);
});

// default task    
gulp.task('default', ['less-common', 'compress', 'watch']);