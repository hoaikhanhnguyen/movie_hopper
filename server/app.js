const express = require('express');
const cheerio = require('cheerio');
const fs = require('fs');
const request = require('request');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(express.static(path.resolve(__dirname, '..', 'build')));

// Using path.resolve
// __dirname /var/www/moviehopper.khanh.world/movie_hopper/server
// .. /moviehopper/
// build /moviehopper/build


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
        movieTheaterArray = movieTheaterArray.slice(0, 9); // returns 10 closest theaters
        res.json({ movieTheaterArray });

    });
});

app.post('/showtimes', (req, res) => {

    let showTimeUrl = `http://imdb.com${req.body.theaterUrl.location}`;
    request(showTimeUrl, (err, resp, body) => {
        if (err) {
            console.log('Error connecting to site', err);
        }

        let $ = cheerio.load(body);
        let movieArray = [];
        let dateUrlArray = [];

        $('.datepicker a[href^="/showtimes/cinema"]').each((i, element) => {
            let movieDate = $(element).attr("href");
            dateUrlArray.push(movieDate);
        });
        currentDate = dateUrlArray.shift(); // takes out first entry with is today's date

        $('.showtimes div a').each((i, element) => {
            let movie = {};
            movie.movie_name = $(element).attr("data-title");
            movie.show_times = $(element).attr("data-times").split('|');
            movie.duration = $(element).parent().parent().siblings('p ').children('time').text();
            movie.movie_id = $(element).attr("data-titleid");
            movieArray.push(movie);
        });
        if(movieArray.length === 0){
            $('.info h3 a').each((i, element) => {
                let movie = {};
                movie.movie_name = $(element).text();
                movie.show_times = $(element).parent().parent().siblings(".showtimes").text().replace(/^\s+|\s+$/gm,'').split('|');
                movie.show_times = movie.show_times.map((time) =>{
                    if(!time.includes("am")) {
                        time = time.split(':');
                        let hours = Number(time[0]);
                        let minutes = Number(time[1].slice(0, 2));
                        let timeValue;
                        timeValue = "" + (hours + 12);
                        return timeValue += (minutes < 10) ? ":0" + minutes : ":" + minutes;
                    }else{
                        time = time.split(':');
                        let hours = Number(time[0]);
                        let minutes = Number(time[1].slice(0, 2));
                        let timeValue;
                        timeValue = "" + hours;
                        return timeValue += (minutes < 10) ? ":0" + minutes : ":" + minutes;
                    }
                });
                movie.duration = $(element).parent().parent().siblings('p ').children('time').text();
                movie.movie_id = $(element).attr("href").slice(17, 26);
                movieArray.push(movie);
            });
        }

    // one array of all movie showings
// var showTimes = [];
// var title;
// movieArray.forEach(function(title){
//     var movieName = title.movie_name;
//     title.show_times.forEach(function(showing){
//         var movieObject = {};
//         movieObject.name = title.movie_name;
//         movieObject.showTime = showing;
//         showTimes.push(movieObject);
//     })
// });

//     multi-dimensional array showings
        var showTimes = [];

        for (var i = 0; i < movieArray.length; i++) {
            var showings = [];
            var name = movieArray[i].movie_name;
            var currentMovie = movieArray[i].show_times;
            for (var j = 0; j < currentMovie.length; j++){
                var movieObject = {};
                movieObject.name = name;
                movieObject.showTime = currentMovie[j];
                showings.push(movieObject);
            }
            showTimes.push(showings);
        }
        // console.log('master movie obj', showTimes);
        res.json({ movieArray, dateUrlArray, currentDate, showTimes });
    });

});


app.listen(3030, () => {
    console.log('Running on ', 3030);
});
