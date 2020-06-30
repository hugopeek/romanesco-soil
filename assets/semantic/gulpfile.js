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
require('./tasks/collections/various')(gulp);
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

// Copy SUI assets to project folder and NPM assets to vendor folder.
// The root files are excluded from Romanesco to avoid merge conflicts.
gulp.task('copy', function (done) {
  gulp.src('./dist/semantic.*')
    .pipe(gulp.dest('./dist/project'));
  gulp.src('../../node_modules/jquery/dist/jquery.min.js')
    .pipe(gulp.dest('./src/themes/romanesco/assets/vendor/jquery'));
  gulp.src('../../node_modules/swiper/css/*.css')
    .pipe(gulp.dest('./src/themes/romanesco/assets/vendor/swiper'));
  gulp.src('../../node_modules/swiper/js/*.min.js')
    .pipe(gulp.dest('./src/themes/romanesco/assets/vendor/swiper'));
  gulp.src('../../node_modules/arrive/minified/*.min.js')
    .pipe(gulp.dest('./src/themes/romanesco/assets/vendor/arrive'));
  gulp.src('../../node_modules/vanilla-lazyload/dist/*.min.js')
    .pipe(gulp.dest('./src/themes/romanesco/assets/vendor/vanilla-lazyload'));
  done();
});

// Build custom CSS/JS elements
gulp.task('build-custom', function (done) {
  const less = require('gulp-less');
  const autoprefixer = require('gulp-autoprefixer');
  const concat = require('gulp-concat-css');
  const minify = require('gulp-clean-css');
  const uglify = require('gulp-uglify');
  const rename = require('gulp-rename');
  const tasks = require('./tasks/config/tasks');

  gulp.src('./src/themes/romanesco/assets/css/swiper.less')
    .pipe(less())
    .pipe(autoprefixer(tasks.settings.prefix))
    .pipe(concat('swiper.css'))
    .pipe(gulp.dest('./src/themes/romanesco/assets/css/'))
    .pipe(minify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./src/themes/romanesco/assets/css/'));
  gulp.src(['css/*.css','!css/*.min.css'],{cwd: './../'})
    .pipe(minify({inline: ['local', 'remote', '!fonts.googleapis.com']}))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./../css/'));
  gulp.src(['js/*.js','!js/*.min.js'],{cwd: './src/themes/romanesco/assets/'})
    .pipe(uglify(tasks.settings.uglify))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./src/themes/romanesco/assets/js/'));

  done();
});

// Isolate SUI classes for use inside CB chunk previews
gulp.task('css-wrap', function (done) {
  const cssWrap = require('../../node_modules/gulp-css-wrap');

  gulp.src('dist/semantic.css')
    .pipe(cssWrap({selector:'.chunkOutput'}))
    .pipe(gulp.dest('../../../packages/romanesco-backyard/assets/components/romanescobackyard/css'));
  gulp.src('dist/components/step.css')
    .pipe(cssWrap({selector:'.chunkOutput'}))
    .pipe(gulp.dest('../../../packages/romanesco-backyard/assets/components/romanescobackyard/css'));
  done();
});

// Generate & inline critical-path CSS
gulp.task('critical', function (done) {
  const critical = require('critical');

  // This is just an example..
  critical.generate({
    inline: true,
    base: '../../static/',
    src: 'index.html',
    dest: 'dist/index-critical.html',
    width: 1400,
    height: 800,
    minify: true
  });
  done();
});