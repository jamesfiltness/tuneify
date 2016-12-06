// TODO: comment this file
import chai  from 'chai';
import chaiEnzyme from 'chai-enzyme';
import sinonChai from 'sinon-chai';
import { shallow, mount, render } from 'enzyme';

const jsdom = require('jsdom').jsdom;

const exposedProperties = ['window', 'navigator', 'document'];

global.document = jsdom('');

//grab the window object out of the document
global.window = document.defaultView;
Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property);
    global[property] = document.defaultView[property];
  }
});

global.navigator = {
  userAgent: 'node.js'
};


chai.use(chaiEnzyme());
chai.use(sinonChai);

global.expect = chai.expect;
global.mount = mount;
global.shallow = shallow;
global.render = render;

