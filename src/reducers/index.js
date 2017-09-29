import { combineReducers } from 'redux';
import TheaterReducer from './reducer_theater';

const rootReducer = combineReducers({
    theater: TheaterReducer
});

export default rootReducer;
