import React from 'React'
import ReactDOM from 'react-dom'
import chai from 'chai'
import sinonChai from 'sinon-chai'
import jsxChai from 'jsx-chai'
import TestUtils from 'react-addons-test-utils'
const expect = chai.expect;
chai.use(jsxChai)
chai.use(sinonChai)

import { App } from '../App'

describe('The App component', () => {

	it('Should include the YouTubePlayer component', () => {
  		const renderer = TestUtils.createRenderer();
		renderer.render(<App />);
		const output = renderer.getRenderOutput();

		//expect(output).to.include(<YouTubePlayer currentVideo={currentVideo}></YouTubePlayer>);
	});

});
