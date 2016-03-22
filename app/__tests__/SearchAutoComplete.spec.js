import React from 'React'
import chai from 'chai'
import sinonChai from 'sinon-chai'
import jsxChai from 'jsx-chai'
import TestUtils from 'react-addons-test-utils'
const expect = chai.expect;
chai.use(jsxChai)
chai.use(sinonChai)

import SearchAutoComplete from '../components/SearchAutoComplete.jsx'
import SearchAutoCompleteThumbnail from '../components/SearchAutoCompleteThumbnail.jsx'

describe('The SearchAutoComplete component', () => {

	it('should return null when no artist, album or track data is provided', () => {
		const renderer = TestUtils.createRenderer();
		renderer.render(<SearchAutoComplete artists={[]} albums={[]} tracks={[]} />);
		const output = renderer.getRenderOutput();
        expect(output).to.equal(null);

    });

    it('should render a div with a class of autocomplete when provided with data', () => {
    	var artists = [{
            name: 'The Beatles'
    	}];
		const renderer = TestUtils.createRenderer();
		renderer.render(<SearchAutoComplete artists={[artists]} albums={[]} tracks={[]} />);
		const output = renderer.getRenderOutput();
        expect(output.type).to.equal('div');
        expect(output.props.className).to.equal('autocomplete');
    });

    it('should render 3 child autocomplete section components', () => {
        var artists = [{
            name: 'The Beatles'
        }];
        const renderer = TestUtils.createRenderer();
        renderer.render(<SearchAutoComplete artists={[artists]} albums={[]} tracks={[]} />);
        const output = renderer.getRenderOutput();
        expect(output.type).to.equal('div');
        expect(output.props.children.length).to.equal(3);
    });

    it('should render an artist autoCompleteSection', () => {
        var artists = [{
            name: 'The Beatles'
        }];
        const renderer = TestUtils.createRenderer();
        renderer.render(<SearchAutoComplete artists={[artists]} albums={[]} tracks={[]} />);
        var output = renderer.getRenderOutput();
        expect(output.props.children[0].props.title).to.equal('Artists');
        expect(output.props.children[1].props.title).to.equal('Tracks');
        expect(output.props.children[2].props.title).to.equal('Albums');

});

});





