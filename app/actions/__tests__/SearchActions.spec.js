import React from 'React'
import ReactDOM from 'react-dom'
import chai from 'chai'
import sinonChai from 'sinon-chai'
import jsxChai from 'jsx-chai'
import TestUtils from 'react-addons-test-utils'
const expect = chai.expect;
chai.use(jsxChai)
chai.use(sinonChai)

import * as SearchActions from '../SearchActions.js'

describe('Search Actions', () => {

	it('Should export a REQUEST_DATA action type', () => {
		expect(SearchActions.REQUEST_DATA).to.equal('REQUEST_DATA');
	});

	it('Should export a RECEIVE_ARTIST_DATA action type', () => {
		expect(SearchActions.RECEIVE_ARTIST_DATA).to.equal('RECEIVE_ARTIST_DATA');
	});

	it('Should export a RECEIVE_TRACK_DATA action type', () => {
		expect(SearchActions.RECEIVE_TRACK_DATA).to.equal('RECEIVE_TRACK_DATA');
	});

	it('Should export a RECEIVE_ALBUM_DATA action type', () => {
		expect(SearchActions.RECEIVE_ALBUM_DATA).to.equal('RECEIVE_ALBUM_DATA');
	});

	it('Should export a CLEAR_SEARCH action type', () => {
		expect(SearchActions.CLEAR_SEARCH).to.equal('CLEAR_SEARCH');
	});

});
