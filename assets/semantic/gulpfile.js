/*******************************
 *           Set-up
 *******************************/

var
  gulp   = require('gulp'),

  // read user config to know what task to load
  config = require('./tasks/config/user')
;


/*******************************
 *            Tasks
 *******************************/

require('./tasks/collections/build')(gulp);
require('./tasks/collections/install')(gulp);

gulp.task('default', gulp.series('watch'));

/*--------------
      Docs
---------------*/

require('./tasks/collections/docs')(gulp);

/*--------------
      RTL
---------------*/

if (config.rtl) {
  require('./tasks/collections/rtl')(gulp);
}


/*--------------
     Custom
---------------*/

var cssWrap = require('../../node_modules/gulp-css-wrap');

// Copy SUI assets to project folder.
// The root files are excluded from Romanesco to avoid merge conflicts.
gulp.task('copy-assets', function (done) {
  gulp.src('./dist/semantic.*')
      .pipe(gulp.dest('./dist/project'));
  done();
});

// Copy NPM assets to vendor folder.
gulp.task('copy-vendor', function (done) {
  gulp.src('../../node_modules/jquery/dist/jquery.min.js')
      .pipe(gulp.dest('./src/themes/romanesco/assets/vendor/jquery'));
  gulp.src('../../node_modules/slick-carousel/slick/fonts/*')
      .pipe(gulp.dest('./src/themes/romanesco/assets/vendor/slick-carousel/fonts'));
  gulp.src('../../node_modules/slick-carousel/slick/*.css')
      .pipe(gulp.dest('./src/themes/romanesco/assets/vendor/slick-carousel'));
  gulp.src('../../node_modules/slick-carousel/slick/*.min.js')
      .pipe(gulp.dest('./src/themes/romanesco/assets/vendor/slick-carousel'));
  gulp.src('../../node_modules/arrive/minified/*.min.js')
      .pipe(gulp.dest('./src/themes/romanesco/assets/vendor/arrive'));
  done();
});

// Isolate SUI classes for use inside CB chunk previews
gulp.task('css-wrap', function (done) {
  gulp.src('dist/semantic.css')
      .pipe(cssWrap({selector:'.chunkOutput'}))
      .pipe(gulp.dest('/home/hugo/Localhost/packages/romanesco-backyard/assets/components/romanescobackyard/css'));
  done();
});
