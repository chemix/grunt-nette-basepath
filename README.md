# grunt-nette-basepath

> Grunt plugin to updates paths for concat, uglify and cssmin where is nette variable $basePath


## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-nette-basepath --save-dev
```

One the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-nette-basepath');
```

## The "netteBasePath" task

### Overview
In your project's Gruntfile, add a section named `netteBasePath` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  netteBasePath: {
    basePath: 'www',
    options: {
      // removeFromPath: ['app/'] // unix
      removeFromPath: ['app\\'] // win
    }
  },
})
```

## Release History
- 0.1.0: Initial release