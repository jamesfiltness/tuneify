import React from 'React'
import chai from 'chai'
import TestUtils from 'react-addons-test-utils' 
const expect = chai.expect;

import SearchAutoComplete from '../components/SearchAutoComplete.jsx'

describe('The SearchAutoComplete component', () => {

	it('should return null when no artist, album or track data is provided', () => {
		const renderer = TestUtils.createRenderer();
		renderer.render(<SearchAutoComplete artists={[]} albums={[]} tracks={[]} />);
		const output = renderer.getRenderOutput();
        expect(output).to.equal(null);

    });

    it('should render a div when provided with data', () => {
    	var artists = [{
            name: 'The Beatles'
    	}];
		const renderer = TestUtils.createRenderer();
		renderer.render(<SearchAutoComplete artists={[artists]} albums={[]} tracks={[]} />);
		const output = renderer.getRenderOutput();
        expect(output.type).to.equal('div');
    });
});





