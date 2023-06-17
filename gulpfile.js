const gulp = require("gulp");
const webpack = require("webpack-stream");
const buildConfig = require("./webpack.config")
const argv = require("yargs").argv;

function chromeBuild() {
    var config = buildConfig()
    var isProduction = (argv.prod === undefined) ? false : true;
    config["mode"] = isProduction ? "production" : "development"

    return webpack(config).pipe(gulp.dest("dist/"));
}

exports.build = gulp.parallel(chromeBuild);
