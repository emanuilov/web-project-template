import gulp from 'gulp';
import mainConfig from '../gulpfile.babel';
import autoprefixer from 'gulp-autoprefixer';
import sass from 'gulp-sass';
import imagemin from 'gulp-imagemin';
import pngquant from 'imagemin-pngquant';
import sync from './sync';
import stylelint from 'gulp-stylelint';

// HTML
gulp.task('copy-html', function() {
	return gulp.src(mainConfig.files.html).pipe(gulp.dest('./dist'));
});

// SCSS
gulp.task('styles', function() {
	return gulp
		.src(mainConfig.files.scss)
		.pipe(
			stylelint({
				reporters: [{ formatter: 'string', console: true }],
				fix: true
			})
		)
		.pipe(sass().on('error', sass.logError))
		.pipe(
			autoprefixer({
				browsers: ['last 5 versions']
			})
		)
		.pipe(gulp.dest('./dist/css'))
		.pipe(sync.browserSync.stream({ match: '**/*.css' }));
});

// Images
gulp.task('minify-images', function() {
	return gulp
		.src(mainConfig.files.img)
		.pipe(
			imagemin({
				progressive: true,
				use: [pngquant()]
			})
		)
		.pipe(gulp.dest('./dist/img'))
		.pipe(sync.browserSync.stream({ match: './dist/img/**/*' }));
});
