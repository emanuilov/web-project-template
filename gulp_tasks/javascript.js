import gulp from 'gulp';
import eslint from 'gulp-eslint';
import sourceMaps from 'gulp-sourcemaps';
import uglify from 'gulp-uglify-es';
import jest from 'gulp-jest';
import glob from 'glob';
import browserify from 'browserify';
import sourceStream from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import devMode from './maintanance';

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
