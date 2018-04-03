var gulp = require('gulp');

var elixir = require('./elixir.js');


elixir.ready(function () {
  elixir.webpack.mergeConfig({
    output: {
      libraryTarget: 'commonjs',
    },
    externals: {
      'jquery': {
        commonjs2: 'jquery'
      },
      'js-cookie': {
        commonjs2: 'js-cookie'
      },
      'lodash': {
        commonjs2: 'lodash'
      },
      'vue': {
        commonjs2: 'vue'
      },
      'qs': {
        commonjs2: 'qs'
      },
      'vue-csv-downloader': {
        commonjs2: 'vue-csv-downloader'
      },
    },
  });
});

elixir(function (mix) {
    mix.webpack('NovaTable.vue', './dist', './src');
});
