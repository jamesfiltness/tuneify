import React from 'React'
import chai from 'chai'
import sinonChai from 'sinon-chai'
import jsxChai from 'jsx-chai'
import TestUtils from 'react-addons-test-utils'
const expect = chai.expect;
chai.use(jsxChai)
chai.use(sinonChai)


import SearchAutoCompleteSection from '../SearchAutoCompleteSection.jsx'
import SearchAutoCompleteThumbnail from '../SearchAutoCompleteThumbnail.jsx'

describe('The SearchAutoCompleteSection component', () => {

	it('Should return the title provided by the title prop in a h3 tag', () => {
		const renderer = TestUtils.createRenderer();
		renderer.render(<SearchAutoCompleteSection title="Tracks" data={[]} />);
		const output = renderer.getRenderOutput();
		expect(output).to.include(<h3 className="autocomplete-section__title">Tracks</h3>);
    });

  it('Shouldnt render any results if none are provided', () => {
		const renderer = TestUtils.createRenderer();
		renderer.render(<SearchAutoCompleteSection title="Tracks" data={[]} />);
		const output = renderer.getRenderOutput();
		expect(output).to.include('<ul className="autocomplete-section__list" />');
  });

  it('Should render the track name if one is provided', () => {
  	var tracks = [{
          name: 'Anenome',
          artist : 'Brian Jonestown Massacre',
          image: [{}]
  	}];
		const renderer = TestUtils.createRenderer();
		renderer.render(<SearchAutoCompleteSection title="Tracks" data={tracks} />);
		const output = renderer.getRenderOutput();
		expect(output).to.include(<span className="autocomplete-section__target">Anenome</span>);
  });

  it('Should render the artist for the track', () => {
  	var tracks = [{
    	name: 'Anenome',
      artist : 'Brian Jonestown Massacre',
                image: [{}]
    }];
		const renderer = TestUtils.createRenderer();
		renderer.render(<SearchAutoCompleteSection title="Tracks" data={tracks} />);
		const output = renderer.getRenderOutput();
		expect(output).to.include(<span className="autocomplete-section__artist">Brian Jonestown Massacre</span>);
  });

  it('Should render the album name if one is provided', () => {
  	var albums = [{
    	name: 'Strung Out In Heaven',
      artist : 'Brian Jonestown Massacre',
                image: [{}]
    }];
		const renderer = TestUtils.createRenderer();
		renderer.render(<SearchAutoCompleteSection title="Tracks" data={albums} />);
		const output = renderer.getRenderOutput();
		expect(output).to.include(<span className="autocomplete-section__target">Strung Out In Heaven</span>);
  });

  it('Should render the artist for the album', () => {
  	var albums = [{
    	name: 'Strung Out In Heaven',
      artist : 'Brian Jonestown Massacre',
                image: [{}]
    }];
		const renderer = TestUtils.createRenderer();
		renderer.render(<SearchAutoCompleteSection title="Tracks" data={albums} />);
		const output = renderer.getRenderOutput();
		expect(output).to.include(<span className="autocomplete-section__artist">Brian Jonestown Massacre</span>);
  });


	it('Should render an artist if one is provided', () => {
	  	const artists = [{
	          name: 'Brian Jonestown Massacre',
	                    image: [{}]
	  	}];
			const renderer = TestUtils.createRenderer();
			renderer.render(<SearchAutoCompleteSection title="Tracks" data={artists} />);
			const output = renderer.getRenderOutput();
			expect(output).to.include(<span className="autocomplete-section__target">Brian Jonestown Massacre</span>);
	});

	it('calls the onSelectTrack prop when an item is clicked on', () => {
    	const albums = [{
			name: 'Strung Out In Heaven',
			artist : 'Brian Jonestown Massacre',
			          image: [{}]
	  	}];

		const selectTrackSpy = sinon.spy();
	    const component = TestUtils.renderIntoDocument(<SearchAutoCompleteSection title="Tracks" data={albums} onSelectTrack={selectTrackSpy} />);
		TestUtils.Simulate.click(TestUtils.scryRenderedDOMComponentsWithTag(component, 'li')[0]);
		expect(selectTrackSpy).to.have.been.calledWith("Strung Out In Heaven");
	});

	it('calls the onSelectTrack with the correct argument when an li element is clicked on', () => {
    	const albums = [
    	{
			name: 'Strung Out In Heaven',
			artist : 'Brian Jonestown Massacre',
			          image: [{}]
	  	},
	  	{
			name: 'Take It From The Man',
			artist : 'Brian Jonestown Massacre',
			          image: [{}]
	  	},
	  	{
			name: 'Her Satanic Majesties Second Request',
			artist : 'Brian Jonestown Massacre',
			          image: [{}]
	  	},
	  	{
			name: 'Pish',
			artist : 'Brian Jonestown Massacre',
			          image: [{}]
	  	},
	  	{
			name: 'Revelation',
			artist : 'Brian Jonestown Massacre',
			          image: [{}]
	  	},
	  	{
			name: 'Methodrone',
			artist : 'Brian Jonestown Massacre',
			          image: [{}]
	  	}];

		  const selectTrackSpy = sinon.spy();
	    const component = TestUtils.renderIntoDocument(<SearchAutoCompleteSection title="Tracks" data={albums} onSelectTrack={selectTrackSpy} />);
			TestUtils.Simulate.click(TestUtils.scryRenderedDOMComponentsWithTag(component, 'li')[0]);
			expect(selectTrackSpy).to.have.been.calledWith("Strung Out In Heaven");
			TestUtils.Simulate.click(TestUtils.scryRenderedDOMComponentsWithTag(component, 'li')[3]);
			expect(selectTrackSpy).to.have.been.calledWith("Pish");
			TestUtils.Simulate.click(TestUtils.scryRenderedDOMComponentsWithTag(component, 'li')[5]);
			expect(selectTrackSpy).to.have.been.calledWith("Methodrone");
	});


	/* test that a list of tracks is rendered correctly */
});
