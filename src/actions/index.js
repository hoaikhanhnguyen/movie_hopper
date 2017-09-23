import axios from 'axios';

const API_KEY = '';
const ROOT_URL = ``;

export const FETCH_THEATER = 'FETCH_THEATER';

export function fetchTheater(zipcode){
    const url = `${ROOT_URL}&q=${zipcode},us`;
    const request = axios.get(url);

    return{
        type: FETCH_THEATER,
        payload: request
    }

}