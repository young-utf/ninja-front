'use strict';
var common = require('./server/common.js');
//Gruntfile.js

module.exports = function (grunt) {
  //Project configuration

  grunt.initConfig({

    // Package
    pck: grunt.file.readJSON('package.json'),

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
              ['client/app/**.*.js'
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
      debug: {
        script: 'server/app.js',
        options: {
          nodeArgs: ['--debug-brk'],
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
                require('open')('http://localhost:8080/debug?port=5858');
              }, 500);
            });
          }
        }
      }
    },
  });


  //Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-injector');
  grunt.loadNpmTasks('grunt-wiredep');


  // Serve task(s).

  grunt.registerTask('dev', [
    'jshint',
    'concat',
    'uglify',
    'injector',
    'wiredep'
  ]);
};