import { isTokenExpired } from './jwt-helper';

export default class auth0Service {
  constructor(hiddenCallback) {
    // if this is the client then instantiate the lock
    // this is a temporary workaround as there seems to be issues with auth0Lock and import
    // Auth0Lock only works in the browser also
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

      this.lock.on('hide', () => {
        if (hiddenCallback) {
          hiddenCallback();
        }
      });
    }

  isLoggedIn() {
    return !!this.getToken() && !isTokenExpired(this.getToken());
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

  getProfileDetails() {
    if (this.isLoggedIn()) {
      const profile = localStorage.getItem('profile');
      const JSONProfile = JSON.parse(profile);
      return {
        name: JSONProfile.given_name,
        avatar: JSONProfile.picture
      }
    }

    return null;
  }

  logOut() {
    // Clear user token and profile data from local storage
    this.unsetToken('idToken');
    this.unsetToken('profile');
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
