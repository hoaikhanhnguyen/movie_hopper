import {FETCH_SHOWTIMES} from "../actions/index";

let DEFAULT_STATE = { term: '', location: ''};

export default function(state = DEFAULT_STATE, action) {
    switch (action.type) {
        case FETCH_SHOWTIMES:
            return [ action.payload.data]
    }
    return state;
}