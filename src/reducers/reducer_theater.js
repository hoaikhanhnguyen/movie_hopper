import { FETCH_THEATER, LOADING } from "../actions/index";

 let DEFAULT_STATE = { term: '', location: ''};
export default function(state = DEFAULT_STATE, action) {
    switch (action.type) {
        case FETCH_THEATER:
            return [ action.payload.data];
        case LOADING:
            return "Loading...";
        default:
            return state
    }
}