import gulp from 'gulp';
import del from 'del';

// Cleaning
gulp.task('clean', function() {
	del.sync(['dist/']);
	return gulp.src('/');
});
