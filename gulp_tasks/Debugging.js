import browserSync from 'browser-sync';
import php from 'gulp-connect-php';

export default class Debugging {
	constructor(dist) {
		this.dist = dist;
	}

	browserSync() {
		// Start PHP Server
		php.server({ base: this.dist, port: 8010, keepalive: true });

		// Sync
		browserSync.init({
			files: this.dist + '/**/*',
			proxy: '127.0.0.1:8010',
			port: 8080,
			open: false,
			notify: false
		});
	}
}
