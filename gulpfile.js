var gulp = require('gulp');
gulp.task('build-bin', function () {
  var nexe = require('nexe');
  nexe.compile({
    input: 'app.js', // where the input file is
    output: 'wanderer.exe', // where to output the compiled binary
    nodeVersion: '5.5.0', // node version
    nodeTempDir: 'bin', // where to store node source.
    // nodeConfigureArgs: ['opt', 'val'], // for all your configure arg needs.
    // nodeMakeArgs: ["-j", "4"], // when you want to control the make process.
    python: 'C:/Python27/',
    // resourceFiles: [ 'path/to/a/file' ], // array of files to embed.
    resourceRoot: [ 'resources/' ], // where to embed the resourceFiles.
    flags: true, // use this for applications that need command line flags.
    // jsFlags: "--use_strict", // v8 flags
    framework: "node" // node, nodejs, or iojs
  }, function(err) {
    if(err) {
      return console.log(err);
    }
    return console.log('Built successfully.');
  });
});

var watchify = require('watchify');
var browserify = require('browserify');
// var gulp = require('gulp');
var source = require('vinyl-source-stream');
//var buffer = require('vinyl-buffer');
var gutil = require('gulp-util');
//var sourcemaps = require('gulp-sourcemaps');
//var assign = require('lodash.assign');


// add transformations here
// i.e. b.transform(coffeeify);

var customOpts = {
  entries: ['./client.js'],
  debug: true
};
gulp.task('bundle', function() {
  return bundle();
}); // so you can run `gulp js` to build the file
gulp.task('watch', function() {
  // add custom browserify options here
  watchify.args = customOpts;
  //var opts = assign({}, watchify.args, customOpts);
  var b = watchify(browserify(customOpts)); 
  bundle(b);
  b.on('update', bundle); // on any dep update, runs the bundler
  b.on('log', gutil.log); // output build logs to terminal
});

function bundle(b) {
  //gutil.log(b.toString());
  //var pipeline = null;
  if (b == undefined) b = browserify(customOpts);
  //else 
  pipeline = b.bundle();
  return pipeline
    // log errors if they happen
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('client.js'))
    // optional, remove if you don't need to buffer file contents
    //.pipe(buffer())
    // optional, remove if you dont want sourcemaps
    //.pipe(sourcemaps.init({loadMaps: true})) // loads map from browserify file
       // Add transformation tasks to the pipeline here.
    //.pipe(sourcemaps.write('./')) // writes .map file
    .pipe(gulp.dest('./bin'));
}
