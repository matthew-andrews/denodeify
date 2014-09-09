denodeify [ ![Codeship Status for matthew-andrews/denodeify](https://codeship.io/projects/02ac77d0-1a58-0132-bf86-4a07366ee29d/status)](https://codeship.io/projects/34622)
=========

Tool to turn functions with Node-style callback APIs into functions that return [Promises](https://github.com/jakearchibald/es6-promise).

Inspired by and adapted from Q's [`Q.denodefiy`/`Q.nfcall` function](https://github.com/kriskowal/q/wiki/API-Reference#qnfbindnodefunc-args).

Warning: Assumes `Promise` defined in global scope.

## Installation

```
npm install --save denodeify
```

## Examples

Simple example with [`readFile`](https://www.npmjs.org/package/read-file):-

```js
var denodeify = require('denodeify');
var readFile = denodeify(require('fs').readFile);

readFile('my-file.txt', { encoding: 'UTF-8' })
  .then(function(text) {
    console.log("My file's contents is: " + text);
  });
```

More complex example with `exec`:-

## Advanced usage

You can also pass in a function as a second argument of `denodeify` that allows you to manipulate the data returned by the wrapped function before it gets passed to the Promise's `reject` or `resolve` functions, for example:-

```js
var denodeify = require('denodeify');
var exec = denodeify(require('child_process').exec, function(err, stdout, stderr) {

  // Throw away stderr data
  return [err, stdout];
});

exec('hostname')
  .then(function(host) {
    console.log("My hostname is: " + host.replace('\n', ''));
  });
```

Or,

```js
var denodeify = require('denodeify');
var exec = denodeify(require('child_process').exec, function(err, stdout, stderr) {
  return [err, [stdout, stderr]];
});

exec('my-command')
  .then(function(results) {
    console.log("stdout is: " + results[0]);
    console.log("stderr is: " + results[1]);
  });
```

Useful for functions that return multiple arguments, for example [`child_process#exec`](http://nodejs.org/api/child_process.html#child_process_child_process_exec_command_options_callback).
