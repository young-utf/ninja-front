'use strict';
//var common = require('./server/common.js');
//Gruntfile.js

module.exports = function (grunt) {
  //Project configuration

  grunt.initConfig({

    // Package
    pck: grunt.file.readJSON('package.json'),

    // Express Server
    express: {
      options: {
        // Override defaults here
      },
      dev: {
        options: {
          script: 'server/server.js'
        }
      },
      prod: {
        options: {
          //script: 'path/to/prod/server.js',
          //node_env: 'production'
        }
      },
      test: {
        options: {
          //script: 'path/to/test/server.js'
        }
      }
    },

    // Watch changes and run tasks
    watch: {
      injectJS: {
        files: [
          'client/app/**.*.js',
          'client/app/**/**/*.js'
        ],
        tasks: ['injector:scripts']
      },
      injectCss: {
        files: [
          'client/assets/css/*.css'
        ],
        tasks: ['injector:css']
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      livereload: {
        files: [
          'client/app/**.*.js',
          'client/app/**/**/*.js',
          'client/assets/css/*.css',
          'client/index.html',
          'client/assets/images/{,*//*}*.{png,jpg,jpeg,gif,webp,svg}'
        ],
        options: {
          livereload: true
        }
      },
      express: {
        files: [
          'server/**/*.{js,json}'
        ],
        tasks: ['express:dev', 'wait'],
        options: {
          livereload: true,
          nospawn: true //Without this option specified express won't be reloaded
        }
      }
    },

    // JSHint Config
    jshint : {
      files: ['Gruntfile.js', 'client/app/**/*.js'],
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      }
    },

    // Grunt Injector
    injector: {
      options: {},
      scripts: {
        options: {
          transform: function (path) {
            path = path.replace('/client/','');
            return '<script src="' + path + '"></script>';
          },
          starttag: '<!-- grunt injecting:js -->',
          endtag: '<!-- end injecting -->'
        },
        files: {
          'client/index.html': [
              [
                'client/app/**.*.js',
                'client/app/**/**/*.js',
                'client/assets/**/*.js'
              ]
          ]
        }
      },

      css: {
        options: {
          transform: function (path) {
            path = path.replace('/client/', '');
            return '<link rel="stylesheet" href="' + path + '">';
          },
          starttag: '<!-- grunt injecting:css -->',
          endtag: '<!-- end injecting -->'
        },
        files: {
          'client/index.html': [
              ['client/assets/css/*.css']
          ]
        }
      }
    },

    // Grunt Injector for bower libraries
    wiredep: {
      target: {
        src: 'client/index.html',
        exclude: []
      }
    },

    // Concat all the js file.
    concat : {
      dist : {
        src : [
            'client/app/**/*.js',
            'client/assets/js/*.js'
        ],
        dest : 'build/test.js'
      }
    },

    // Uglify all the js file
    uglify : {
      dist : {
        files : {
          'build/uglified-test.js' : ['build/test.js']
        }
      }
    },

    // Nodemon for DEV mode.
    nodemon: {
      dev: {
        script: 'server/server.js',
        options: {
          nodeArgs: ['--debug'],
          env: {
            PORT: 9000
          },
          callback: function (nodemon) {
            nodemon.on('log', function (event) {
              console.log(event.colour);
            });

            // opens browser on initial server start
            nodemon.on('config:update', function () {
              setTimeout(function () {
                require('open')('http://localhost:9000');
              }, 500);
            });
          }
        }
      }
    }
  });


  //Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-injector');
  grunt.loadNpmTasks('grunt-wiredep');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Serve task(s).

  grunt.registerTask('default', [
    'jshint',
    'concat',
    'uglify',
    'injector',
    'wiredep',
    'nodemon',
    'express:dev',
    'watch'
  ]);
};