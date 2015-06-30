var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync');
var reload = browserSync.reload;


gulp.task('styles', function () {
  return gulp.src('styles/main.scss')
    .pipe($.sourcemaps.init())
    .pipe($.sass({
      outputStyle: 'nested', // libsass doesn't support expanded yet
      precision: 10,
      includePaths: ['.'],
      onError: console.error.bind(console, 'Sass error:')
    }))
    .pipe($.postcss([
      require('autoprefixer-core')({browsers: ['last 1 version']})
    ]))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('styles'))
    .pipe(reload({stream: true}));
});


gulp.task('serve', ['styles'], function () {
  browserSync({
    notify: false,
    port: 2000,
    server: {
      baseDir: [''],
      routes: {
        '/bower_components': 'bower_components'
      }
    }
  });

  // watch for changes
  gulp.watch([
    '*.html',
    'scripts/**/*.js',
    'images/**/*'
  ]).on('change', reload);

  gulp.watch('styles/*.scss', ['styles']);
});


gulp.task('default', ['styles'], function () {
  gulp.start('serve');
});