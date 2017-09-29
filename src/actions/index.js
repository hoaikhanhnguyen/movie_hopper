import axios from 'axios';

const ROOT_URL = `http://localhost:3030/scrape`;

export const FETCH_THEATER = 'FETCH_THEATER';

export function fetchTheater(zipcode){
    const url = `${ROOT_URL}`;
    const request = axios.post(url, { zipcode });
// axios is asychronous. Redux-promise middleware stops the promise
// in payload and waits for it to finish before sending it to reducers
    return{
        type: FETCH_THEATER,
        payload: request
    }

}