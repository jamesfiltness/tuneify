import React from 'React'
import ReactDOM from 'react-dom'
import chai from 'chai'
import sinonChai from 'sinon-chai'
import jsxChai from 'jsx-chai'
import TestUtils from 'react-addons-test-utils'
const expect = chai.expect;
chai.use(jsxChai)
chai.use(sinonChai)

import Search from '../components/Search.jsx'

describe('The Search component', () => {
    
   

	it('Should render a div with a className of search', () => {
		const renderer = TestUtils.createRenderer();
		renderer.render(<Search onSearch={() => {}} />);
		const output = renderer.getRenderOutput();
		expect(output.type).to.equal('div');
		expect(output.props.className).to.equal('search');
	});

	it('Should render an input with a className of search__input', () => {
		const renderer = TestUtils.createRenderer();
		renderer.render(<Search onSearch={() => {}} />);
		const output = renderer.getRenderOutput();
		expect(output.props.children.type).to.equal('input');
		expect(output.props.children.props.className).to.equal('search__input');
	});

	it('Should call the method passed in the onSearch prop whenever there is a change on the input', () => {
  		const onSearchSpy = sinon.spy();
	  	const searchComponent = TestUtils.renderIntoDocument(<Search onSearch={onSearchSpy} />);
		searchComponent.refs.input.value = 'Radiohead';
		TestUtils.Simulate.change(TestUtils.findRenderedDOMComponentWithTag(searchComponent, 'input'));
    	expect(onSearchSpy).to.have.been.calledWith('Radiohead');
    });

    
});

describe('The Search component - timing', () => {
	let clock = null;
	before(function () { clock = sinon.useFakeTimers(); });
    after(function () { clock.restore(); });
	
	it('Should only call the onSearch prop once every 500ms', () => {
        const onSearchSpy = sinon.spy();
	  	const searchComponent = TestUtils.renderIntoDocument(<Search onSearch={onSearchSpy} />);
		searchComponent.refs.input.value = 'Radiohead';
		const DOMInput = TestUtils.findRenderedDOMComponentWithTag(searchComponent, 'input');
		TestUtils.Simulate.change(DOMInput); 
        expect(onSearchSpy).to.have.been.calledWith('Radiohead'); 
        expect(onSearchSpy).to.have.been.calledOnce;
        clock.tick(200);
        searchComponent.refs.input.value = 'BJM';
        TestUtils.Simulate.change(DOMInput); 
        expect(onSearchSpy).to.have.been.calledOnce;
        clock.tick(301);
        searchComponent.refs.input.value = 'The Cure';
        TestUtils.Simulate.change(DOMInput); 
        expect(onSearchSpy).to.have.been.calledTwice;


    });
});
