import auth0Service from '../../utils/auth0-service';
import { loggedIn, loggedOut } from '../../actions/auth';

const authService = new auth0Service();

const authMiddleware = store => next => action => { 
  const { authenticate,  ...rest } = action;  
  
  if (!authenticate || authService.isLoggedIn()) {
    return next(action);
  } else {
    authService.authenticate(
      () => {
        store.dispatch(loggedIn());
        next(action)
      }
    );
  }
}
  
export default authMiddleware
