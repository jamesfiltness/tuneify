import React from 'react'

function ErrorMessage(props) {
  return (
    <div className="error-message page-with-padding">
      <h3 className="error-message__heading">
        { props.title }
      </h3>
      <p>
        Because we're a completely free service we rely other free services to provide us
        with the information that you should be seeing on this page. Sometimes these services aren't
        quite as reliable as we'd like. We're sorry about this and we are working on a solution.
      </p>
    </div>
  );
}

ErrorMessage.defaultProps = {
  title: "Sorry, We can't find what you're looking for"
};

  export default ErrorMessage;
