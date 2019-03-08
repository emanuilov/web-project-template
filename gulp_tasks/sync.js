import gulp from 'gulp';
import browserSync from 'browser-sync';
import guppy from 'git-guppy';
import php from 'gulp-connect-php';
import minimatch from 'minimatch';

// Server & Live reload
gulp.task('browser-sync', function() {
	// Start PHP Server
	php.server({ base: 'dist', port: 8010, keepalive: true });

	// Sync
	browserSync.init({
		files: './dist/**/*',
		proxy: '127.0.0.1:8010',
		port: 8080,
		open: false,
		notify: false
	});
});

gulp.task(
	'pre-commit',
	guppy().src('pre-commit', function(stagedFiles) {
		return gulp.src(stagedFiles).pipe();
	})
);

function filterByExtension(fileList, extension) {
	const glob = '**/**/*.' + extension;
	const filteredList = fileList.filter(file => minimatch(file, glob)).map(file => file);
	return filteredList;
}

module.exports = { browserSync: browserSync, filterByExtension: filterByExtension };
