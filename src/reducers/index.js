import { combineReducers } from 'redux';
import TheaterReducer from './reducer_theater';
import ShowTimeReducer from './reducer_showtime'

const rootReducer = combineReducers({
    theater: TheaterReducer,
    showtime: ShowTimeReducer,
    showLoader: TheaterReducer
});

export default rootReducer;
