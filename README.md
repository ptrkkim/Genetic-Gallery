A gallery site for images recreated using a genetic algorithm.<br>

This app is now deployed at [geneticgallery.herokuapp.com](http://geneticgallery.herokuapp.com/)!

## Table of Contents
- [About](#about)
- [Scripts and setup](#scripts-and-setup)

## <a name="about"></a> About

This is a side project inspired by [Roger Alsing's Mona Lisa](https://rogerjohansson.blog/2008/12/07/genetic-programming-evolution-of-mona-lisa/), though his implementation seems to be closer to stochastic hill-climbing than to a model of natural selection. Genetic Gallery is a place to create and share a specific kind of computer-generated art. Users can upload images of their choice and generate geometric approximations of them using a genetic algorithm. These approximations are 'evolved' from scratch; every creation is 100% unique!
<br>
<br>
Built on React, Node, Express, and PostgreSQL/Sequelize.
<br>
I also used this project to learn the [Jest](https://facebook.github.io/jest/) testing framework and [Flow.js](https://flow.org), a static type checking library. 
<br>
This project uses [CSS Modules](https://github.com/css-modules/css-modules). Styles are colocated with their respective components, and rules are brought into components through destructured imports. 

## <a name="scripts-and-setup"></a> Scripts and local setup

Make sure [Postgres](https://postgresapp.com/) is installed. This app will attempt to create a database named 'genetic-gallery.' The app will still run without Postgres, but you will not be able to submit and view created images. 

From the project directory, you can use [yarn](https://yarnpkg.com/en/) or [npm](https://www.npmjs.com/) to run:

### `npm install` + `npm run start-dev`

Runs the app in development mode.
<br>

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.
<br>
You will also see any lint errors in the console.

### `npm test`

Launches an interactive test runner in the console.
Type ```'a'``` in the runner to see all existing tests.

This project uses [Jest](https://facebook.github.io/jest/), along with [Enzyme](https://github.com/airbnb/enzyme) to help with React Component testing.

### `npm run build`

Builds the app for production to the `build` folder.<br>
The build is minified and the filenames include the hashes.

### `npm run flow`

Runs flow to type check any files annotated with the `@flow` comment: 
```javascript
// @flow
function annotatedCode(here: string) {...}
```
This project is configured to give on-the-fly flow hints via ESLint, so this script should be unnecessary in most cases.
