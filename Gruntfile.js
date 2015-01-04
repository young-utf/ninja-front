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
            common.log(path);
            path = path.replace('/client/','');
            common.log(path);
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
            common.debug(path);
            path = path.replace('/client/', '');
            common.debug(path);
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
    }
  });


  //Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-injector');


  // Serve task(s).

  grunt.registerTask('serve', [
    'jshint',
    'concat',
    'uglify',
    'injector'
  ]);
};