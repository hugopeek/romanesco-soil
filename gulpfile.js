/*******************************
 *           Set-up
 *******************************/

const
  gulp   = require('gulp'),

  // read user config to know what task to load
  config = require('./assets/semantic/tasks/config/user')
;


/*******************************
 *            Tasks
 *******************************/

require('./assets/semantic/tasks/collections/build')(gulp);
require('./assets/semantic/tasks/collections/various')(gulp);
require('./assets/semantic/tasks/collections/install')(gulp);

gulp.task('default', gulp.series('watch'));

/*--------------
      Docs
---------------*/

require('./assets/semantic/tasks/collections/docs')(gulp);

/*--------------
      RTL
---------------*/

if (config.rtl) {
  require('./assets/semantic/tasks/collections/rtl')(gulp);
}


/*--------------
     Custom
---------------*/

// Minify custom CSS/JS elements
gulp.task('minify', function (done) {
  const minify = require('gulp-clean-css');
  const uglify = require('gulp-uglify');
  const rename = require('gulp-rename');
  const tasks = require('./assets/semantic/tasks/config/tasks');

  gulp.src(['css/*.css','!css/*.min.css'],{cwd: './assets/'})
    .pipe(minify({inline: ['local', 'remote', '!fonts.googleapis.com']}))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./assets/css/'))
  ;
  gulp.src(['js/*.js','!js/*.min.js'],{cwd: './assets/'})
    .pipe(uglify(tasks.settings.uglify))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./assets/js/'))
  ;
  done();
});