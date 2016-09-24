import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'

function Home() {
  return (
    <div>
      <h3>Homepage</h3>
      <p>Lorem ipsum sit amet dolor elicsing sit amter de noninum partice</p>
      <p>Current focus:</p>
      <ul>
        <li>Styling - extract text plugin</li>
        <li>Get calls to youtube data api working based off of what is clicked on in autocomplete</li>
        <li>Load videos in to player once ready</li>
      </ul>
      <p><Link to="/about">About page</Link></p>
    </div>
  );
}

export default Home
