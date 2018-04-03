var gulp = require('gulp');

var elixir = require('./elixir.js');


elixir.ready(function () {
  elixir.webpack.mergeConfig({
    output: {
      libraryTarget: 'commonjs',
    },
    externals: {
      'jquery': {
        commonjs: 'jquery'
      },
      'js-cookie': {
        commonjs: 'js-cookie'
      },
      'lodash': {
        commonjs: 'lodash'
      },
      'vue': {
        commonjs: 'vue'
      },
      'qs': {
        commonjs: 'qs'
      },
      'vue-csv-downloader': {
        commonjs: 'vue-csv-downloader'
      },
    },
  });
});

elixir(function (mix) {
    mix.webpack('NovaTable.vue', './dist', './src');
});
