const gulp = require("gulp");
const jshint = require("gulp-jshint");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");
const plumber = require("gulp-plumber");
const mincss = require("gulp-clean-css");
const del = require("del");
const sync = require("gulp-file-sync");
const watch = require("gulp-watch");

const baseDir = "../"; //应用程序根目录
const srcDir = baseDir + "src/" //源代码目录
const libDir = baseDir + "lib/"; //第三方库目录
const distDir = baseDir + "dist/"; //目标目录
const libJsDir = libDir + "js/"; //第三方js库目录
const libCssDir = libDir + "css/"; //第三方css库目录
const libFontsDir = libDir + "fonts/"; //第三方的字体目录

const appJsDir = srcDir + "js/"; //项目js目录
const appCssDir = srcDir + "css/"; //项目css目录
const appHtmlDir = srcDir + "html/"; //项目html目录
const appHtmlTempDir = appHtmlDir + "templates/"; //项目html的templates目录
const imagesDir = srcDir + "images/"; //项目图片目录

const distHtmlTempDir = distDir + "templates/"; //目标html的templates目录
const distJsDir = distDir + "js/"; //目标js目录
const distCssDir = distDir + "css/"; //目标css目录
const distFontsDir = distDir + "fonts/"; //目标字体目录
const distImagessDir = distDir + "images/"; //目标图片目录

/*清理发布*/
gulp.task("clear", function() {
  del.sync([distDir + "**/*"], {
    force: true
  });
});

/*字体文件*/
gulp.task("fonts", function() {
  //gulp-file-sync插件是同步文件
  sync(libFontsDir, distFontsDir);
});

/*css第三方库*/
gulp.task("csslib", function() {
  var libs = [];
  libs.push(libCssDir + "bootstrap.min.css");
  return gulp.src(libs)
    .pipe(concat("lib.min.css"))
    .pipe(gulp.dest(distCssDir));
});

/*js第三方库打包*/
gulp.task("jslib", function() {
  var libs = [];
  libs.push(libJsDir + "jquery.min.js");
  libs.push(libJsDir + "bootstrap.min.js");
  libs.push(libJsDir + "angular.min.js");
  libs.push(libJsDir + "angular-*.min.js");

  return gulp.src(libs)
    .pipe(concat("lib.min.js"))
    .pipe(gulp.dest(distJsDir));
});

/*图片文件处理*/
gulp.task("images", function() {
  sync(imagesDir, distImagessDir);
});

/*项目html文件*/
gulp.task("html", function() {
  sync(appHtmlTempDir, distHtmlTempDir);
  gulp.src([appHtmlDir + "index.html"])
    .pipe(gulp.dest(distDir));
});

/*项目html.debug文件*/
gulp.task("html-debug", function() {
  sync(appHtmlTempDir, distHtmlTempDir);
  gulp.src([appHtmlDir + "index.debug.html"])
    .pipe(gulp.dest(distDir));
});

/*项目js文件*/
gulp.task("js", function() {
  var jsfiles = [];
  jsfiles.push(appJsDir + "config.js");
  jsfiles.push(appJsDir + "services/**/*.js");
  jsfiles.push(appJsDir + "directives/**/*.js");
  jsfiles.push(appJsDir + "controllers/**/*.js");
  jsfiles.push(appJsDir + "startup.js");

  return gulp.src(jsfiles)
    .pipe(plumber())
    .pipe(jshint()).pipe(jshint.reporter("default"))
    .pipe(concat("app.min.js"))
    .pipe(uglify())
    .pipe(plumber.stop())
    .pipe(gulp.dest(distJsDir));
});

/*项目js.debug文件*/
gulp.task("js-debug", function() {
  var jsfiles = [];
  jsfiles.push(appJsDir + "config.js");
  jsfiles.push(appJsDir + "services/**/*.js");
  jsfiles.push(appJsDir + "directives/**/*.js");
  jsfiles.push(appJsDir + "controllers/**/*.js");
  jsfiles.push(appJsDir + "startup.js");

  return gulp.src(jsfiles)
    .pipe(plumber())
    .pipe(jshint()).pipe(jshint.reporter("default"))
    .pipe(concat("app.js"))
    .pipe(plumber.stop())
    .pipe(gulp.dest(distJsDir));
});

/*项目css打包*/
gulp.task("css", function() {
  var cssfiles = [];
  cssfiles.push(appCssDir + "**/*.css");
  return gulp.src(cssfiles)
    .pipe(plumber())
    .pipe(concat("app.min.css"))
    .pipe(mincss())
    .pipe(plumber.stop())
    .pipe(gulp.dest(distCssDir));
});

/*默认打包任务*/
gulp.task("default", ["clear", "jslib", "csslib", "fonts", "images", "html", "js", "css"], function() {
  console.log("打包任务完成");
});

/*带debug的打包任务*/
gulp.task("debug", ["clear", "jslib", "csslib", "fonts", "images", "html", "html-debug", "js", "js-debug", "css"], function() {
  console.log("打包任务完成");
});

/*开发watch任务*/
gulp.task("watch", function() {

  watch([appJsDir + "**/*.js"], function() {
    gulp.start("js");
    gulp.start("js-debug");
  });

  watch([appCssDir + "**/*.css"], function() {
    gulp.start("css");
  });

  watch([appHtmlDir + "**/*.html"], function() {
    gulp.start("html");
    gulp.start("html-debug");
  });

  watch([imagesDir + "**/*"], function() {
    gulp.start("images");
  });

});