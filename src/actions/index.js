import axios from 'axios';

const ZIPCODE_URL = `http://localhost:3030/zipcode`;
const SHOWTIME_URL = 'https://localhost:3030/showtimes';

export const FETCH_THEATER = 'FETCH_THEATER';

export function fetchTheater(zipcode){
    const request = axios.post(ZIPCODE_URL, { zipcode });
// axios is asychronous. Redux-promise middleware stops the promise
// in payload and waits for it to finish before sending it to reducers
    return{
        type: FETCH_THEATER,
        payload: request
    }

}

export const FETCH_SHOWTIMES = 'FETCH_SHOWTIMES';

export function fetchShowTime(theaterUrl){
    const request = axios.post(SHOWTIME_URL, { theaterUrl });

    return{
        type: FETCH_SHOWTIMES,
        payload: request
    }

}