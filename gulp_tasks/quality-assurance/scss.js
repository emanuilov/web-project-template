import gulp from 'gulp';
import sass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import stylelint from 'gulp-stylelint';
import browserSync from 'browser-sync';
import Distributing from '../Distributing';

export default class SCSSTasks {
	constructor(dist, files) {
		this.dist = dist;
		this.files = files;
	}

	transform() {
		return gulp
			.src(this.files.scss)
			.pipe(sass().on('error', sass.logError))
			.pipe(
				autoprefixer({
					browsers: ['last 5 versions']
				})
			)
			.pipe(gulp.dest(this.dist + '/css'))
			.pipe(browserSync.stream({ match: '**/*.css' }));
	}

	lint() {
		let files = new Distributing(this.dist).getStagedFilePaths();
		if (files == null) {
			files = this.files.scss;
		}
		return gulp.src(files).pipe(
			stylelint({
				reporters: [{ formatter: 'string', console: true }],
				fix: true
			})
		);
	}
}
