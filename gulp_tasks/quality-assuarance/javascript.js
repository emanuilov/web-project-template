import gulp from 'gulp';
import eslint from 'gulp-eslint';
import sourceMaps from 'gulp-sourcemaps';
import uglify from 'gulp-uglify-es';
import glob from 'glob';
import browserify from 'browserify';
import sourceStream from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import process from 'process';
import jest from 'gulp-jest';

export default class JSTasks {
	constructor(dist) {
		this.dist = dist;
	}

	transform() {
		return browserify({
			entries: glob.sync(this.getGlobString(), { nodir: true }),
			transform: [['babelify']]
		})
			.transform('babelify')
			.bundle()
			.pipe(sourceStream('script.js'))
			.pipe(buffer())
			.pipe(sourceMaps.init())
			.pipe(uglify())
			.pipe(sourceMaps.write())
			.pipe(gulp.dest(this.dist + '/js'));
	}

	lint() {
		return gulp
			.src(['./src/js/**/*'])
			.pipe(eslint({ fix: true }))
			.pipe(eslint.format())
			.pipe(eslint.failAfterError());
	}

	test() {
		return gulp.src('./').pipe(jest());
	}

	getGlobString() {
		if (process.argv[2] === 'build') {
			return './src/js/**/!(*.spec.js|*.test.js|browser-sync.js)';
		}
		return './src/js/**/!(*.spec.js|*.test.js)';
	}
}
