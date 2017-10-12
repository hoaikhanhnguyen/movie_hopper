import { FETCH_THEATER } from "../actions/index";

// let DEFAULT_STATE = { term: '', location: ''};
export default function(state = [], action) {
    switch (action.type) {
        case FETCH_THEATER:
            return [ action.payload.data, ...state ];
    }
    return state;
}