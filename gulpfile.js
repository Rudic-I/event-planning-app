var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');

gulp.task('watch', ['browserSync', 'useref', 'images'], function(){
	gulp.watch('app/*.html', ['reload']);
	gulp.watch('app/js/*.js', ['reload', 'useref']);
	gulp.watch('app/css/*.css', ['reload', 'useref']);
	gulp.watch('app/images/**/*.+(png|jpg|gif|svg)', ['reload', 'images']);
});

gulp.task('browserSync', function(){
	browserSync.init({
		server: {
			baseDir: 'app'
		},
	});
});

gulp.task('reload', function(){
	browserSync.reload();
});

gulp.task('useref', function(){
  return gulp.src('app/*.html')
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('dist'))
});

gulp.task('images', function(){
	return gulp.src('app/images/**/*.+(png|jpg|gif|svg)')
	.pipe(gulp.dest('dist/images'));
});