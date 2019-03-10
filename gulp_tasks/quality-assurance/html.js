import gulp from 'gulp';
import htmllint from 'gulp-htmllint';
import fancyLog from 'fancy-log';
import colors from 'ansi-colors';
import Distributing from '../Distributing';

export default class HTMLTasks {
	constructor(dist, files) {
		this.dist = dist;
		this.files = files;
	}

	copy() {
		return gulp.src(this.files.html).pipe(gulp.dest(this.dist));
	}

	lint() {
		let files = new Distributing(this.dist).getStagedFilePaths();
		if (files == null) {
			files = this.files.html;
		}
		return gulp
			.src(files)
			.pipe(htmllint({ config: '.htmllintrc.json', failOnError: true }, this.htmllintReporter));
	}

	htmllintReporter(filepath, issues) {
		if (issues.length > 0) {
			issues.forEach(function(issue) {
				fancyLog(
					colors.cyan('[gulp-htmllint] ') +
						colors.white(filepath + ' [' + issue.line + ',' + issue.column + ']: ') +
						colors.red('(' + issue.code + ') ' + issue.msg)
				);
			});

			process.exitCode = 1;
		}
	}
}
