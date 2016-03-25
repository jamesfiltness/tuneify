import React from 'React'
import ReactDOM from 'react-dom'
import chai from 'chai'
import sinonChai from 'sinon-chai'
import jsxChai from 'jsx-chai'
import TestUtils from 'react-addons-test-utils'
const expect = chai.expect;
chai.use(jsxChai)
chai.use(sinonChai)

import {currentSearch, currentArtistResults, currentTrackResults, currentAlbumResults} from '../search.js'
import * as types from '../../constants/Actiontypes'

describe('Reducers', () => {
	describe('The currentSearch reducer should', () => {
	  it('return null when the CLEAR_SEARCH Action is called', () => {
	  	expect(
	  		currentSearch([],{
	  			type: types.CLEAR_SEARCH 
	  		})
	  	).to.equal(null);         
	  });
	  
	  it('return an empty string when no action is passed', () => {
	  	expect(currentSearch(undefined,'')).to.equal('');         
	  });

	  it('return the SearchTerm when the REQUEST_DATA Action is called', () => {
	  	expect(
	  		currentSearch([],{
	  			type: types.REQUEST_DATA, 
	  			searchTerm: "Van Morrison" 
	  		})
	  	).to.equal('Van Morrison');  
	  	  	
	  	expect(
	  		currentSearch('Van Morrison',{
	  			type: types.REQUEST_DATA, 
	  			searchTerm: "Nirvana" 
	  		})
	  	).to.equal('Nirvana'); 

	  });
	});

	describe('The currentArtistResults reducer should', () => {
	  
	  it('return the current state when no action is passed', () => {
	    expect(currentArtistResults(undefined,'')).to.deep.equal([]);
	    expect(currentArtistResults([{name: "Grace"}],'')).to.deep.equal([{name: "Grace"}]);    
	  });

	  it('return an array of artists when the RECIEVE_ARTIST_DATA action is dispatched', () => {
	    expect(currentArtistResults([{name: "Bob Dylan"}], {
	        type: types.RECEIVE_ARTIST_DATA,
	        artists: [{name: "Pink Floyd", url: ""},{name: "Robert Johnson", url: ""},{name: "Jerry Rafferty", url: ""}]
	      })).to.deep.equal([{name: "Pink Floyd", url: ""},{name: "Robert Johnson", url: ""},{name: "Jerry Rafferty", url: ""}]);   
	  });

	  it('return an empty array when the CLEAR_SEARCH action is dispatched', () => {
	    expect(currentArtistResults([{name: "Pink Floyd", url: ""}],{type: types.CLEAR_SEARCH })).to.deep.equal([]);   
	  });
	});

	describe('The currentAlbumResults reducer should', () => {
	  
	  it('return the current state when no action is passed', () => {
	    expect(currentAlbumResults(undefined,'')).to.deep.equal([]);
	    expect(currentAlbumResults([{name: "Nevermind"}],'')).to.deep.equal([{name: "Nevermind"}]);    
	  });

	  it('return an array of Albums when the RECEIVE_ALBUM_DATA action is dispatched', () => {
	    expect(currentAlbumResults([{name: "The Freewheelin Bob Dylan"}], {
	        type: types.RECEIVE_ALBUM_DATA,
	        albums: [{name: "In Utero", url: ""},{name: "Insectiside", url: ""},{name: "Bleach", url: ""}]
	      })).to.deep.equal([{name: "In Utero", url: ""},{name: "Insectiside", url: ""},{name: "Bleach", url: ""}]);   
	  });


	  it('return an empty array when the CLEAR_SEARCH action is dispatched', () => {
	    expect(currentAlbumResults([{name: "Pink Floyd", url: ""}],{type: types.CLEAR_SEARCH })).to.deep.equal([]);   
	  });
	});

	describe('The currentTrackResults reducer should', () => {
	  
	  it('return the current state when no action is passed', () => {
	    expect(currentTrackResults(undefined,'')).to.deep.equal([]);
	    expect(currentTrackResults([{name: "Blew"}],'')).to.deep.equal([{name: "Blew"}]);    
	  });

	  it('return an array of Tracks when the RECEIVE_TRACK_DATA action is dispatched', () => {
	    expect(currentTrackResults([{name: "Floyd The Barber"}], {
	        type: types.RECEIVE_TRACK_DATA,
	        tracks: [{name: "School", url: ""},{name: "Love Buzz", url: ""},{name: "About A Girl", url: ""}]
	      })).to.deep.equal([{name: "School", url: ""},{name: "Love Buzz", url: ""},{name: "About A Girl", url: ""}]);   
	  });


	  it('return an empty array when the CLEAR_SEARCH action is dispatched', () => {
	    expect(currentTrackResults([{name: "Negative Creep", url: ""}],{type: types.CLEAR_SEARCH })).to.deep.equal([]);   
	  });
	});

});






