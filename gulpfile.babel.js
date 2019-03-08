import gulp from 'gulp';
import HubRegistry from 'gulp-hub';
import watch from 'gulp-watch';

// Main config
const files = {
	php: ['./src/**/*.php', '!./src/**/*.spec.php', '!./src/**/*.test.php'],
	html: './src/**/*.html',
	scss: './src/sass/**/*.scss',
	img: './src/img/*'
};
export default {
	files: files
};

// Register the gulp tasks
gulp.registry(new HubRegistry(['gulp_tasks/*.js']));

gulp.task('watch', function() {
	watch('./src/**/*.php', gulp.series('lint-php', 'copy-php'));
	watch(files.html, gulp.series('copy-html'));
	watch('./src/js/**/*.js', gulp.parallel('lint-js', 'scripts'));
	watch(files.scss, gulp.series('styles'));
	watch(files.img, gulp.series('minify-images'));
});

gulp.task(
	'default',
	gulp.series(
		'clean',
		gulp.parallel(
			'copy-php',
			'copy-html',
			'lint-js',
			'lint-php',
			'scripts',
			'styles',
			'minify-images',
			'watch',
			'browser-sync'
		)
	)
);
gulp.task(
	'build',
	gulp.series(
		'clean',
		gulp.parallel(
			'copy-php',
			'copy-html',
			'lint-js',
			'lint-php',
			'scripts',
			'styles',
			'minify-images'
		),
		'test-js',
		'test-php'
	)
);
