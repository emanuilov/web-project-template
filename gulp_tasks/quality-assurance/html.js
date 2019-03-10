import gulp from 'gulp';
import htmllint from 'gulp-htmllint';
import fancyLog from 'fancy-log';
import colors from 'ansi-colors';

export default class HTMLTasks {
	constructor(dist, files) {
		this.dist = dist;
		this.files = files;
	}

	copy() {
		return gulp.src(this.files.html).pipe(gulp.dest(this.dist));
	}

	lint() {
		return gulp
			.src(this.files.html)
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
