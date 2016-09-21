var gulp = require('gulp');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var htmlmin = require('gulp-htmlmin');
var minifycss = require('gulp-minify-css');
var browserSync = require('browser-sync');

gulp.task('browser-sync', function () {
    browserSync({
        server: {
            baseDir: "./"
        }
    });
});

gulp.task('bs-reload', function () {
    browserSync.reload();
});


gulp.task('styles', function () {
    gulp.src(['src/scss/**/*.scss'])
        .pipe(plumber({
            errorHandler: function (error) {
                console.log(error.message);
                this.emit('end');
            }
        }))
        .pipe(sass())
        .pipe(autoprefixer('last 2 versions'))
        .pipe(gulp.dest('dist/styles/'))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss())
        .pipe(gulp.dest('dist/styles/'))
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('scripts', function () {
    gulp.src('src/scripts/**/*.js')
        .pipe(plumber({
            errorHandler: function (error) {
                console.log(error.message);
                this.emit('end');
            }
        }))
        .pipe(gulp.dest('dist/scripts/'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('dist/scripts/'))
        .pipe(browserSync.reload({stream: true}))
});


gulp.task('default', ['browser-sync', 'bs-reload', 'styles', 'scripts'], function () {
    gulp.watch("src/scss/**/*.scss", ['styles', 'styles']);
    gulp.watch("src/scripts/**/*.js", ['scripts']);
    gulp.watch("*.html", ['bs-reload']);
});
