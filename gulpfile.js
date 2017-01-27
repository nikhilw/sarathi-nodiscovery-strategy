var gulp = require("gulp");
const mocha = require("gulp-mocha");

gulp.task("test", () =>
    gulp.src("test/**/*.js", {read: false})
        .pipe(mocha({reporter: "spec"}))
		.once("error", () => {
            process.exit(1);
        })
        .once("end", () => {
            process.exit();
        })
);

gulp.task("default", ["test"]);
