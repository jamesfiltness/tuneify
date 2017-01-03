# Tuneify

A project to explore building a React/Redux app backed by an serverless (AWS Lambda) architecture.

Tuneify is a streaming music app built on the YouTube and LastFm APIs. Current progress is a basic prototype featuring a functioning player with album, artist and home routes and authentication using Auth0.

![alt tag](https://media.giphy.com/media/l0HlzayaF0jLB5TS8/source.gif)

## Tech:

* React
* Redux
* React Router / React Router Redux
* Webpack
* ES6 / Babel
* Node (express)
* Auth0
* Mocha / Chai / Enzyme / Sinon
* AWS Lambda

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

