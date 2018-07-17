/*eslint no-console: ["error", { allow: ["log","warn","error"] }] */
var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var eslint = require('gulp-eslint');
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var jasmine = require('gulp-jasmine-browser');
var clean = require('gulp-clean');

gulp.task('watch', function () {
	gulp.watch('./src/**/*.php', gulp.parallel('php'));
	gulp.watch('./src/**/*.html', gulp.parallel('copy-html'));
	gulp.watch('./src/js/**/*.js', gulp.parallel('js-lint', 'scripts'));
	gulp.watch('./src/sass/**/*.scss', gulp.parallel('styles'));
	gulp.watch('./src/img/*', gulp.parallel('minify-images'));
});

gulp.task('copy-html', function () {
	gulp.src('./src/**/*.html')
		.pipe(gulp.dest('./dist'));
});

gulp.task('php', function () {
	return gulp.src('./src/**/*.php')
		.pipe(gulp.dest('./dist'));
});

gulp.task('js-lint', function () {
	return gulp.src(['./src/js/**/*.js', '!node_modules/**'])
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(eslint.failAfterError());
});

gulp.task('js-tests', function () {
	return gulp.src(['./tests/js/**/*.js'])
		.pipe(jasmine.specRunner({
			console: true
		}))
		.pipe(jasmine.headless({
			driver: 'phantomjs'
		}));
});

gulp.task('scripts', function () {
	gulp.src(['./src/js/**/*.js', '!node_modules/**'])
		.pipe(babel()) //Enable old browser support
		.pipe(concat('script.js'))
		.pipe(gulp.dest('./dist/js'));
});

gulp.task('scripts-dist', function () {
	gulp.src(['./src/js/**/*.js', '!node_modules/**'])
		.pipe(babel()) //Enable old browser support
		.pipe(sourcemaps.init())
		.pipe(concat('script.js'))
		.pipe(uglify()) //Minify
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('./dist/js'));
});

gulp.task('styles', function () {
	gulp.src('./src/sass/**/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer({
			browsers: ['last 5 versions']
		}))
		.pipe(gulp.dest('./dist/css'));
});

gulp.task('minify-images', function () {
	return gulp.src('./src/img/*')
		.pipe(imagemin({
			progressive: true,
			use: [pngquant()]
		}))
		.pipe(gulp.dest('./dist/img'));
});

gulp.task('clean', function () {
	return gulp.src('./dist', {
		read: false
	}).pipe(clean());
});

gulp.task('default', gulp.series('clean', gulp.parallel('php', 'copy-html', 'js-lint', 'scripts', 'styles', 'minify-images', 'watch')));
gulp.task('export', gulp.series('clean', gulp.parallel('php', 'copy-html', 'js-lint', 'scripts-dist', 'styles', 'minify-images'), 'js-tests'));