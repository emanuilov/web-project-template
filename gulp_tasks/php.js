import gulp from 'gulp';
import mainConfig from '../gulpfile.babel';
import phplint from 'gulp-phplint';
import phpunit from 'gulp-phpunit';

// General
gulp.task('copy-php', function() {
	return gulp
		.src(mainConfig.files.phpLogic.concat(mainConfig.files.phpTests))
		.pipe(gulp.dest('./dist'));
});

// Linting, Testing
gulp.task('lint-php', function() {
	return gulp.src(mainConfig.files.phpLogic).pipe(phplint());
});

gulp.task('test-php', function() {
	var options = { debug: false };
	return gulp.src('phpunit.xml').pipe(phpunit('.\\vendor\\bin\\phpunit', options));
});
