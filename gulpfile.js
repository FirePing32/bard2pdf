const gulp = require("gulp");
const webpack = require("webpack-stream");
const buildConfig = require("./webpack.config");
const argv = require("yargs").argv;

function chromeBuild() {
    var config = buildConfig();
    var isProduction = argv.prod === undefined ? false : true;
    config["mode"] = isProduction ? "production" : "development";

    return webpack(config).pipe(gulp.dest("dist/"));
}

function chromeExport() {
    gulp.src("./src/chrome/manifest.json").pipe(gulp.dest("./bin/chrome"));
    gulp.src("./src/chrome/icons/*").pipe(gulp.dest("./bin/chrome/icons"));

    return gulp
        .src([
            "!./src/chrome/js/content-main.js",
            "./src/chrome/js/*",
            "./dist/chrome/content-main.js",
        ])
        .pipe(gulp.dest("./bin/chrome/js"));
}

exports.build = gulp.series(chromeBuild, chromeExport);
