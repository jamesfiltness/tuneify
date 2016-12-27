import { store } from '../client';

export default class auth0Service {
  constructor(actions) {
    this.loggedIn = actions.loggedIn;
    this.loggedOut = actions.loggedOut;
    
    // TODO: Move authLock config out
    this.lock = new Auth0Lock(
      'quW61JSOhGAG8vBykmt6vuSf3nS0vaTK',
      'jamesfiltness.eu.auth0.com',
      { 
        auth: {
          redirect: false
        },
        autoclose: true,
        languageDictionary: {
          title: "Tuneify"
        },
      }
    );
  }
  
  isLoggedIn() {
    return !!this.getToken();
  }

  setToken(tokenName, value) {
    localStorage.setItem(tokenName, value);
  }

  unsetToken(tokenName) {
    localStorage.removeItem(tokenName);
  }

  getToken(tokenName) {
    // Retrieves the user token from local storage
    return localStorage.getItem('idToken');
  }

  logout() {
    // Clear user token and profile data from local storage
    this.unsetToken('idToken');
    this.unsetToken('profile');
    store.dispatch(this.loggedOut());
  }

  authenticate(callback) {
    this.showLock();

    this.lock.on("authenticated", (authResult) => {
      this.lock.getUserInfo(authResult.accessToken, (error, profile) => {
        if (error) {
          // Handle error
          return;
        }
        
        this.setToken("idToken", authResult.idToken);
        this.setToken("profile", JSON.stringify(profile));
        store.dispatch(this.loggedIn());
        callback();
      });
    });
  }

  showLock() {
    this.lock.show();
  }

  hideLock() {
    this.lock.hide();
  }
}
