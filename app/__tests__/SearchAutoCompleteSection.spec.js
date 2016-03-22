import React from 'React'
import chai from 'chai'
import jsxChai from 'jsx-chai'
import TestUtils from 'react-addons-test-utils'
const expect = chai.expect;
chai.use(jsxChai)


import SearchAutoCompleteSection from '../components/SearchAutoCompleteSection.jsx'

describe('The SearchAutoCompleteSection component', () => {

	it('Should return the title provided by the title prop in a h3 tag', () => {
		const renderer = TestUtils.createRenderer();
		renderer.render(<SearchAutoCompleteSection title="Tracks" data={[]} />);
		const output = renderer.getRenderOutput();
		expect(output).to.include(<h3>Tracks</h3>);
    });

  it('Shouldnt render any results if none are provided', () => {
		const renderer = TestUtils.createRenderer();
		renderer.render(<SearchAutoCompleteSection title="Tracks" data={[]} />);
		const output = renderer.getRenderOutput();
		expect(output).to.include('<ul />');
  });

  it('Should render the track name if one is provided', () => {
  	var tracks = [{
          name: 'Anenome',
          artist : 'Brian Jonestown Massacre'
  	}];
		const renderer = TestUtils.createRenderer();
		renderer.render(<SearchAutoCompleteSection title="Tracks" data={tracks} />);
		const output = renderer.getRenderOutput();
		expect(output).to.include(<span>Anenome</span>);
  });

  it('Should render the artist for the track', () => {
  	var tracks = [{
    	name: 'Anenome',
      artist : 'Brian Jonestown Massacre'
    }];
		const renderer = TestUtils.createRenderer();
		renderer.render(<SearchAutoCompleteSection title="Tracks" data={tracks} />);
		const output = renderer.getRenderOutput();
		expect(output).to.include(<span>Brian Jonestown Massacre</span>);
  });

  it('Should render the album name if one is provided', () => {
  	var albums = [{
    	name: 'Strung Out In Heaven',
      artist : 'Brian Jonestown Massacre'
    }];
		const renderer = TestUtils.createRenderer();
		renderer.render(<SearchAutoCompleteSection title="Tracks" data={albums} />);
		const output = renderer.getRenderOutput();
		expect(output).to.include(<span>Strung Out In Heaven</span>);
  });

  it('Should render the artist for the album', () => {
  	var albums = [{
    	name: 'Strung Out In Heaven',
      artist : 'Brian Jonestown Massacre'
    }];
		const renderer = TestUtils.createRenderer();
		renderer.render(<SearchAutoCompleteSection title="Tracks" data={albums} />);
		const output = renderer.getRenderOutput();
		expect(output).to.include(<span>Brian Jonestown Massacre</span>);
  });

  it('Should render an artist if one is provided', () => {
  	var artists = [{
          name: 'Brian Jonestown Massacre'
  	}];
		const renderer = TestUtils.createRenderer();
		renderer.render(<SearchAutoCompleteSection title="Tracks" data={artists} />);
		const output = renderer.getRenderOutput();
		expect(output).to.include(<span>Brian Jonestown Massacre</span>);
  });

  it('calls the onSelectTrack prop when an item is clicked on', () => {
		var albums = [{
					name: 'Strung Out In Heaven',
					artist : 'Brian Jonestown Massacre'
		}];

		const selectTrackSpy = sinon.spy();
  	var component = TestUtils.renderIntoDocument(<SearchAutoCompleteSection title="Tracks" data={albums} onSelectTrack={selectTrackSpy} />);
	  TestUtils.Simulate.click(TestUtils.scryRenderedDOMComponentsWithTag(component, 'li')[0]);
		expect(selectTrackSpy.called).to.be.ok;
	});
});
