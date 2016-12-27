import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import auth0Service from '../../utils/auth-service';
import { loggedIn, loggedOut } from '../../actions/auth-actions';
const authService = new auth0Service({ loggedIn, loggedOut });

export class Login extends React.Component {
  
  static PropTypes = {
    dispatch: PropTypes.func.isRequired,
    authenticated: PropTypes.bool.isRequired
  };

  render() {
return (
      <div className="login">
{ authService.isLoggedIn() ?  'You are logged In' : 'You are not logged In' }
    
    </div>
    )
  }
}


function mapStateToProps(state) {
  console.log(state);
  return {
    authenticated: state.authenticated,
  }
}


export default connect(mapStateToProps)(Login);
