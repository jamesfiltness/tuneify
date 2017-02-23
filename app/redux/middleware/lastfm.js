// This is a quick makeshift middleware to see how many calls are being
// made to last fm over time
const appStartupTime = Date.now();

let calls = 0;

const lastFmCallCountMiddleware = store => next => action => {
  if (action.type === 'LAST_FM_API_REQUEST') {
    calls++;
    const diff = Date.now() - appStartupTime;
    const secs = Math.floor(diff / 1000);
    const mins = secs / 60 < 1 ? 0 : secs / 60;
    console.log('calls: ', calls, ' in: ', mins);
  }

  next(action);
}

export default lastFmCallCountMiddleware;
