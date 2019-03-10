import gulp from 'gulp';

export default class HTMLTasks {
	constructor(dist, files) {
		this.dist = dist;
		this.files = files;
	}

	copy() {
		return gulp.src(this.files.html).pipe(gulp.dest(this.dist));
	}

	lint() {}
}
