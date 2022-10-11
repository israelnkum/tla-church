const { disableNotifications } = require('laravel-mix')
const mix = require('laravel-mix')
/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */
disableNotifications()
mix.js('resources/js/app.js', 'public/js')
  .react()
  .sass('resources/sass/app.scss', 'public/css')
// mix.browserSync('127.0.0.1:8000')
// mix.webpackConfig({
//   resolve: {
//     fallback: {
//       zlib: require.resolve('browserify-zlib'),
//       stream: require.resolve('stream-browserify'),
//       crypto: require.resolve('crypto-browserify')
//     }
//   }
// })
