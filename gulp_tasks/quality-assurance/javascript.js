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
import Distributing from '../Distributing';

export default class JSTasks {
	constructor(dist, files) {
		this.dist = dist;
		this.files = files;
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
		let files = new Distributing(this.dist).getStagedFilePaths();
		if (files == null) {
			files = this.files.js;
		}
		return gulp
			.src(files)
			.pipe(eslint({ fix: true }))
			.pipe(eslint.format())
			.pipe(eslint.failAfterError());
	}

	test() {
		return gulp.src('./').pipe(jest());
	}

	getGlobString() {
		if (process.argv[2] === 'build') {
			return this.files.without.jsTestsSync;
		}
		return this.files.without.jsTests;
	}
}
