import gulp from 'gulp';
import imagemin from 'gulp-imagemin';
import pngquant from 'imagemin-pngquant';
import browserSync from 'browser-sync';

export default class ImageTasks {
	constructor(dist, files) {
		this.dist = dist;
		this.files = files;
	}

	minify() {
		return gulp
			.src(this.files.img)
			.pipe(
				imagemin({
					progressive: true,
					use: [pngquant()]
				})
			)
			.pipe(gulp.dest(this.dist + '/img'))
			.pipe(browserSync.stream({ match: this.dist + '/img/**/*' }));
	}
}

gulp.task('minify-images', function() {});
