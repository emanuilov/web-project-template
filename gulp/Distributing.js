import gulp from 'gulp';
import del from 'del';
import process from 'process';
import rsync from 'gulp-rsync';

export default class Distributing {
	constructor(dist, files, ssh = null) {
		this.dist = dist;
		this.files = files;
		this.ssh = ssh;
	}

	clean() {
		del.sync([this.dist]);
		return gulp.src('/');
	}

	copyServerConfig() {
		return gulp.src(this.files.serverConfig, { allowEmpty: true }).pipe(gulp.dest(this.dist));
	}

	getStagedFilePaths() {
		let filePaths = null;
		if (process.argv.length > 4) {
			filePaths = process.argv.slice(4, process.argv.length);
		}
		return filePaths;
	}

	deploy() {
		if (this.ssh !== null) {
			return gulp.src('dist/*').pipe(
				rsync({
					root: 'dist',
					hostname: 'techr.eu',
					username: 'techr',
					destination: '/home/techr/domains/bluebot.techr.eu/public_html',
					chmod: 'ugo=rwX'
				})
			);
		}
		return 0;
	}
}
