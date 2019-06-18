import gulp from 'gulp';
import Debugging from './gulp/Debugging';
import Distributing from './gulp/Distributing';
import PHPTasks from './gulp/quality-assurance/php';
import JSTasks from './gulp/quality-assurance/javascript';
import HTMLTasks from './gulp/quality-assurance/html';
import SCSSTasks from './gulp/quality-assurance/scss';
import ImageTasks from './gulp/quality-assurance/images';
import watch from 'gulp-watch';

const mainConfig = {
		dist: './dist',
		files: {
			php: ['./src/**/*.php'],
			html: './src/**/*.html',
			js: './src/js/**/*.js',
			scss: './src/sass/**/*.scss',
			img: './src/img/**/*',
			without: {
				phpTests: ['!./src/**/*.spec.php', '!./src/**/*.test.php'],
				jsTests: './src/js/**/!(*.spec.js|*.test.js)',
				jsTestsSync: './src/js/**/!(*.spec.js|*.test.js|browser-sync.js)'
			},
			serverConfig: ['./src/**/.htaccess', './src/robots.txt']
		},
		ssh: {
			root: 'dist',
			hostname: '',
			username: '',
			destination: '',
			chmod: 'ugo=rwX'
		}
	},
	PHP = new PHPTasks(mainConfig.dist, mainConfig.files),
	JavaScript = new JSTasks(mainConfig.dist, mainConfig.files),
	HTML = new HTMLTasks(mainConfig.dist, mainConfig.files),
	SCSS = new SCSSTasks(mainConfig.dist, mainConfig.files),
	Images = new ImageTasks(mainConfig.dist, mainConfig.files),
	Distr = new Distributing(mainConfig.dist, mainConfig.files, mainConfig.ssh);

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

// Config
gulp.task('copy-config', function() {
	return Distr.copyServerConfig();
});

// Deploy
gulp.task('deploy', function() {
	return Distr.deploy();
});

// Debugging
gulp.task('watch', function() {
	watch(mainConfig.files.php, 'copy-php');
	watch(mainConfig.files.html, 'copy-html');
	watch(mainConfig.files.html, 'transform-js');
	watch(mainConfig.files.scss, 'transform-scss');
	watch(mainConfig.files.img, 'minify-images');
	watch(mainConfig.files.serverConfig, 'copy-config');
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
			'copy-config',
			'copy-php',
			'copy-html',
			'transform-js',
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
			'copy-config',
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
		'test-php',
		'deploy'
	)
);
