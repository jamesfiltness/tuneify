import 'babel-polyfill'
import './main.css'
import React from 'react'
import { render } from 'react-dom'
import configureStore from './configureStore.js'
import { Provider } from 'react-redux'
import App from './components/App.jsx'


function main() {
	const store = configureStore()

  	const rootEl = document.createElement('div');

  	document.body.appendChild(rootEl);

    render(
    	<Provider store={store}>
  	  		<App />
  		</Provider>, rootEl
  	)
}

main();