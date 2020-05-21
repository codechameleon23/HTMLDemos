const gulp = require("gulp"),
  // babel = require('gulp-babel'),
  sass = require("gulp-sass"),
  autoprefixer = require('gulp-autoprefixer'),
  beautify = require('gulp-beautify'),
  browserSync = require("browser-sync").create(),
  cleanCSS = require('gulp-clean-css'),
  concat = require('gulp-concat'),
  csscomb = require('gulp-csscomb'),
  fileinclude = require('gulp-file-include'),
  htmlmin = require('gulp-htmlmin'),
  imagemin = require('gulp-image'),
  purify = require('gulp-purifycss'),
  svgo = require('gulp-svgo');

const PROJECT_NAME = 'GM_Website_HTML';
const PROJECT_PATH = ".";

const DEST_CSS_PATH = PROJECT_PATH+"/css";
const DEST_JS_PATH = PROJECT_PATH+"/js";
const DEST_IMG_PATH = PROJECT_PATH+"/images";

const DEST_SELECT_HTML = PROJECT_PATH+"/*.html";
const DEST_SELECT_CSS = DEST_CSS_PATH+"/**/*.css";
const DEST_SELECT_JS = DEST_JS_PATH+"/**/*.js";
// const DEST_SELECT_IMG = DEST_IMG_PATH+"/**/*.*";

const SRC_PATH = PROJECT_PATH+"/src";
const SRC_HTML_PATH = SRC_PATH+"/_htmls";
const SRC_CSS_PATH = SRC_PATH+"/_scss";
const SRC_JS_PATH = SRC_PATH+"/_scripts";
const ROOT_JS_PATH = "../SCRIPTS_FILES";
const SRC_IMG_PATH = SRC_PATH+"/_images";

const SRC_SELECT_EVERY_HTMLS = SRC_HTML_PATH+"/**/*.html";
const SRC_SELECT_HTML = SRC_HTML_PATH+"/*.html";
const SRC_SELECT_SCSS = SRC_CSS_PATH+"/**/*.scss";
const SRC_SELECT_JS = SRC_JS_PATH+"/**/*.js"; 
const SRC_SELECT_IMG = SRC_IMG_PATH+"/**/*.*";

const PROJECT_JS_LIST = [
  ROOT_JS_PATH+'/jquery-3.3.1.min.js',
  ROOT_JS_PATH+'/magnific.popup.min.js',
  ROOT_JS_PATH+'/jquery.popupoverlay.js',
  ROOT_JS_PATH+'/jquery.mapify.min.js',
  ROOT_JS_PATH+'/jquery-doubletaptogo.min.js',
  ROOT_JS_PATH+'/owl.carousel.min.js',
  // ROOT_JS_PATH+'/mCustomScrollbar.min.js',
  ROOT_JS_PATH+'/animate.on.scroll.min.js',
  // ROOT_JS_PATH+'/flatpickr.min.js',
  // ROOT_JS_PATH+'/ion.rangeSlider.min.js',
  ROOT_JS_PATH+'/stackedrows.min.js',
  // SRC_JS_PATH+'/hamburgerToggle.js',
  // SRC_JS_PATH+'/searchbarToggle.js',
  SRC_JS_PATH+'/navbar.js',
  SRC_JS_PATH+'/submenutoggle.js',
  SRC_JS_PATH+'/bannerCarousel.js',
  SRC_JS_PATH+'/itemCarousel.js',
  SRC_JS_PATH+'/popup.js',
  SRC_JS_PATH+'/magnificPopup.js',
  SRC_JS_PATH+'/scripts.js',
  SRC_JS_PATH+'/aos.js',
  SRC_JS_PATH+'/iphonePageHack.js',
  // SRC_JS_PATH+'/accordion.js',
];

const PROJECT_PAGES_LIST = [
  './src/allpages.html',
  './src/index.html',
  './src/whats-on.html',
  './src/plan-a-visit.html',
  './src/event-details.html',
  './src/shop.html',
  './src/product-details.html',
  './src/basket.html',
  './src/explore-and-research.html',
  './src/history-and-collections.html',
  './src/item-details.html',
  './src/archive-enquiry.html',
  './src/join-and-support.html',
  './src/become-a-friend.html',
  './src/about-us.html',
  './src/flexibuilder.html',
]

