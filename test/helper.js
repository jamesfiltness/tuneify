// TODO: comment this file

global.document = require('jsdom').jsdom('');
global.window = document.defaultView;
global.navigator = {
  userAgent: 'node.js',
};

const exposedProperties = ['window', 'navigator', 'document'];

Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property);
    global[property] = document.defaultView[property];
  }
});

const chai = require('chai');
const sinonChai = require('sinon-chai');
const chaiEnzyme = require('chai-enzyme');
const { mount, shallow, render } = require('enzyme');

chai.should();
chai.use(sinonChai);

global.mount = mount;
global.shallow = shallow;
global.render = render;
global.expect = chai.expect;

chai.use(chaiEnzyme());
