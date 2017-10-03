const express = require('express');
const cheerio = require('cheerio');
const fs = require('fs');
const request = require('request');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.post('/zipcode', (req, res) => {
    // req.body
    // .ajax request has a data object
    // e.g. data: { name: "Andy"}
    // req.body.name equals to "Andy"
    // In our case we'll be using req.body.zipcode
    // const { zipcode } = req.body;
    console.log("This is our req.body of zipcode", req.body.zipcode);

    let zipCode = req.body.zipcode;
    let url = `http://www.imdb.com/showtimes/US/${zipCode}`;
    let movieTheaterArray = [];
    request(url, (err, resp, body) => {
        if (err) {
            console.log('Error connecting to site', err);
        }

        let $ = cheerio.load(body);

        $('h3 > a[href^="/showtimes/"]').each((i, element) => {
            let theater = {};
            theater.theater_name = $(element).text();
            theater.showtimes_url = $(element).attr('href');
            movieTheaterArray.push(theater);
        });
        console.log('first theater', movieTheaterArray[0]);
        console.log('movieTheaterArray.length', movieTheaterArray.length);
        res.json({ movieTheaterArray });

    });
});

app.post('/showtimes', (req, res) => {

    let showTimeUrl = `http://imdb.com${req.body.theaterUrl.location}`;
    console.log('requestdata', req.body.theaterUrl.location);
    let show_Url = `http://www.imdb.com/showtimes/cinema/US/ci0001898/US/08820?ref_=sh_ov_th`;

    request(showTimeUrl, (err, resp, body) => {
        if (err) {
            console.log('Error connecting to site', err);
        }

        let $ = cheerio.load(body);
        let movieArray = [];
        let dateUrlArray = [];

        $('.datepicker a[href^="/showtimes/cinema"]').each((i, element) => {
            let movieDate = $(element).attr("href");
            dateUrlArray.push(movieDate)
        });
        console.log('date', dateUrlArray);

        $('.showtimes div a').each((i, element) => {
            let movie = {};
            movie.movie_name = $(element).attr("data-title");
            movie.show_times = $(element).attr("data-times").split('|');
            movie.duration = $(element).parent().parent().siblings('p ').children('time').text();
            movie.movie_id = $(element).attr("data-titleid");
            movieArray.push(movie);
        });
        console.log(movieArray.length);
        res.json({ movieArray });
    });

});
app.listen(3030, () => {
    console.log('Running on ', 3030);
});
exports = module.exports = app;