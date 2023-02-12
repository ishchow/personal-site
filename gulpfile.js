const postcss = require('gulp-postcss')
const gulp = require('gulp');
const concat = require('gulp-concat');

gulp.task('css', function () {
  return gulp.src('src/assets/css/*.css')
    .pipe(concat('main.css'))
    .pipe(postcss())
    .pipe(gulp.dest('src/_includes/css/'))
})

gulp.task('js', function () {
  return gulp.src('src/assets/js/*.js')
  .pipe(concat('main.js'))
  .pipe(gulp.dest('src/_includes/js/'))
})

gulp.task('watch', function () {
    gulp.watch('src/assets/css/*.css', gulp.parallel('css'))
    gulp.watch('src/assets/js/*.js', gulp.parallel('js'))
})

