/**
 * Nette basePath fixator
 *
 * @author Honza Cerny honzacerny.com
 * @license MIT http://opensource.org/licenses/MIT
 *
 * Works with: github.com/yeoman/grunt-usemin
 *
 * Update paths for concat, uglify and cssmin where is nette variable $basePath
 *
 * Use:

    grunt.initConfig({
      ...

      netteBasePath: {
        basePath: 'www',
        options: {
          removeFromPath: ['app/templates/'] // Array of path to remove
        }
      },
      ...
    });

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
    var basePath = this.data.basePath;
    var search = this.data.search;
    var replacePath, dataFixed, clearItem;
    var concatFixed = {}, uglifyFixed = {}, cssminFixed = {};
    var concat = grunt.config('concat') || {},
      uglify = grunt.config('uglify') || {},
      cssmin = grunt.config('cssmin') || { compress: { files: {} }};
    if(concat.options) {
        concatFixed.options = concat.options;
    }
    if(uglify.options) {
      uglifyFixed.options = uglify.options;
    }
    if(cssmin.options) {
      cssminFixed.options = cssmin.options;
    }

    // default
    if (search == "") {
      search = '{$basePath}';
    }

    var clearBasePath = function(path,search){
      return path.replace(search, basePath);
    };

    var index;

    grunt.log.writeln('[Replace Nette {$basePath} => '+ basePath +']');
    grunt.log.writeln('[Nette fix usemin usage real folders]');

    // concat
    grunt.log.debug('- step concat');
    grunt.log.debug(inspect(concat));

    if (concat.generated && concat.generated.files){
      concatFixed.generated = {files:[]};
      for(index in concat.generated.files){
        // grunt.log.debug(inspect(concat.generated.files[index].dest));
        // grunt.log.debug(inspect(concat.generated.files[index].src));
        concatFixed.generated.files[index] = {};
        concatFixed.generated.files[index].dest = clearBasePath(concat.generated.files[index].dest,search)
        dataFixed = [];
        concat.generated.files[index].src.forEach(function(item){
          clearItem = clearBasePath(item,search);
          if (options.removeFromPath){
            options.removeFromPath.forEach(function(whatRemove){
              whatRemove = whatRemove.replace('/', path.sep);
              clearItem = clearItem.replace(whatRemove, '');
            });
          }
          dataFixed.push(clearItem);
        });

        concatFixed.generated.files[index].src = dataFixed;
      }
      grunt.config('concat', concatFixed);
    }

    // uglify
    // todo: refacotr to function
    grunt.log.debug('- step uglify');
    grunt.log.debug(inspect(uglify));

    if (uglify.generated && uglify.generated.files){
      uglifyFixed.generated = {files:[]};
      for(index in uglify.generated.files){
        uglifyFixed.generated.files[index] = {};
        uglifyFixed.generated.files[index].dest = clearBasePath(uglify.generated.files[index].dest,search)
        dataFixed = [];
        uglify.generated.files[index].src.forEach(function(item){
          clearItem = clearBasePath(item,search);
          dataFixed.push(clearItem);
        });

        uglifyFixed.generated.files[index].src = dataFixed;
      }
      grunt.config('uglify', uglifyFixed);
    }

    // css min
    // todo: refacotr to function
    grunt.log.debug('- step cssmin');
    grunt.log.debug(inspect(cssmin));

    if (cssmin.generated && cssmin.generated.files){
      cssminFixed.generated = {files:[]};
      for(index in cssmin.generated.files){
        cssminFixed.generated.files[index] = {};
        cssminFixed.generated.files[index].dest = clearBasePath(cssmin.generated.files[index].dest,search)
        dataFixed = [];
        cssmin.generated.files[index].src.forEach(function(item){
          clearItem = clearBasePath(item,search);
          dataFixed.push(clearItem);
        });

        cssminFixed.generated.files[index].src = dataFixed;
      }
      grunt.config('cssmin', cssminFixed);
    }

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
