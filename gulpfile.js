const gulp = require('gulp'),
	watch = require('gulp-watch'),
	del = require('del'),
	browserSync = require('browser-sync'),
	// guppy = require('git-guppy'),
	files = {
		php: ['./src/**/*.php', '!./src/**/*.spec.php', '!./src/**/*.test.php'],
		html: './src/**/*.html',
		scss: './src/sass/**/*.scss',
		img: './src/img/*'
	};
let devMode = true;

const autoprefixer = require('gulp-autoprefixer'),
	sass = require('gulp-sass');

const imagemin = require('gulp-imagemin'),
	pngquant = require('imagemin-pngquant');

const eslint = require('gulp-eslint'),
	sourceMaps = require('gulp-sourcemaps'),
	uglify = require('gulp-uglify-es').default,
	jest = require('gulp-jest').default,
	glob = require('glob'),
	browserify = require('browserify'),
	sourceStream = require('vinyl-source-stream'),
	buffer = require('vinyl-buffer');

const php = require('gulp-connect-php'),
	phplint = require('gulp-phplint'),
	phpunit = require('gulp-phpunit');

gulp.task('watch', function() {
	watch('./src/**/*.php', gulp.series('lint-php', 'copy-php'));
	watch(files.html, gulp.series('copy-html'));
	watch('./src/js/**/*.js', gulp.parallel('lint-js', 'scripts'));
	watch(files.scss, gulp.series('styles'));
	watch(files.img, gulp.series('minify-images'));
});

// Server & Live reload
gulp.task('browser-sync', function() {
	// Start PHP Server
	php.server({ base: 'dist', port: 8010, keepalive: true });

	// Sync
	browserSync.init({
		files: './dist/**/*',
		proxy: '127.0.0.1:8010',
		port: 8080,
		open: false,
		notify: false
	});
});

// Copying
gulp.task('copy-html', function() {
	return gulp.src(files.html).pipe(gulp.dest('./dist'));
});

gulp.task('copy-php', function() {
	return gulp.src(files.php).pipe(gulp.dest('./dist'));
});

// JavaScript

gulp.task('scripts', function() {
	let globString = './src/js/**/!(*.spec.js|*.test.js)';
	if (!devMode) {
		globString = './src/js/**/!(*.spec.js|*.test.js|browser-sync.js)';
	}
	return browserify({
		entries: glob.sync(globString, { nodir: true }),
		transform: [['babelify']]
	})
		.transform('babelify')
		.bundle()
		.pipe(sourceStream('script.js'))
		.pipe(buffer())
		.pipe(sourceMaps.init())
		.pipe(uglify())
		.pipe(sourceMaps.write())
		.pipe(gulp.dest('./dist/js'));
});

// Conversion - SCSS
gulp.task('styles', function() {
	return gulp
		.src(files.scss)
		.pipe(sass().on('error', sass.logError))
		.pipe(
			autoprefixer({
				browsers: ['last 5 versions']
			})
		)
		.pipe(gulp.dest('./dist/css'))
		.pipe(browserSync.stream({ match: '**/*.css' }));
});

// Images
gulp.task('minify-images', function() {
	return gulp
		.src(files.img)
		.pipe(
			imagemin({
				progressive: true,
				use: [pngquant()]
			})
		)
		.pipe(gulp.dest('./dist/img'))
		.pipe(browserSync.stream({ match: './dist/img/**/*' }));
});

// Linting, Testing
gulp.task('lint-js', function() {
	return gulp
		.src(['./src/js/**/*'])
		.pipe(eslint({ fix: true }))
		.pipe(eslint.format())
		.pipe(eslint.failAfterError());
});

gulp.task('test-js', function() {
	return gulp.src('./').pipe(jest());
});

gulp.task('lint-php', function() {
	return gulp.src(['./src/**/*.php', '!./src/js', '!./src/img', '!./src/css']).pipe(phplint());
});

gulp.task('test-php', function() {
	var options = { debug: false };
	return gulp.src('phpunit.xml').pipe(phpunit('.\\vendor\\bin\\phpunit', options));
});

// Set the mode to production(not development)
gulp.task('set-mode', function() {
	devMode = false;
	return gulp.src('./');
});

// Cleaning
gulp.task('clean', function() {
	del.sync(['dist/']);
	return gulp.src('/');
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
		'set-mode',
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
