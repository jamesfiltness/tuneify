import { createStore as _createStore } from 'redux';
import reducers from './modules/reducers';

export default function(data) {
 return _createStore(reducers, data);
}
