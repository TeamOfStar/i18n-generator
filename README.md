# i18n-generator 
To develope multi laguage application, we maintain an i18n googlesheet, and generate json files required by angular-translate. Application will first fetch data from google sheet then compile into i18n json files, logics could find in [app.js](src/app.js)

This repo is using [electron-boilerplate](https://github.com/szwacz/electron-boilerplate), could check any further detail there.

# Quick start

Make sure you have [Node.js](https://nodejs.org) installed.
Then type few commands :
```
git clone https://github.com/TeamOfStar/i18n-generator.git
cd i18n-generator
npm install
npm start
```

# Structure of the project

The application is split between two main folders...

`src` - this folder is intended for files which need to be transpiled or compiled (files which can't be used directly by Electron).

`app` - contains all static assets (put here images, css, html etc.) which don't need any pre-processing.

The build process compiles all stuff from the `src` folder and puts it into the `app` folder, so after the build has finished, your `app` folder contains the full, runnable application.

Treat `src` and `app` folders like two halves of one bigger thing.

The drawback of this design is that `app` folder contains some files which should be git-ignored and some which shouldn't (see `.gitignore` file). But thanks to this two-folders split development builds are much (much!) faster.

# Development

## Starting the app

```
npm start
```

# Making a release

To package your app into an installer use command:

```
npm run release
```

It will start the packaging process for operating system you are running this command on. Ready for distribution file will be outputted to `dist` directory.

You can create Windows installer only when running on Windows, the same is true for Linux and OSX. So to generate all three installers you need all three operating systems.

All packaging actions are handled by [electron-builder](https://github.com/electron-userland/electron-builder). It has a lot of [customization options](https://github.com/electron-userland/electron-builder/wiki/Options), which you can declare under ["build" key in package.json file](https://github.com/szwacz/electron-boilerplate/blob/master/package.json#L2).
