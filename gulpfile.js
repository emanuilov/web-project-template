/*eslint no-console: ["error", { allow: ["log","warn","error"] }] */
const gulp = require("gulp"),
	watch = require("gulp-watch"),
	sass = require("gulp-sass"),
	autoprefixer = require("gulp-autoprefixer"),
	imagemin = require("gulp-imagemin"),
	pngquant = require("imagemin-pngquant"),
	eslint = require("gulp-eslint"),
	babel = require("gulp-babel"),
	concat = require("gulp-concat"),
	sourcemaps = require("gulp-sourcemaps"),
	uglify = require("gulp-uglify"),
	jasmine = require("gulp-jasmine-browser"),
	clean = require("gulp-clean");

gulp.task("watch", function () {
	watch("./src/**/*.php", gulp.parallel("php"));
	watch("./src/**/*.html", gulp.parallel("copy-html"));
	watch("./src/js/**/*.js", gulp.parallel("js-lint", "scripts"));
	watch("./src/sass/**/*.scss", gulp.parallel("styles"));
	watch("./src/img/*", gulp.parallel("minify-images"));
});

gulp.task("copy-html", function () {
	gulp.src("./src/**/*.html")
		.pipe(gulp.dest("./dist"));
});

gulp.task("php", function () {
	return gulp.src("./src/**/*.php")
		.pipe(gulp.dest("./dist"));
});

gulp.task("js-lint", function () {
	return gulp.src(["./src/js/**/*.js", "!node_modules/**"])
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(eslint.failAfterError());
});

gulp.task("js-tests", function () {
	return gulp.src(["./tests/js/**/*.js"])
		.pipe(jasmine.specRunner({
			console: true
		}))
		.pipe(jasmine.headless({
			driver: "phantomjs"
		}));
});

gulp.task("scripts", function () {
	gulp.src(["./src/js/**/*.js", "!node_modules/**"])
		.pipe(babel()) //Enable old browser support
		.pipe(concat("script.js"))
		.pipe(gulp.dest("./dist/js"));
});

gulp.task("scripts-dist", function () {
	gulp.src(["./src/js/**/*.js", "!node_modules/**"])
		.pipe(babel()) //Enable old browser support
		.pipe(sourcemaps.init())
		.pipe(concat("script.js"))
		.pipe(uglify()) //Minify
		.pipe(sourcemaps.write())
		.pipe(gulp.dest("./dist/js"));
});

gulp.task("styles", function () {
	gulp.src("./src/sass/**/*.scss")
		.pipe(sass().on("error", sass.logError))
		.pipe(autoprefixer({
			browsers: ["last 5 versions"]
		}))
		.pipe(gulp.dest("./dist/css"));
});

gulp.task("minify-images", function () {
	return gulp.src("./src/img/*")
		.pipe(imagemin({
			progressive: true,
			use: [pngquant()]
		}))
		.pipe(gulp.dest("./dist/img"));
});

gulp.task("clean", function () {
	return gulp.src("./dist", {
		read: false
	}).pipe(clean());
});

gulp.task("default", gulp.series("clean", gulp.parallel("php", "copy-html", "js-lint", "scripts", "styles", "minify-images", "watch")));
gulp.task("export", gulp.series("clean", gulp.parallel("php", "copy-html", "js-lint", "scripts-dist", "styles", "minify-images"), "js-tests"));