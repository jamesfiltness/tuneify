import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { loggedIn, loggedOut } from '../../actions/auth-actions';

export class Login extends React.Component {
  
  static PropTypes = {
    loggedIn: PropTypes.func.isRequired,
    authenticated: PropTypes.bool.isRequired
  };

  constructor(props) {
    super(props);
    // if on page load there is a valid token then dispatch
    // an action so that the Login component knows to show
    // the correct state
    if (props.authService.isLoggedIn()) {
      props.loggedIn();
    }
  }
  
  authenticated() {
    this.props.loggedIn();
    this.showProfile();
  }

  logOut() {
    this.props.loggedOut();
    this.props.authService.logOut();
  }

  showProfile() {
    const profile = this.props.authService.getProfileDetails();
    
    return (
      <div className="login__profile profile">
        <img className="profile__image" src={profile.avatar} />
        <span className="profile__name">{profile.name}</span>
        <span className="fa fa-chevron-down profile__show" />
        <ul className="profile__options">
          <li onClick={() => {this.logOut()}}>Log out</li>
        </ul>
      </div>
    )
  }

  render() {
    return (
      <div className="login">
        { 
          this.props.authenticated || this.props.authService.isLoggedIn() ?  
          this.showProfile() : 
          <button 
            onClick={
              () => {
                this.props.authService.authenticate(
                  () => { 
                    this.authenticated() 
                  }
                )
              }
            } 
            className="button button--primary button--play login__sign-in"
          >
            Sign in
          </button> 
        }  
      </div>
    )
  }
}


function mapStateToProps(state) {
  return {
    authenticated: state.authenticated,
  }
}


export default connect(
  mapStateToProps,
  { 
    loggedIn: loggedIn,
    loggedOut: loggedOut,
  }
)(Login);
