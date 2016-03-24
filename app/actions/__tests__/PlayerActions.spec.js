import React from 'React'
import ReactDOM from 'react-dom'
import chai from 'chai'
import sinonChai from 'sinon-chai'
import jsxChai from 'jsx-chai'
import TestUtils from 'react-addons-test-utils'
const expect = chai.expect;
chai.use(jsxChai)
chai.use(sinonChai)

import {CUE_VIDEO, cueVideo} from '../PlayerActions.js'

describe('Player Actions', () => {

	it('Should export a CUE_VIDEO action type', () => {
    expect(CUE_VIDEO).to.equal('CUE_VIDEO');
  });

	it('Should create an action to cue a video', () => {
		const videoId = 'fhg4j53jf';
		const expectedAction = {
      type: CUE_VIDEO,
      videoId
    }
		expect(cueVideo(videoId)).to.deep.equal(expectedAction);
	});
	
});
