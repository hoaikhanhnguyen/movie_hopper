import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchShowTime } from "../actions/index";
import Showings from "../components/showings"

class ShowTimeList extends Component {
     showings = [];
     initialTime = null;
     duration = null;
     finalTime = null;

     sameMovie(movie_name){
         let same = false;
         for(var i = 0; i < this.showings.length; i++){
             if (this.showings[i].movie === movie_name){
                 console.log('same movie!');
                 same = true;
             }
         }
         return same;
     }

     convertDuration(movie_duration){
         return parseInt(parseInt(movie_duration/60) + "00") + movie_duration%60
     }

     timeOverlap(timeValue, movie_duration){
         let overlap = true;
         let movieStartTime = parseInt(timeValue.split(":").join(""));
         if(movieStartTime < 1200){
             movieStartTime += 1200
         }
         let movieDuration = parseInt(movie_duration.split(" min")[0]);
         movieDuration = this.convertDuration(movieDuration);
         console.log('clicked movieStartTime', movieStartTime);
         console.log('clicked movieDuration', movieDuration);
         if(movieStartTime >this.finalTime){
             this.finalTime = movieStartTime + movieDuration;
             console.log('new finalTime',this.finalTime);
             return overlap = false;
         }else{
             console.log('the time overlaps!')
         }
         return overlap
     }

     createSchedule(timeValue, movie_name, movie_duration){
         if(this.showings.length === 0){
             this.showings = [...this.showings, ...[{ time: timeValue, movie: movie_name, duration: movie_duration}]];
             this.initialTime = parseInt(timeValue.split(":").join(""));
             if(this.initialTime < 1200){
                 this.initialTime += 1200
             }
             this.duration = this.convertDuration(parseInt(movie_duration.split(" min")[0]));
             this.finalTime = this.initialTime + this.duration;
             console.log("intialTime", this.initialTime);
             console.log("duration", this.duration);
             console.log("first final time", this.finalTime)
         }else if(!this.sameMovie(movie_name) && !this.timeOverlap(timeValue, movie_duration)){
             this.showings = [...this.showings, ...[{ time: timeValue, movie: movie_name, duration: movie_duration}]];
         }
     }
    // renderSchedule(showing){
    //     return(
    //         <td>{showing.movie} {showing.time} {showing.duration}</td>
    //     )
    // }

    handleShowingButtonClick(timeValue, movie_name, movie_duration) {
        // console.log('timeValue',timeValue);
        // console.log('movie_name',movie_name);
        // console.log('movie_name',movie_duration);
         this.createSchedule(timeValue, movie_name, movie_duration);
          console.log('showings', this.showings);
          // return(
          //     <td>{this.showings.map((showing) => {this.renderSchedule(showing)})}</td>
          // );
        this.setState(this.showings);
        console.log('state!', this.state)

    }

    renderMovieTime(time, movie_name, movie_duration ){
        time = time.split(':');
        let hours = Number(time[0]);
        let minutes = Number(time[1].slice(0,2));
        let timeValue;

        if (hours > 0 && hours <= 12) {
            timeValue= "" + hours;
        } else if (hours > 12) {
            timeValue= "" + (hours - 12);
        }
        else if (hours === 0) {
            timeValue= "12";
        }
        timeValue += (minutes < 10) ? ":0" + minutes : ":" + minutes;
        // timeValue += (hours >= 12) ? " p.m." : " a.m.";
        return <button
                key={time}
                 type="button"
                 className="btn btn-secondary btn-sm"
                 onClick={() => {this.handleShowingButtonClick(timeValue, movie_name, movie_duration)}}
                 > {timeValue} </button>
    }

    handleButtonClick(showUrl) {
        this.props.fetchShowTime( { location: showUrl} )
    }

    renderMovie(movieData) {
        const movieListNames = movieData.movieArray.map((list) =>{
            return (
                <td key={list.movie_name}>
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => {
                            window.open(`http://www.imdb.com/title/${list.movie_id}/?ref_=shtt_ov_tt`);
                        }}>{list.movie_name} ({list.duration})</button>
                    <p><b>Times:</b>{list.show_times.map((time) => this.renderMovieTime(time, list.movie_name, list.duration))}</p>
                </td>
            )});
        return (
                <tr key={movieData.movieArray}>
                    {movieListNames}
                </tr>
        )
    }
    renderDates(dateUrls) {
        const dateList = dateUrls.dateUrlArray.map((link) =>{
            return (
                <td key={link}>
                    <button
                        type="button"
                        className="btn btn-success"
                        onClick={() => {
                            this.handleButtonClick(link)
                        }}>{this.sliceCorrectDate(link)}</button>
                </td>
            )});
        return (
            <tr key={dateUrls.dateUrlArray}>
                <td>                    <button
                    type="button"
                    className="btn btn-success "
                    onClick={() => {
                        this.handleButtonClick(dateUrls.currentDate)
                    }}>Today</button></td>
                {dateList}
            </tr>
        )
    }

    sliceCorrectDate(link){
        if(link.charAt(40) === "/"){
            return link.slice(41, 51)
        }else{
            return link.slice(40, 50)
        }
    }

    render() {
        return (
            <table className="table">
                <thead>
                <tr>
                    <th>Movies</th>
                </tr>
                </thead>
                <tbody>
                {this.props.showtime.length > 0 && this.props.showtime.map((movieData) => this.renderMovie(movieData))}
                {this.props.showtime.length > 0 && this.props.showtime.map((dateUrls) => this.renderDates(dateUrls))}
                </tbody>
            </table>
        )
    }
}

function mapStateToProps({ showtime }) {
    return { showtime }
    //es6. instead of passing in state as argument and returning { weather: state.weather }
}

export default connect(mapStateToProps, { fetchShowTime })(ShowTimeList)