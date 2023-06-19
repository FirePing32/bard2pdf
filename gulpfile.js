const gulp = require("gulp");
const webpack = require("webpack-stream");
const buildConfig = require("./webpack.config");
const argv = require("yargs").argv;
const clean = require("gulp-clean");
const fs = require("fs");

function chromeClean() {
    if (fs.existsSync("./bin")) {
        return gulp.src("./bin", { read: false }).pipe(clean());
    } else if (fs.existsSync("./dist")) {
        return gulp.src("./dist", { read: false }).pipe(clean());
    } else {
        return gulp.src(".", { allowEmpty: true });
    }
}

function chromeBuild() {
    var config = buildConfig();
    var isProduction = argv.prod === undefined ? false : true;
    config["mode"] = isProduction ? "production" : "development";
    config["entry"] = { "content-main.js": "./src/chrome/js/content-main.js" };

    return webpack(config).pipe(gulp.dest("dist/chrome/"));
}

function chromeExport() {
    gulp.src("./src/chrome/manifest.json").pipe(gulp.dest("./bin/chrome"));
    gulp.src("./src/chrome/icons/*").pipe(gulp.dest("./bin/chrome/icons"));

    return gulp
        .src([
            "!./src/chrome/js/content-main.js",
            "./src/chrome/js/*",
            "./dist/chrome/*.js",
        ])
        .pipe(gulp.dest("./bin/chrome/js"));
}

exports.build = gulp.series(chromeClean, chromeBuild, chromeExport);
