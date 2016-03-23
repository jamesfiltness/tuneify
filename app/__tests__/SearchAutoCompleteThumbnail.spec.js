import React from 'React'
import chai from 'chai'
import sinonChai from 'sinon-chai'
import jsxChai from 'jsx-chai'
import TestUtils from 'react-addons-test-utils'
const expect = chai.expect;
chai.use(jsxChai);
chai.use(sinonChai);

import SearchAutoCompleteThumbnail from '../components/SearchAutoCompleteThumbnail.jsx'

describe('The SearchAutoCompleteThumbnail component', () => {

	it('Should return the correct alt attribute on the img tag', () => {
    const result = {
      name: "Brian Jonestown Massacre",
      image: [{
          '#text' : "",
          "size": "small"
      }]
    }
		const renderer = TestUtils.createRenderer();
		renderer.render(<SearchAutoCompleteThumbnail thumb={result.image} altText={result.name} />);
		const output = renderer.getRenderOutput();
    expect(output.props.alt).to.equal("Brian Jonestown Massacre");
  });

  it('Should render a placeholder image if one is not provided by the data', () => {
    const result = {
      name: "Brian Jonestown Massacre",
      image: [{
          '#text' : "",
          "size": "small"
      }]
    }
    const renderer = TestUtils.createRenderer();
    renderer.render(<SearchAutoCompleteThumbnail thumb={result.image} altText={result.name} />);
    const output = renderer.getRenderOutput();
    expect(output.props.src).to.equal("http://placehold.it/34x34");
  });

  it('Should render the correct source image  if one is provided by the data', () => {
    const result = {
      name: "Brian Jonestown Massacre",
      image: [{
          '#text' : "http://img2-ak.lst.fm/i/u/34s/da388e7db93e3fac617f91d161cb3d41.png",
          "size": "small"
      }]
    }
    const renderer = TestUtils.createRenderer();
    renderer.render(<SearchAutoCompleteThumbnail thumb={result.image} altText={result.name} />);
    const output = renderer.getRenderOutput();
    expect(output.props.src).to.equal("http://img2-ak.lst.fm/i/u/34s/da388e7db93e3fac617f91d161cb3d41.png");
  });
});
