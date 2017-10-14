import {FETCH_SHOWTIMES} from "../actions/index";

// let DEFAULT_STATE = { term: '', location: ''};

export default function(state = [], action) {
    switch (action.type) {
        case FETCH_SHOWTIMES:
            // action.payload.data.movieArray.map((movie) => {movie.available = true});
            return [ action.payload.data]
    }
    return state;
}