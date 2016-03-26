import React from 'React'
import ReactDOM from 'react-dom'
import expect from 'expect';
import expectJSX from 'expect-jsx';
import TestUtils from 'react-addons-test-utils'
expect.extend(expectJSX);

import { App } from '../App'
import Search from '../Search'
import SearchAutoComplete from '../SearchAutoComplete'
import YouTubePlayer from '../YouTubePlayer'

describe('The App component', () => {

	it('Should render a root level div', () => {
    	const renderer = TestUtils.createRenderer();
		renderer.render(<App />);
		const output = renderer.getRenderOutput();
		expect(output.type).toEqual('div');
	})

	it('Should Include the Search Component', () => {
  		const renderer = TestUtils.createRenderer();
		renderer.render(<App />);
		const output = renderer.getRenderOutput();
		expect(output).toIncludeJSX(<Search onSearch={ text => dispatch(searchPerformed(text)) } />);
	});


	it('Should Include the SearchAutoComplete Component', () => {
		const artists = [], albums = [], tracks =[];
  		const renderer = TestUtils.createRenderer();
		renderer.render(<App artists={artists} albums={albums} tracks={tracks} />);
		const output = renderer.getRenderOutput();
		expect(output).toIncludeJSX(<SearchAutoComplete artists={artists} tracks={tracks} albums={albums} onSelectTrack={ videoId => dispatch(cueVideo(videoId)) } />);
	});

	it('Should Include the YouTubePlayer Component', () => {
		const currentVideo = ""
  		const renderer = TestUtils.createRenderer();
		renderer.render(<App currentVideo={currentVideo} />);
		const output = renderer.getRenderOutput();
		expect(output).toIncludeJSX(<YouTubePlayer currentVideo={currentVideo}></YouTubePlayer>);
	}); 



});
