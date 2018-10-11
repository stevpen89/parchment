import {combineReducers, createStore} from 'redux';
import auth0     from './auth0';
import familyTree from './familyTree';

const rootReducer = combineReducers({auth0, familyTree});
const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;