(function() {
  'use strict';
  var env = process.env.NODE_ENV || 'development';
  if (env === 'development') {
    require('dotenv').load();
  }

  var gulp = require('gulp'),
    jade = require('gulp-jade'),
    less = require('gulp-less'),
    mocha = require('gulp-mocha'),
    Server = require('karma').Server,
    browserSync = require('browser-sync'),
    bower = require('gulp-bower'),
    stripeDebug = require('gulp-strip-debug'),
    istanbul = require('gulp-istanbul'),
    nodemon = require('gulp-nodemon'),
    rename = require('gulp-rename'),
    del = require('del'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    notify = require('gulp-notify'),
    imagemin = require('gulp-imagemin'),
    ngAnnotate = require('gulp-ng-annotate'),
    jshint = require('gulp-jshint'),
    karma = require('gulp-karma'),
    uglify = require('gulp-uglify'),
    buffer = require('vinyl-buffer'),
    minifyCss = require('gulp-minify-css'),
    sourcemaps = require('gulp-sourcemaps'),
    gutil = require('gulp-util'),
    cache = require('gulp-cache');

  // minify css
  gulp.task('less', function() {
    return gulp.src('./app/styles/*.+(less|css)')
      .pipe(less())
      .pipe(minifyCss())
      .pipe(rename({
        suffix: '.min'
      }))
      .pipe(gulp.dest('./public/css/'))
      .pipe(sourcemaps.init())
      .pipe(rename('application.min.css'))
      .pipe(gulp.dest('public/css/'))
      .pipe(sourcemaps.write('./maps'))
      .pipe(browserSync.reload({
        stream: true
      }))
      .pipe(notify({
        message: 'less task completed'
      }))
      .on('error', function(error) {
        gutil.log(gutil.colors.red(error.message));
        // Notify on error. Uses node-notifier
        notifier.notify({
          title: 'Less compilation error',
          message: error.message
        });
      });
  });

  // jade task
  gulp.task('jade', function() {
    return gulp.src(['!app/shared/**', 'app/**/*.jade'])
      .pipe(jade())
      .pipe(gulp.dest('./public/'));
  });

  // define task for imagemin
  gulp.task('imagemin', function() {
    return del(['public/images']),
      gulp.src('app/images/**/*')
      .pipe(cache(imagemin({
        optimizationLevel: 3,
        progressive: true,
        interlaced: true
      })))
      .pipe(gulp.dest('public/images'))
      .pipe(notify({
        message: 'Images task completed'
      }));
  });
  // bower install task
  gulp.task('bower', function() {
    return bower()
      .pipe(gulp.dest('public/lib/'));
  });

  // browserify function
  // TODO: remember to work on this later
  gulp.task('browserify', function() {
    return browserify('./app/js/application.js')
      .bundle()
      .on('success', gutil.log.bind(gutil, 'Browserify Rebundled'))
      .on('error', gutil.log.bind(gutil, 'Browserify ' +
        'Error: in browserify gulp task'))
      // vinyl-source-stream makes the bundle compatible with gulp
      .pipe(source('application.js')) // Desired filename
      //.pipe(ngAnnotate())
      // .pipe(buffer())
      // .pipe(uglify())
      // .pipe(stripeDebug())
      // Output the file
      // .pipe(gulp.dest('./public/js/'))
      // .pipe(sourcemaps.init({
      //  loadMaps: true
      // }))
      // .pipe(sourcemaps.write('./maps'))
      .pipe(gulp.dest('./public/js/'));
  });

  // define jshint lint
  gulp.task('jshint', function() {
    return gulp.src(['./app/js/**/*.js', './server/**/*.js',
        './index.js', './spec/**/*.js'
      ])
      .pipe(jshint())
      .pipe(jshint.reporter('default'));
  });

  // staatic files task
  gulp.task('static-files', function() {
    return gulp.src(['!app/**/*.+(less|css|js|jade)',
        '!app/images/**/*',
        'app/**/*.*'
      ])
      .pipe(gulp.dest('./public/'));
  });

  // browser-sync task
  gulp.task('browser-sync', ['default'], function() {
    browserSync.init(null, {
      baseDir: 'public',
      proxy: 'http://localhost:5555',
      injectChanges: true
    });
  });

  // define coverage report
  gulp.task('test-coverage', function() {
    return gulp.src('./coverage/lcov/info')
      .pipe(istanbul())
      // .pipe(coveralls())
      // Force `require` to return covered files
      .pipe(istanbul.hookRequire());
  });

  //  task for back end test
  gulp.task('test:bend', ['test:fend'], function() {
    return gulp.src('spec/server/*.js', {
        read: false
      })
      .pipe(mocha({
        reporter: 'spec'
      }))
      // Creating the reports after tests ran
      .pipe(istanbul.writeReports())
      // Enforce a coverage of at least 80%
      .pipe(istanbul.enforceThresholds({
        thresholds: {
          global: 80
        }
      }));
  });

  // task for front end test
  gulp.task('test:fend', ['browserify', 'bower'], function() {
  new Server({
      configFile: __dirname + '/karma.conf.js',
      singleRun: true
    }).start();
    // server.on('browser_error', function(browser, err) {
    //   gutil.log('Karma Run Failed: ' + err.message);
    //   throw err;
    // });

    // server.on('run_complete', function(browsers, results) {
    //   if (results.failed) {
    //     throw new Error('Karma: Tests Failed');
    //   }
    //   gutil.log('Karma Run Complete: No Failures');
    //   done();
    // });

    // server.start();
  });

  // e2e test task
  gulp.task('test:e2e', function(cb) {
    gulp.src(['./spec/e2e/*.js'])
      .pipe(protractor({
        configFile: './protractor.conf.js',
        args: ['--baseUrl', 'http://127.0.0.1:8000']
      }))
      .on('error', function(e) {
        console.log(e);
      })
      .on('end', cb);
  });

  // task for nodemon
  gulp.task('nodemon', function() {
    nodemon({
      ext: 'js',
      script: 'index.js',
      ignore: ['node_modules/', 'public/', 'coverage/']
    })
    // .on('watch', ['watch'])
    .on('change', ['watch'])
      .on('restart', function() {
        console.log('Appliction restarted..>>');
      });
  });

  // task to watch files
  gulp.task('watch', function() {
    gulp.watch('./app/**/*.jade', ['jade'], browserSync.reload);
    gulp.watch('./app/styles/*.+(less|css)', ['less'], browserSync.reload);
    gulp.watch('./app/**/*.js', ['browserify'], browserSync.reload);
    gulp.watch('./gulpfile.js', ['build'], browserSync.reload);
  });

  // build task
  gulp.task('build', ['jade', 'less', 'static-files',
    'imagemin', 'browserify', 'bower'
  ]);

  // register test task
  gulp.task('test', ['test:fend', 'test:bend']);
  // deployment tasks
  gulp.task('heroku:production', ['build']);
  gulp.task('heroku:develop', ['build']);
  gulp.task('production', ['nodemon', 'build']);
  // register default tasks
  gulp.task('default', ['nodemon', 'watch', 'build']);
})();