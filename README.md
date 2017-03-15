[![NPM version](http://img.shields.io/npm/v/Wanderer.svg?style=flat-square)](https://www.npmjs.org/package/Wanderer)
[![NPM downloads](http://img.shields.io/npm/dm/Wanderer.svg?style=flat-square)](https://www.npmjs.org/package/Wanderer)
# Wanderer
A terminal based 2D open world game. Where you can build stuff, shoot stuff, and blow stuff up.

## Web version
> There is now a beta web version of the app available!
If you browse to [wandererapp.herokuapp.com](https://wandererapp.herokuapp.com), you can try it out.

Currently, the architecture is not very fast, so there may be some lag, but if there is enough interest in it, I will add more dynos.

## Installing
Make sure you have `node` and `npm` installed.
```bash
$ node -v
v4.1.2
$ npm -v
2.14.4
```
If you get errors instead of version numbers visit the [NodeJS](https://nodejs.org//) site.

Install the game globaly:
```bash
$ npm install --production -g Wanderer
```
Or if you don't care about having a few dev dependencies:
```bash
$ npm install -g Wanderer
```
Now run the game and have some fun:
```bash
$ wanderer
```
## Controls
> Note: Controls are not very well layed out currently since the game engine itself has been the
priority. They are subject to possibly durastic change in the near future.

* `left` - a
* `right` - d
* `up` - w
* `place block down` - g
* `place block up` - r
* `remove block down` - v
* `remove block left bottom` - z
* `remove block lett top` - q
* `remove block right bottom` - x
* `remove block right top` - e
* `shoot left` - u
* `shoot right` - i
* `drop bomb` - h
* `re-render screen` - y
* `drop tesseract` - b
* `move tesseract left` - j
* `move tesseract right` - k
* `teleport to ground` - k


## Multiplayer
Run the game with the `m` option and a url to the server you are joining:
```bash
$ wanderer m http://<servername>.<domain>:<port>
```

## Server Setup
>Note: Currently the server setup is a little limited. With each run, a new world is generated
and worlds cannot be saved. Changing this is a high priority, so there should be a WorldManager
of sorts in the near future. The default port is `3030` and is not configurable currently.

Run the app with the `s` option.
```bash
$ wanderer s
```


## For development
Fork the repo and clone it to your box.
```bash
$ git clone <your_forked_repo>
$ cd <your_forked_repo>
```
Create a branch
```bash
$ git branch <your_feature>
$ git checkout <your_feature>
```
Install dependencies
```bash
$ npm install
```
The directory structure of the app is currently pretty simple. Modules/Functionality are stored
in `modules/`, types and utilities are stored in `types/`, external processes (such as the structure analysis and tesseract monitor) are kept in `/proc`

## Notes
Tested on:
* Arch Linux tty terminal
* Xterm on Arch linux
* KDE Plasma Konsole on Arch Linux(Works but with some fonts are there display issues. Recomend the Terminus font)
* LXDE LXTerminal on Arch Linux(Works but with some fonts are there display issues.)
* Gnome Terminal on Ubuntu 15.04
* Windows 7 Command Prompt
* Windows 10 Command Prompt(A few input issues noticed)
* Windows 10 MINGW64 teminal emulator(A few input issues noticed)

Out of all these options, I've gotten by far the best results out of a straight Linux tty terminal. Yah, ya don't need a GUI to play this game.
