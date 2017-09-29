import {FETCH_SHOWTIMES, FETCH_THEATER} from "../actions/index";

export default function(state = [], action) {
    switch (action.type) {
        case FETCH_THEATER:
            return [ action.payload.data, ...state ];
        case FETCH_SHOWTIMES:
            return [ action.payload.data, ...state ]
    }
    return state;
}