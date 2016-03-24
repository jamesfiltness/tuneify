# Tuneify

A project to explore building an isomorphic React/Redux app. The idea is that a streaming music app can be built using the LastFm and YouTube Apis. Current progress is a functioning autocomplete that leverages the LastFm Api to pull back artist, album and track results.

## Tech used:

* React
* Redux
* React Router / React Router Redux
* Webpack
* ES6 / Babel
* less
* Node (express)
* Mongodb
* Last Fm and YouTube APIs

* Testing on Karma / Phantom / Mocha / Chai / jsx-chai / React.testUtils / Sinon / Sinon-chai

##Installation

Clone repo and then:

```
npm i
```

Then change to the app directory and run:

```
npm start
```

This kicks the Webpack dev server off on port 1111 and enables hot loading.

IN another terminal window run:

```
npm run tdd
```

This starts up karma.
