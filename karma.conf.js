// Karma configuration
// Generated on Mon Sep 21 2015 11:19:42 GMT+0300 (EAT)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files,
    // exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine', 'sinon'],


    // list of files / patterns to load in the browser
    files: [
      'public/lib/angular/angular.js',
      'public/lib/angular-mocks/angular-mocks.js',
      'public/lib/angular-resource/angular-resource.js',
      'public/lib/angular-route/angular-route.min.js',
      'public/lib/angular-material/angular-material.min.js',
      'public/lib/angular-animate/angular-animate.min.js',
      'public/lib/angular-aria/angular-aria.min.js',
      'public/lib/angular-ui-router/release/angular-ui-router.min.js',
      'public/lib/angular-material-data-table/dist/md-data-table.min.js',
      'public/js/application.js',
      'spec/unit/**/*.js'
    ],


    // list of files to exclude
    exclude: [],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/
    // karma-preprocessor
    preprocessors: {
        'public/js/application.js': ['coverage']
    },


    // test results reporter to use
    // possible values: 'dots', 'progress', 'junit', 'growl',
    // 'coverage', 'spec', 'failed'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: [ 'coverage', 'progress'],

    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR
    // || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever
    // any file changes
    // on true, on Circle CI will break
    autoWatch: false,


    // start these browsers
    // available browser launchers:
    // https://npmjs.org/browse/keyword/karma-launcher
    // Options:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari
    // - PhantomJS
    // - IE
    browsers: ['Chrome'], // 'Firefox', 'Safari'],

    // https://www.youtube.com/watch?v=FQwZrOAmMAc
    // To turn off chrome's security limitations that do
    // not allow some basics things to run
    // That are required while developing
    // customLauncher: {
    //   chrome_without_security: {
    //     base: "Chrome",
    //     flags: ["--disable-web-security"]
    //   }
    // }

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,
    coverageReporter: {
      // specify a common output directory
      dir: 'coverage',
      reporters: [
        // reporters not supporting the `file` property
        { type: 'html', subdir: 'report-html' },
        { type: 'lcov', subdir: 'report-lcov' },
        // reporters supporting the `file` property, use `subdir` to directly
        // output them in the `dir` directory
        { type: 'cobertura', subdir: '.', file: 'cobertura.txt' },
        { type: 'lcovonly', subdir: '.', file: 'report-lcovonly.txt' },
        { type: 'teamcity', subdir: '.', file: 'teamcity.txt' },
        { type: 'text', subdir: '.', file: 'text.txt' },
        { type: 'text-summary', subdir: '.', file: 'text-summary.txt' },
      ]
    }
  });
};
