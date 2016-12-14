# Tuneify

A project to explore building an isomorphic React/Redux app backed by a servless architecture. 

Tuneify is a streaming music app built on the YouTube and LastFm APIs. Current progress is a basic prototype featuring a simple player, album, artist and home routes.

![alt tag](http://recordit.co/ScVTz8gF9T)

## Tech:

* React
* Redux
* React Router / React Router Redux
* Webpack
* ES6 / Babel
* Node (express)
* Mocha / Chai / Enzyme / Sinon

##Installation

Clone repo and then:

```
npm i
```

Then run:

```
npm start
```

To run against a mock LastFm server:

`cd` to the `mocks` directory and run `npm i`. Then run `node .` to start mock server. Finally in the main project run:


```
npm run start:mocks
```

