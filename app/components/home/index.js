import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'

function Home() {
  return (
    <div>
      <h3>Tuneify</h3>
      <p>Current focus:</p>
      <ul>
        <li>Styling</li>
        <li>Album and Artist routes correctly displaying data</li>
      </ul>
      <p><Link to="/about">About page</Link></p>
    </div>
  );
}

export default Home
