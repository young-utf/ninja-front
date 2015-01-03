'use strict';

//Gruntfile.js

module.exports = function (grunt) {

  //Project configuration

  grunt.initConfig({
    pck: grunt.file.readJSON('package.json'),
    jshint : {
      files: ['Gruntfile.js', 'client/app/**/*.js'],
      options: {
        jshintrc: '.jshintrc'
      }
    }
  });

  //Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-jshint');

  // Default task(s).

  grunt.registerTask('default', ['jshint']);
};