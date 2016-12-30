import auth0Service from '../../utils/auth0-service';
import { loggedIn, loggedOut } from '../../actions/auth-actions';

const authService = new auth0Service();

const authMiddleware = store => next => action => { 
  const { authenticate,  ...rest } = action;  
  
  if (!authenticate || authService.isLoggedIn()) {
    return next(action);
  } else {
    authService.authenticate(() => next(action));
  }
}
  
export default authMiddleware
