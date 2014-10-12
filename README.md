# grunt-nette-basepath

> Grunt plugin to updates paths for concat, uglify and cssmin where is nette variable $basePath


## Getting Started
This plugin requires Grunt `~0.4.4` and use-min `^2.4.0`

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

full example on [github.com/chemix/Nette-Grunt](https://github.com/chemix/Nette-Grunt)

```js
grunt.initConfig({
  ...
  netteBasePath: {
    task: {
      basePath: 'www',
      options: {
        removeFromPath: ['app/templates/']
      }
    }
  },
  ...
})
```

```coffee
  ...
  netteBasePath:
    task:
      basePath: 'www'
      options:
        removeFromPath: ['app/template/']
  ...
```


Multiple replacements

```coffee
  ...
  netteBasePath:
    taskCore:
      basePath: 'www'
      options:
        removeFromPath: ['app/template/']
    taskLibs:
      basePath: 'www/components'
      options:
        searchPattern: '{$incPath}'
  ...
```


## Release History
- 0.3.0: Support for another replace path search string, multiple replaces
- 0.2.0: Update for grunt-usemin 2.1.0
- 0.1.0: Initial release