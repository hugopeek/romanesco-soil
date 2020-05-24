/*******************************
 *           Set-up
 *******************************/

const
    gulp   = require('gulp'),

    // load yargs for reading command line arguments
    argv = require('yargs')
        .alias('c', 'key')
        .alias('t', 'task')
        .alias('d', 'dist')
        .describe('c', 'Provide the context_key of the context you want to build.')
        .describe('t', 'Choose which task to run. You can add separate flags for multiple tasks.')
        .describe('d', 'Path context dist folder.')
        .choices('t', ['css', 'javascript', 'assets', 'custom', 'all'])
        .default('t','css','css')
        .default('d','','assets/semantic/dist/CONTEXT_KEY')
        .help('help')
        .argv,

    // read user config to know what task to load
    config = require('./assets/semantic/tasks/config/user')
;


/*******************************
 *            Tasks
 *******************************/

require('./assets/semantic/tasks/collections/build')(gulp);
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

// Copy SUI assets to project folder and NPM assets to vendor folder.
// The root files are excluded from Romanesco to avoid merge conflicts.
gulp.task('copy', function (done) {
  gulp.src('./assets/semantic/dist/semantic.*')
      .pipe(gulp.dest('./assets/semantic/dist/project'));
  gulp.src('./node_modules/jquery/dist/jquery.min.js')
      .pipe(gulp.dest('./assets/semantic/src/themes/romanesco/assets/vendor/jquery'))
      .pipe(gulp.dest('./../packages/romanesco-backyard/assets/components/romanescobackyard/js'));
  gulp.src('./node_modules/swiper/css/*.css')
      .pipe(gulp.dest('./assets/semantic/src/themes/romanesco/assets/vendor/swiper'));
  gulp.src('./node_modules/swiper/js/*.min.js')
      .pipe(gulp.dest('./assets/semantic/src/themes/romanesco/assets/vendor/swiper'));
  gulp.src('./node_modules/arrive/minified/*.min.js')
      .pipe(gulp.dest('./assets/semantic/src/themes/romanesco/assets/vendor/arrive'));
  gulp.src('./node_modules/vanilla-lazyload/dist/*.min.js')
      .pipe(gulp.dest('./assets/semantic/src/themes/romanesco/assets/vendor/vanilla-lazyload'));
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
  const tasks = require('./assets/semantic/tasks/config/tasks');

  gulp.src('./assets/semantic/src/themes/romanesco/assets/css/swiper.less')
      .pipe(less())
      .pipe(autoprefixer(tasks.settings.prefix))
      .pipe(concat('swiper.css'))
      .pipe(gulp.dest('./assets/semantic/src/themes/romanesco/assets/css/'))
      .pipe(minify())
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest('./assets/semantic/src/themes/romanesco/assets/css/'));
  gulp.src(['css/*.css','!css/*.min.css'],{cwd: './assets/'})
      .pipe(minify({inline: ['local', 'remote', '!fonts.googleapis.com']}))
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest('./assets/css/'));
  gulp.src(['js/*.js','!js/*.min.js'],{cwd: './assets/semantic/src/themes/romanesco/assets/'})
      .pipe(uglify(tasks.settings.uglify))
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest('./assets/semantic/src/themes/romanesco/assets/js/'));

  done();
});

// Build theme for specific context
gulp.task('build-context', function (done) {
  let context = argv.key;
  let dist = argv.d;
  let task = argv.t;
  let tasks = [];

  // Set default path if needed
  if (!dist) dist = './assets/semantic/dist/' + context;

  // Ensure destination path has trailing /
  dist += dist.endsWith("/") ? "" : "/";

  // Set custom output paths
  config.paths.output.packaged = dist;
  config.paths.output.uncompressed = dist + 'components/';
  config.paths.output.compressed = dist + 'components/';
  config.paths.output.themes = dist + 'themes/';
  config.paths.output.clean = dist;

  // Create the correct build commands
  if (Array.isArray(task)) {
    task.forEach(function(item) {
      tasks.push('build-' + item);
    })
  } else if (task === 'all') {
    tasks.push('build');
  }
  else {
    tasks.push('build-' + task);
  }

  // Tasks for switching config files
  gulp.task('switch-config', function (switchDone) {
    gulp.src('./assets/semantic/src/theme.config').pipe(gulp.dest('./assets/semantic/src/tmp'));
    gulp.src('./assets/semantic/src/contexts/' + context + '/theme.config').pipe(gulp.dest('./src/'));
    switchDone();
  })
  gulp.task('revert-switch', function (revertDone) {
    const clean = require('gulp-clean');
    gulp.src('./assets/semantic/src/tmp/theme.config').pipe(gulp.dest('./assets/semantic/src/'));
    gulp.src('./assets/semantic/src/tmp', {read: false}).pipe(clean());
    revertDone();
  })

  // Exit on error
  if (!context) {
    console.error('Context not defined!');
    return false;
  }
  if (!tasks) {
    console.error('Task(s) not defined!');
    return false;
  }

  // Run in sequence
  console.info('Building Semantic');
  gulp.series('switch-config',tasks.join(','),'revert-switch')(done);
});

// Isolate SUI classes for use inside CB chunk previews
gulp.task('css-wrap', function (done) {
  const cssWrap = require('./node_modules/gulp-css-wrap');

  gulp.src('./assets/semantic/dist/semantic.css')
      .pipe(cssWrap({selector:'.chunkOutput'}))
      .pipe(gulp.dest('./../packages/romanesco-backyard/assets/components/romanescobackyard/css'));
  gulp.src('./assets/semantic/dist/components/step.css')
      .pipe(cssWrap({selector:'.chunkOutput'}))
      .pipe(gulp.dest('./../packages/romanesco-backyard/assets/components/romanescobackyard/css'));
  done();
});

// Generate & inline critical-path CSS
gulp.task('critical', function (done) {
  const critical = require('critical');

  // This is just an example..
  critical.generate({
    inline: true,
    base: './static/',
    src: 'index.html',
    dest: 'dist/index-critical.html',
    width: 1400,
    height: 800,
    minify: true
  });
  done();
});