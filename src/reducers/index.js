import { combineReducers } from 'redux';
import TheaterReducer from './reducer_theater';
import ShowTimeReducer from './showtime_reducer'

const rootReducer = combineReducers({
    theater: TheaterReducer,
    showtime: ShowTimeReducer
});

export default rootReducer;
