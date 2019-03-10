import gulp from 'gulp';
import Debugging from './gulp_tasks/Debugging';
import Distributing from './gulp_tasks/Distributing';
import PHPTasks from './gulp_tasks/quality-assurance/php';
import JSTasks from './gulp_tasks/quality-assurance/javascript';
import HTMLTasks from './gulp_tasks/quality-assurance/html';
import SCSSTasks from './gulp_tasks/quality-assurance/scss';
import ImageTasks from './gulp_tasks/quality-assurance/images';
import watch from 'gulp-watch';

const mainConfig = {
		dist: './dist',
		files: {
			phpLogic: ['./src/**/*.php', '!./src/js', '!./src/img', '!./src/css'],
			phpTests: ['!./src/**/*.spec.php', '!./src/**/*.test.php'],
			html: ['./src/**/*.html', '!./src/js', '!./src/img', '!./src/css'],
			js: './src/js/**/*.js',
			scss: './src/sass/**/*.scss',
			img: './src/img/*'
		}
	},
	PHP = new PHPTasks(mainConfig.dist, mainConfig.files),
	JavaScript = new JSTasks(mainConfig.dist),
	HTML = new HTMLTasks(mainConfig.dist, mainConfig.files),
	SCSS = new SCSSTasks(mainConfig.dist, mainConfig.files),
	Images = new ImageTasks(mainConfig.dist, mainConfig.files),
	Distr = new Distributing(mainConfig.dist);

// PHP
gulp.task('copy-php', function() {
	return PHP.copy();
});

gulp.task('lint-php', function() {
	return PHP.lint();
});

gulp.task('test-php', function() {
	return PHP.test();
});

// JavaScript
gulp.task('transform-js', function() {
	return JavaScript.transform();
});

gulp.task('lint-js', function() {
	return JavaScript.lint();
});

gulp.task('test-js', function() {
	return JavaScript.test();
});

// HTML
gulp.task('copy-html', function() {
	return HTML.copy();
});

gulp.task('lint-html', function() {
	return HTML.lint();
});

// SCSS
gulp.task('transform-scss', function() {
	return SCSS.transform();
});

gulp.task('lint-scss', function() {
	return SCSS.lint();
});

// Images
gulp.task('minify-images', function() {
	return Images.minify();
});

// Debugging
gulp.task('watch', function() {
	watch(mainConfig.files.phpLogic, gulp.series('lint-php', 'copy-php'));
	watch(mainConfig.files.html, gulp.series('copy-html'));
	watch(mainConfig.files.html, gulp.parallel('lint-js', 'transform-js'));
	watch(mainConfig.files.scss, gulp.series('transform-scss'));
	watch(mainConfig.files.img, gulp.series('minify-images'));
});

gulp.task('browser-sync', function() {
	new Debugging(mainConfig.dist).browserSync();
});

// Distributing
gulp.task('clean', function() {
	return Distr.clean();
});

gulp.task(
	'default',
	gulp.series(
		'clean',
		gulp.parallel(
			'lint-php',
			'copy-php',
			'lint-html',
			'copy-html',
			'lint-js',
			'transform-js',
			'lint-scss',
			'transform-scss',
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
			'lint-php',
			'copy-php',
			'lint-html',
			'copy-html',
			'lint-js',
			'transform-js',
			'lint-scss',
			'transform-scss',
			'minify-images'
		),
		'test-js',
		'test-php'
	)
);
