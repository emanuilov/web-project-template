import gulp from 'gulp';
import browserSync from 'browser-sync';
import php from 'gulp-connect-php';
import process from 'process';

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

gulp.task('test', function() {
	let filePaths = null;
	if (process.argv.length > 4) {
		filePaths = process.argv.slice(3, process.argv.length);
	}
	// Refactor the code - the gulp functions to execute class methods, the methods to accept the paths, filePaths is an array of staged files
	console.log(filePaths);
});

module.exports = { browserSync: browserSync };
