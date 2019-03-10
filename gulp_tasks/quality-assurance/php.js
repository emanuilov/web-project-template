import gulp from 'gulp';
import phplint from 'gulp-phplint';
import phpunit from 'gulp-phpunit';
import Distributing from '../Distributing';

export default class PHPTasks {
	constructor(dist, files) {
		this.dist = dist;
		this.files = files;
	}

	copy() {
		return gulp.src(this.files.phpLogic.concat(this.files.phpTests)).pipe(gulp.dest(this.dist));
	}

	lint() {
		let files = new Distributing(this.dist).getStagedFilePaths();
		if (files == null) {
			files = this.files.php;
		}
		return gulp.src(files).pipe(phplint());
	}

	test() {
		var options = { debug: false };
		return gulp.src('phpunit.xml').pipe(phpunit('.\\vendor\\bin\\phpunit', options));
	}
}
