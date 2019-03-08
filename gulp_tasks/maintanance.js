import gulp from 'gulp';
import del from 'del';

let devMode = true;

// Set the mode to production(not development)
gulp.task('disable-devmode', function() {
	devMode = false;
	return gulp.src('./');
});

// Cleaning
gulp.task('clean', function() {
	del.sync(['dist/']);
	return gulp.src('/');
});

module.exports = { devMode: devMode };
