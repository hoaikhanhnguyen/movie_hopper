import axios from 'axios';

// These URLS will be used only within development
// const ZIPCODE_URL = `http://localhost:3030/zipcode`;
// const SHOWTIME_URL = `http://localhost:3030/showtimes`;

// These URLS will be used only within production
const ZIPCODE_URL = '/zipcode';
const SHOWTIME_URL = '/showtimes';

export const FETCH_THEATER = 'FETCH_THEATER';
export const FETCH_SHOWTIMES = 'FETCH_SHOWTIMES';
export const LOADING = 'LOADING...';

export function fetchTheater(zipcode){
    const request = axios.post(ZIPCODE_URL, { zipcode });
// axios is asychronous. Redux-promise middleware stops the promise
// in payload and waits for it to finish before sending it to reducers
    return{
        type: FETCH_THEATER,
        payload: request
    }

}

export function fetchShowTime(theaterUrl){
    const request = axios.post(SHOWTIME_URL, { theaterUrl });

    return{
        type: FETCH_SHOWTIMES,
        payload: request
    }

}

export function showLoader(){
    return{
        type: LOADING
    }

}