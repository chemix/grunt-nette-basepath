/**
 * Nette basePath fixator
 *
 * @author Honza Cerny honzacerny.com
 * @license MIT http://opensource.org/licenses/MIT
 *
 * Works with: github.com/yeoman/grunt-usemin
 *
 * Update paths for concat, uglify and cssmin where is nette variable $basePath
 */

var fs = require('fs'),
  path = require('path'),
  util = require('util');

var inspect = function (obj) {
  return util.inspect(obj, false, 4, true);
};

module.exports = function(grunt) {
  "use strict";

  grunt.registerMultiTask('netteBasePath', 'In list of files to prepare replace $basePath with real path', function() {
    var options = this.options();
    var basePath = this.data;
    var replacePath, dataFixed, clearItem, path;
    var concatFixed = {}, uglifyFixed = {}, cssminFixed = {};
    var concat = grunt.config('concat') || {},
      uglify = grunt.config('uglify') || {},
      cssmin = grunt.config('cssmin') || { compress: { files: {} }};

    var clearBasePath = function(path){
      return path.replace('{$basePath}', basePath);
    };

    grunt.log.writeln('[Nette replace $basePath => '+ basePath +']');
    grunt.log.writeln('[Nette fix usemin usage real folders]');

    // concat
    for(path in concat){
      replacePath = clearBasePath(path);
      dataFixed = [];
      concat[path].forEach(function(item){
        clearItem = clearBasePath(item);
        if (options.removeFromPath){
          options.removeFromPath.forEach(function(whatRemove){
            clearItem = clearItem.replace(whatRemove, '');
          });
        }
        dataFixed.push(clearItem);
      });
      concatFixed[replacePath] = dataFixed;
    }
    grunt.config('concat', concatFixed);

    // uglify
    for(path in uglify){
      replacePath = clearBasePath(path);
      dataFixed = clearBasePath(uglify[path]);
      uglifyFixed[replacePath] = dataFixed;
    }
    grunt.config('uglify', uglifyFixed);

    // css min
    for(path in cssmin){
      replacePath = clearBasePath(path);
      dataFixed = clearBasePath(cssmin[path]);
      cssminFixed[replacePath] = dataFixed;
    }
    grunt.config('cssmin', cssminFixed);

    // log a bit what was update in config
    grunt.log.subhead('Configuration is now:')
      .subhead('concat:')
      .writeln('  ' + inspect(concatFixed))
      .subhead('uglify:')
      .writeln('  ' + inspect(uglifyFixed))
      .subhead('cssmin:')
      .writeln('  ' + inspect(cssminFixed));
  });

};