function CSS_OPERATION() {
  return gulp
    .src(SRC_SELECT_SCSS)
    .pipe(sass())
    .on("error", sass.logError)
    .pipe(autoprefixer())
    .pipe(csscomb())
    .pipe(gulp.dest(DEST_CSS_PATH))
    .pipe(browserSync.stream());
}

function CSS_PURIFY() {
  return gulp
    .src(DEST_SELECT_CSS)
    .pipe(purify([DEST_SELECT_JS, DEST_SELECT_HTML]))
    .pipe(cleanCSS({format: 'keep-breaks'}))
    .pipe(gulp.dest(DEST_CSS_PATH))
    .pipe(browserSync.stream());
}

function IMG_OPERATION() {
  return gulp
    .src(SRC_SELECT_IMG)
    .pipe(svgo())
    .pipe(imagemin())
    .pipe(gulp.dest(DEST_IMG_PATH))
    .pipe(browserSync.stream());
}

function HTML_OPERATION() {
  return gulp
    .src(PROJECT_PAGES_LIST)
    .pipe(fileinclude({
      prefix: '@@',
      basepath: SRC_PATH,
      context: {
        button: {
          type: "",
          buttonSxCommon: "button fweight-regular fcolor-white capitalize p-xs hover:shadow-bottom",
          buttonSx: "bg-secondary hover:bg-secondary",
          label: "Button",
          link: "#",
          attributes: "",
          innerHtml: ""
        },
        name: 'test',
        arr: []
      }
    }))
    .pipe(htmlmin({
      collapseWhitespace: true,
      conservativeCollapse: true,
      preserveLineBreaks: true,
      keepClosingSlash: true,
      // sortClassName: true,
    }))
    .pipe(beautify.html({
      indent_size: 2
    }))
    .pipe(gulp.dest("./"))
    .pipe(browserSync.stream());
}

function JS_OPERATION() {
  return gulp
    .src(PROJECT_JS_LIST)
    // .pipe(babel())
    .pipe(concat('allScript.js'))
    .pipe(gulp.dest(DEST_JS_PATH))
    .pipe(browserSync.stream());
}


// A simple task to reload the page
function reload() {
  browserSync.reload();
}

// Add browsersync initialization at the start of the watch task
function watch() {
  browserSync.init({
    server: {
      baseDir: "./" //folder to watch on browserSync
    }
  });
  gulp.watch(SRC_CSS_PATH, CSS_OPERATION);
  gulp.watch(SRC_PATH, HTML_OPERATION);
  gulp.watch(SRC_IMG_PATH, IMG_OPERATION);
  gulp.watch(SRC_JS_PATH, JS_OPERATION);
  gulp.watch(SRC_CSS_PATH, CSS_PURIFY);
  // We should tell gulp which files to watch to trigger the reload
  // This can be html or whatever you're using to develop your website
  // Note -- you can obviously add the path to the Paths object
  //gulp.watch("src/*.html", reload);
  gulp.watch('./').on('change', browserSync.reload);
}

// We don't have to expose the reload function
// It's currently only useful in other functions


// Don't forget to expose the task!
exports.watch = watch

// Expose the task by exporting it
// This allows you to run it from the commandline using
// $ gulp style
exports.CSS_OPERATION = CSS_OPERATION;
exports.CSS_PURIFY = CSS_PURIFY;
exports.HTML_OPERATION = HTML_OPERATION;
exports.IMG_OPERATION = IMG_OPERATION;
exports.JS_OPERATION = JS_OPERATION;

/*
 * Specify if tasks run in series or parallel using `gulp.series` and `gulp.parallel`
 */
var build = gulp.series(
  CSS_OPERATION,
  JS_OPERATION,
  IMG_OPERATION,
  HTML_OPERATION,
  CSS_PURIFY,
  watch
);

/*
 * You can still use `gulp.task` to expose tasks
 */
//gulp.task('build', build);

/*
 * Define default task that can be called by just running `gulp` from cli
 */
gulp.task('default', build);