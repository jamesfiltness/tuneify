import React from 'React'
import ReactDOM from 'react-dom'
import chai from 'chai'
import sinonChai from 'sinon-chai'
import jsxChai from 'jsx-chai'
import TestUtils from 'react-addons-test-utils'
const expect = chai.expect;
chai.use(jsxChai)
chai.use(sinonChai)

import { currentVideo } from '../videoPlayer.js'
import * as types from '../../constants/Actiontypes'

describe('Player Reducers', () => {
	describe('The videoPlayer reducer should', () => {
	  it('rerturn the initial state when no action is specified', () => {
	  	expect(
	  		currentVideo('',{
	  		})
	  	).to.equal('');         
	  });
    });
});






