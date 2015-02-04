// Generated on 2015-01-07 using generator-ionic 0.6.1
'use strict';

var LIVERELOAD_PORT = 35730;
var lrSnippet = require('connect-livereload')({
  port: LIVERELOAD_PORT
});
var mountFolder = function (connect, dir) {
  return connect.static(require('path').resolve(dir));
};

var _ = require('lodash');
var path = require('path');
var cordovaCli = require('cordova');
var spawn = require('child_process').spawn;

module.exports = function (grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  grunt.loadNpmTasks('grunt-replace');

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    yeoman: {
      // configurable paths
      app: 'www',
      scripts: 'js',
      styles: 'css',
      images: 'img'
    },

    // Environment Variables for Angular App
    // This creates an Angular Module that can be injected via ENV
    // Add any desired constants to the ENV objects below.
    // https://github.com/diegonetto/generator-ionic#environment-specific-configuration
    ngconstant: {
      options: {
        space: '  ',
        wrap: '"use strict";\n\n {%= __ngModule %}',
        name: 'config',
        dest: '<%= yeoman.app %>/js/config.js'
      },
      development: {
        constants: {
          ENV: {
            name: 'development',
            apiEndpoint: 'http://dev.yoursite.com:10000/',
          }
        }
      },
      production: {
        constants: {
          ENV: {
            name: 'production',
            apiEndpoint: 'http://api.yoursite.com/'
          }
        }
      }
    },

    sass: {
      dev: {
        options: {
          style: 'expanded'
          
        },
        files: {
          '<%= yeoman.app %>/<%= yeoman.styles %>/ionic.app.css': 'scss/*.scss'
        }
      },
      dist: {
        options: {
          style: 'compressed',
        },
        files: {
          '<%= yeoman.app %>/<%= yeoman.styles %>/ionic.app.css': 'scss/*.scss'
        }
      }
    },
    // Watches files for changes and runs tasks based on the changed files
    watch: {
      bower: {
        files: ['bower.json'],
        tasks: ['wiredep']
      },     
      js: {
        files: ['<%= yeoman.app %>/<%= yeoman.scripts %>/**/*.js'],
        tasks: ['newer:jshint:all']
      },
      styles: {
        files: ['<%= yeoman.app %>/<%= yeoman.styles %>/**/*.css'],
        tasks: ['autoprefixer']
      },
      sass: {
        files: 'scss/*.scss',
        tasks: ['sass:dev']
      },
      livereload: {
        options: {
          livereload: LIVERELOAD_PORT
        },
        files: [
          '<%= yeoman.app %>/{,*/}*.html'//,
          //'.tmp/styles/{,*/}*.css',
          //'{.tmp,<%= yeoman.app %>}/scripts/{,*/}*.js',
          //'<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
          ]
        },
        gruntfile: {
          files: ['Gruntfile.js'],
          tasks: ['ngconstant:development']
        }
      },

    // The actual grunt server settings
    connect: {
      options: {
        port: 9000,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: 'localhost'
      },
      livereload: {
        options: {
          middleware: function (connect) {
            return [
            lrSnippet,
            mountFolder(connect, '.tmp'),
            mountFolder(connect, 'app')
            ];
          }
        }
      },
      dist: {
        options: {
          base: 'www'
        }
      },
      coverage: {
        options: {
          port: 9002,
          open: true,
          base: ['coverage']
        }
      }
    },

    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: [
      'Gruntfile.js',
      '<%= yeoman.app %>/<%= yeoman.scripts %>/**/*.js'
      ],
      test: {
        options: {
          jshintrc: 'test/.jshintrc'
        },
        src: ['test/unit/**/*.js']
      }
    },

    autoprefixer: {
      options: {
        browsers: ['last 1 version']
      },
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/<%= yeoman.styles %>/',
        src: '{,*/}*.css',
        dest: '.tmp/<%= yeoman.styles %>/'
      }]
    }
  },

    // Automatically inject Bower components into the app
    wiredep: {
      app: {
        src: ['<%= yeoman.app %>/index.html'],
        ignorePath:  /\.\.\//
      },
      dev: {
        src: ['<%= yeoman.app %>/index.html'],
        ignorePath:  /\.\.\//,
        devDependencies: true,
        exclude: [ /ngCordovaCustom/, /ngCordova/]
      }
    },

    

    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
      html: '<%= yeoman.app %>/index.html',
      options: {
        dest: 'www',
        flow: {
          html: {
            steps: {
              js: ['concat', 'uglifyjs'],
              css: ['cssmin']
            },
            post: {}
          }
        }
      }
    },

    // Performs rewrites based on the useminPrepare configuration
    usemin: {
      html: ['www/**/*.html'],
      css: ['www/<%= yeoman.styles %>/**/*.css'],
      options: {
        assetsDirs: ['www']
      }
    },

    // The following *-min tasks produce minified files in the dist folder
    cssmin: {
      options: {
        root: '<%= yeoman.app %>',
        noRebase: true
      }
    },
    htmlmin: {
      dist: {
        options: {
          collapseWhitespace: true,
          collapseBooleanAttributes: true,
          removeCommentsFromCDATA: true,
          removeOptionalTags: true
        },
        files: [{
          expand: true,
          cwd: 'www',
          src: ['*.html', 'templates/**/*.html'],
          dest: 'www'
        }]
      }
    },
    copy: {
      dev: { 
        cwd: 'fonts/',
        src: '**',
        expand: true,
        dest: '<%= yeoman.app %>/lib/ionic/fonts/' 
      },
      dist: {
        expand: true,
        cwd: 'app/lib/ionic/release/fonts/',
        dest: '<%= yeoman.app %>/fonts/',
        src: '*'

      }
    },
    concurrent: {
      ionic: {
        tasks: [],
        options: {
          logConcurrentOutput: true
        }
      }
    },
    replace: {
      development: {
        options: {
          patterns: [{
            json: grunt.file.readJSON('./config/environments/development.json')
          }]
        },
        files: [{
          expand: true,
          flatten: true,
          src: ['./config/config.js'],
          dest: '<%= yeoman.app %>/js/shared/'
        }]
      },
      production: {
        options: {
          patterns: [{
            json: grunt.file.readJSON('./config/environments/production.json')
          }]
        },
        files: [{
          expand: true,
          flatten: true,
          src: ['./config/config.js'],
          dest: '<%= yeoman.app %>/js/shared/'
        }]
      }
    },

    // By default, your `index.html`'s <!-- Usemin block --> will take care of
    // minification. These next options are pre-configured if you do not wish
    // to use the Usemin blocks.
    // cssmin: {
    //   dist: {
    //     files: {
    //       'www/<%= yeoman.styles %>/main.css': [
    //         '.tmp/<%= yeoman.styles %>/**/*.css',
    //         '<%= yeoman.app %>/<%= yeoman.styles %>/**/*.css'
    //       ]
    //     }
    //   }
    // },
    // uglify: {
    //   dist: {
    //     files: {
    //       'www/<%= yeoman.scripts %>/scripts.js': [
    //         'www/<%= yeoman.scripts %>/scripts.js'
    //       ]
    //     }
    //   }
    // },
    // concat: {
    //   dist: {}
    // },

    // Test settings
    // These will override any config options in karma.conf.js if you create it.
    karma: {
      options: {
        basePath: '',
        frameworks: ['mocha', 'chai'],
        files: [
        '<%= yeoman.app %>/lib/angular/angular.js',
        '<%= yeoman.app %>/lib/angular-animate/angular-animate.js',
        '<%= yeoman.app %>/lib/angular-sanitize/angular-sanitize.js',
        '<%= yeoman.app %>/lib/angular-ui-router/release/angular-ui-router.js',
        '<%= yeoman.app %>/lib/angular-resource/angular-resource.js',
        '<%= yeoman.app %>/lib/ionic/release/js/ionic.js',
        '<%= yeoman.app %>/lib/ionic/release/js/ionic-angular.js',
        '<%= yeoman.app %>/lib/angular-mocks/angular-mocks.js',
        '<%= yeoman.app %>/lib/ng-cordova-mocks/index.js',
        '<%= yeoman.app %>/lib/leaflet-directive/index.js',
        '<%= yeoman.app %>/lib/ngCordova/dist/ng-cordova.js',
        //'<%= yeoman.app %>/lib/ngCordovaCustom/index.js',
        '<%= yeoman.app %>/lib/ng-cordova-mocks/index.js',        
        '<%= yeoman.app %>/<%= yeoman.scripts %>/**/*.js',
        '<%= yeoman.app %>/js/shared/config.js',
        '<%= yeoman.app %>/js/cordova.js',
        '<%= yeoman.app %>/lib/squel/squel.min.js',
        'test/mock/**/*.js',
        'test/spec/**/*.js'
        ],       
        autoWatch: true,
        reporters: ['dots', 'coverage'],
        port: 9999,
        singleRun: false,
        preprocessors: {
          // Update this if you change the yeoman config path
          'www/js/**/*.js': ['coverage']
        },
        coverageReporter: {
          reporters: [
          { type: 'html', dir: 'coverage/' },
          { type: 'text-summary' }
          ]
        }
      },
      unit: {
        // Change this to 'Chrome', 'Firefox', etc. Note that you will need
        // to install a karma launcher plugin for browsers other than Chrome.
        browsers: ['PhantomJS'],
        background: true
      },
      continuous: {
        browsers: ['PhantomJS'],
        singleRun: true,
      },
      debug: {
        // logLevel: 'LOG_DEBUG',
        browsers: ['PhantomJS'],
        preprocessors: null
      } 
    },

    // ngAnnotate tries to make the code safe for minification automatically by
    // using the Angular long form for dependency injection.
    ngAnnotate: {
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/concat/<%= yeoman.scripts %>',
          src: '*.js',
          dest: '.tmp/concat/<%= yeoman.scripts %>'
        }]
      }
    }

  });

  // Register tasks for all Cordova commands
  _.functions(cordovaCli).forEach(function (name) {
    grunt.registerTask(name, function () {
      this.args.unshift(name.replace('cordova:', ''));
      // Handle URL's being split up by Grunt because of `:` characters
      if (_.contains(this.args, 'http') || _.contains(this.args, 'https')) {
        this.args = this.args.slice(0, -2).concat(_.last(this.args, 2).join(':'));
      }
      var done = this.async();
      var exec = process.platform === 'win32' ? 'cordova.cmd' : 'cordova';
      var cmd = path.resolve('./node_modules/cordova/bin', exec);
      var flags = process.argv.splice(3);
      var child = spawn(cmd, this.args.concat(flags));
      child.stdout.on('data', function (data) {
        grunt.log.writeln(data);
      });
      child.stderr.on('data', function (data) {
        grunt.log.error(data);
      });
      child.on('close', function (code) {
        code = code ? false : true;
        done(code);
      });
    });
  });

  // Since Apache Ripple serves assets directly out of their respective platform
  // directories, we watch all registered files and then copy all un-built assets
  // over to www/. Last step is running cordova prepare so we can refresh the ripple
  // browser tab to see the changes. Technically ripple runs `cordova prepare` on browser
  // refreshes, but at this time you would need to re-run the emulator to see changes.
  grunt.registerTask('ripple', ['wiredep', 'ripple-emulator']);
  grunt.registerTask('ripple-emulator', function () {
    grunt.config.set('watch', {
      all: {
        files: _.flatten(_.pluck(grunt.config.get('watch'), 'files')),
        tasks: ['prepare']
      }
    });

    var cmd = path.resolve('./node_modules/ripple-emulator/bin', 'ripple');
    var child = spawn(cmd, ['emulate']);
    child.stdout.on('data', function (data) {
      grunt.log.writeln(data);
    });
    child.stderr.on('data', function (data) {
      grunt.log.error(data);
    });
    process.on('exit', function (code) {
      child.kill('SIGINT');
      process.exit(code);
    });

    return grunt.task.run(['watch']);
  });

  // Wrap ionic-cli commands
  grunt.registerTask('ionic', function() {
    var done = this.async();
    var script = path.resolve('./node_modules/ionic/bin/', 'ionic');
    var flags = process.argv.splice(3);
    var child = spawn(script, this.args.concat(flags), { stdio: 'inherit' });
    child.on('close', function (code) {
      code = code ? false : true;
      done(code);
    });
  });

  grunt.registerTask('serve', function (target) {
    if (target === 'compress') {
      return grunt.task.run(['compress', 'ionic:serve']);
    }

    grunt.config('concurrent.ionic.tasks', ['ionic:serve', 'watch']);
    grunt.task.run(['initDev', 'concurrent:ionic']);
  });
  grunt.registerTask('emulate', function() {
    grunt.config('concurrent.ionic.tasks', ['ionic:emulate:' + this.args.join(), 'watch']);
    return grunt.task.run(['init', 'concurrent:ionic']);
  });
  grunt.registerTask('run', function() {
    grunt.config('concurrent.ionic.tasks', ['ionic:run:' + this.args.join(), 'watch']);
    return grunt.task.run(['init', 'concurrent:ionic']);
  });
  grunt.registerTask('build', function() {
    return grunt.task.run(['init', 'ionic:build:' + this.args.join()]);
  });

  grunt.registerTask('init', [
    'ngconstant:development',
    'wiredep:app',
    'autoprefixer',
    'replace:production'
    ]);

  grunt.registerTask('initDev', [
    'ngconstant:development',
    'sass:dev',
    'wiredep:dev',
    'autoprefixer',
    'copy:dev',
    'connect:livereload',
    'replace:development'
    ]);




  grunt.registerTask('compress', [
    'ngconstant:production',
    'sass:dist',
    'wiredep:app',
    'useminPrepare',
    'autoprefixer',
    'concat',
    'ngAnnotate',
    'cssmin',
    'uglify',
    'usemin',
    'htmlmin'
    ]);

  grunt.registerTask('coverage', ['karma:continuous', 'connect:coverage:keepalive']);

  grunt.registerTask('default', [
    'newer:jshint',
    'karma:continuous',
    'compress'
    ]);

  grunt.registerTask('debug', [
    'autoprefixer',
    'karma:debug:start'
    ]);

  grunt.registerTask('test', [
    'autoprefixer',
    'karma:unit:start'
    ]);

  
};
