import gulp from 'gulp';
import del from 'del';
import process from 'process';

export default class Distributing {
	constructor(dist) {
		this.dist = dist;
	}

	clean() {
		del.sync([this.dist]);
		return gulp.src('/');
	}

	getStagedFilePaths() {
		let filePaths = null;
		if (process.argv.length > 4) {
			filePaths = process.argv.slice(4, process.argv.length);
		}
		return filePaths;
	}
}
