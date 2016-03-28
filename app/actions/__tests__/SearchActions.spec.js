import React from 'React'
import ReactDOM from 'react-dom'
import expect from 'expect'
import expectJSX from 'expect-jsx'
import TestUtils from 'react-addons-test-utils'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import nock from 'nock'
const fetchMock = require('fetch-mock');
expect.extend(expectJSX);

import * as SearchActions from '../SearchActions'
import * as types from '../../constants/Actiontypes'

describe('Search Actions', () => {

	describe('The requestData action creator should', () => {

		it('Should create an action to Request data and pass along the searchTerm', () => {
			const searchTerm = 'Radio Friendly Unit Shifter';
			const expectedAction = {
	      		type: types.REQUEST_DATA,
	      		searchTerm
	    	}

			expect(SearchActions.requestData(searchTerm)).toEqual(expectedAction);
	    });

	});

	describe('The clearSearch action creator should', () => {

	    it('Should create an action to clear the search term', () => {
			const expectedAction = {
	      		type: types.CLEAR_SEARCH,
	    	}

			expect(SearchActions.clearSearch()).toEqual(expectedAction);

		});

	});

    describe('The receiveArtistData action creator should', () => {


		it('Should return the correct action and data when called', () => {
			const expectedAction = {
	      		type: types.RECEIVE_ARTIST_DATA,
	      		artists : [
                    {image: [], name: "radiohead"},
                    {image: [], name: "rage against the machine"}
	      		]
	    	}

			expect(
				SearchActions.receiveArtistData(
					'ra', {
						results: {
							artistmatches: {
								artist: [
									{image: [], name: "radiohead"},
									{image: [], name: "rage against the machine"}
								]
							}
						}
				    }
				)
				).toEqual(expectedAction);


		});

	});

	 describe('The receiveAlbumData action creator should', () => {


		it('Should return the correct action and data when called', () => {
			const expectedAction = {
	      		type: types.RECEIVE_ALBUM_DATA,
	      		albums : [
                    {image: [], name: "Dark side of the moon"},
                    {image: [], name: "In Utero"}
	      		]
	    	}

			expect(
				SearchActions.receiveAlbumData(
					'ra', {
						results: {
							albummatches: {
								album: [
									{image: [], name: "Dark side of the moon"},
									{image: [], name: "In Utero"}
								]
							}
						}
				    }
				)
				).toEqual(expectedAction);


		});

	});

	describe('The receiveTrackData action creator should', () => {


		it('Should return the correct action and data when called', () => {
			const expectedAction = {
	      		type: types.RECEIVE_TRACK_DATA,
	      		tracks : [
                    {image: [], name: "Madame George"},
                    {image: [], name: "Moondance"}
	      		]
	    	}

			expect(
				SearchActions.receiveTrackData(
					'ra', {
						results: {
							trackmatches: {
								track: [
									{image: [], name: "Madame George"},
									{image: [], name: "Moondance"}
								]
							}
						}
				    }
				)
				).toEqual(expectedAction);


		});

	});

});

describe('Async Search Actions', () => {

	/*const thunkMiddleware = [ thunk ];
	const mockStore = configureMockStore(thunkMiddleware); */


	describe('The fetchArtistData action creator', () => {

		 /* afterEach(() => {
		    nock.cleanAll()
		  }) */


     it('Should fire off a RECEIVE_ARTIST_DATA action when fetch is done', () => {
    	/*	const mock = nock('http://ws.audioscrobbler.com')
            	.get('/2.0/?method=artist.search&artist=john&api_key=57ee3318536b23ee81d6b27e36997cde&format=json&limit=5')
            	//.query({method: 'artist.search', artist: 'John', api_key: '57ee3318536b23ee81d6b27e36997cde', format: 'json', limit: 5})
            	.reply(200,
	                  {
						fake: true
					  }
				   )

        /*    	const f = fetchMock.mock('http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=john&api_key=57ee3318536b23ee81d6b27e36997cde&format=json&limit=5', {
						results: {
							artistmatches: {
								artist: [
									{image: [], name: "Madame George"},
									{image: [], name: "Moondance"}
								]
							}
						}
					} )


				const expectedActions = [
      			{ type: types.RECEIVE_ARTIST_DATA, artists: {
								results: {
										artistmatches: {
									  		artist: [
														{image: [], name: "Madame George"},
														{image: [], name: "Moondance"}
												]
										}
								}
				    	}
					}
    		];

    		let store = mockStore([], expectedActions, done);
        store.dispatch(SearchActions.fetchArtistData('john'))

				*/

		});

		it('Should call handleErrors when there is an error in the response', () => {

		});

	});

});
