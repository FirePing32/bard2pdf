const gulp = require("gulp");
const webpack = require("webpack-stream");
const buildConfig = require("./webpack.config");
const argv = require("yargs").argv;
const clean = require("gulp-clean");
const fs = require("fs");

function chromeClean() {
    if (fs.existsSync("./bin")) {
        gulp.src("./bin", { read: false }).pipe(clean());
    }
    if (fs.existsSync("./dist")) {
        gulp.src("./dist", { read: false }).pipe(clean());
    }
    return gulp.src(".", { allowEmpty: true });
}

function chromeBuild() {
    var config = buildConfig();
    var isProduction = argv.prod === undefined ? false : true;
    config["mode"] = isProduction ? "production" : "development";
    config["entry"] = { "content-main": "./src/chrome/js/content-main.js" };

    return webpack(config).pipe(gulp.dest("dist/chrome/"));
}

function chromeExport() {
    gulp.src("./src/chrome/manifest.json").pipe(gulp.dest("./bin/chrome"));
    gulp.src("./src/chrome/icons/*").pipe(gulp.dest("./bin/chrome/icons"));

    return gulp
        .src([
            "./src/chrome/js/*",
            "!./src/chrome/js/content-main.js",
            "./dist/chrome/*.js",
        ])
        .pipe(gulp.dest("./bin/chrome/js"));
}

exports.build = gulp.series(chromeClean, chromeBuild, chromeExport);
