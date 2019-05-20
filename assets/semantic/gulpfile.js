/*******************************
            Set-up
*******************************/

var
  gulp         = require('gulp-help')(require('gulp')),

  // read user config to know what task to load
  config       = require('./tasks/config/user'),

  // watch changes
  watch        = require('./tasks/watch'),

  // build all files
  build        = require('./tasks/build'),
  buildJS      = require('./tasks/build/javascript'),
  buildCSS     = require('./tasks/build/css'),
  buildAssets  = require('./tasks/build/assets'),

  // utility
  clean        = require('./tasks/clean'),
  version      = require('./tasks/version'),

  // docs tasks
  serveDocs    = require('./tasks/docs/serve'),
  buildDocs    = require('./tasks/docs/build'),

  // rtl
  buildRTL     = require('./tasks/rtl/build'),
  watchRTL     = require('./tasks/rtl/watch'),

  cssWrap      = require('gulp-css-wrap')
;


/*******************************
             Tasks
*******************************/

gulp.task('default', false, [
  'watch'
]);

gulp.task('watch', 'Watch for site/theme changes', watch);

gulp.task('build', 'Builds all files from source', build);
gulp.task('build-javascript', 'Builds all javascript from source', buildJS);
gulp.task('build-css', 'Builds all css from source', buildCSS);
gulp.task('build-assets', 'Copies all assets from source', buildAssets);

gulp.task('clean', 'Clean dist folder', clean);
gulp.task('version', 'Displays current version of Semantic', version);

/*--------------
      Docs
---------------*/

/*
  Lets you serve files to a local documentation instance
  https://github.com/Semantic-Org/Semantic-UI-Docs/
*/

gulp.task('serve-docs', 'Serve file changes to SUI Docs', serveDocs);
gulp.task('build-docs', 'Build all files and add to SUI Docs', buildDocs);


/*--------------
      RTL
---------------*/

if(config.rtl) {
  gulp.task('watch-rtl', 'Watch files as RTL', watchRTL);
  gulp.task('build-rtl', 'Build all files as RTL', buildRTL);
}


/*--------------
     Custom
---------------*/

// Copy SUI assets to project folder and NPM assets to vendor folder.
// The root files are excluded from Romanesco to avoid merge conflicts.
gulp.task('copy', function () {
  gulp.src('./dist/semantic.*').pipe(gulp.dest('./dist/project'));
  gulp.src('../../node_modules/jquery/dist/jquery.min.js').pipe(gulp.dest('./src/themes/romanesco/assets/vendor/jquery'));
  gulp.src('../../node_modules/slick-carousel/slick/fonts/*').pipe(gulp.dest('./src/themes/romanesco/assets/vendor/slick-carousel/fonts'));
  gulp.src('../../node_modules/slick-carousel/slick/*.css').pipe(gulp.dest('./src/themes/romanesco/assets/vendor/slick-carousel'));
  gulp.src('../../node_modules/slick-carousel/slick/*.min.js').pipe(gulp.dest('./src/themes/romanesco/assets/vendor/slick-carousel'));
  gulp.src('../../node_modules/arrive/minified/*.min.js').pipe(gulp.dest('./src/themes/romanesco/assets/vendor/arrive'));
});

// Isolate SUI classes for use inside CB chunk previews
gulp.task('css-wrap', function() {
  gulp.src('dist/semantic.css')
      .pipe(cssWrap({selector:'.chunkOutput'}))
      .pipe(gulp.dest('/home/hugo/Localhost/packages/romanesco-backyard/assets/components/romanescobackyard/css'))
  ;
});
