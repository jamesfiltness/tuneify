import React from 'react';
import { Link } from 'react-router';

function PageNotFound() {
  return (
    <div className="page-not-found page-with-padding">
      <h3 className="page-not-found__heading">
        Page not found
      </h3>
      <p>Oops, we're not sure how you ended up here. <Link to="/" className="page-not-found__link">Go back to the homepage</Link>.</p>
    </div>
  );
}

export default PageNotFound;
