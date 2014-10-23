# ConsoleDot

I can't believe I shipped to github and npm without a README. I'm usually a stickler for at least a placeholder `//TODO` version.

# Summary
So, I made this mostly for me. Probably to solve a bad debug habit of rabbit holing via `console.log`. "Oh, ok let's just add a bunch of console.logs (sometimes on the server) and see whats happening." This module does not **implement a better debugging method** it simply **enables you (read: me) to use this one more efficiently**.

Plain and simple example, we want to see what a function is doing so we add this to the callback:

```js
fs.readFile('path/to/file', function () {
    console.log('debug: we read the file?');
    console.log(arguments);
    console.log('++++++++++++++++++++++')
});
```

Becomes:

```js
fs.readFile('path/to/file', console.callback(true, 'debug: we read the file?'));
```

## Installation

`npm install console-dot`

## Usage (Basic)

```js
console = require('console-dot');
// access to console.callback have been gifted to you
```

# Usage (More)

`// TODO`

# Changelog
Because of [this guy](http://keepachangelog.com/). I'm probably starting out wrong but I am atleast **trying**, [Olivier](https://twitter.com/olivierlacan).

## v0.1.0
Essentially does the above basic implementation modifying `console` to to provide a `callback()` method that returns a curried function with your message. Keystroke savers, etc.
