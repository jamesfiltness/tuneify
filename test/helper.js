import React from 'react';
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';

const jsdom = require('jsdom').jsdom;

const exposedProperties = ['window', 'navigator', 'document'];

global.document = jsdom('');
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

global.expect = expect;
global.mount = mount;
global.shallow = shallow;
global.render = render;

documentRef = document;
