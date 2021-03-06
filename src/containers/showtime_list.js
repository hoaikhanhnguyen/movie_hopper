import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux';
import { fetchShowTime } from "../actions/index";
import MovieSchedule from "../components/schedule"

class ShowTimeList extends Component {
    constructor(props){
        super(props);

        this.state ={ showings: [], warnings: null};

    }
     showings = [];
     initialTime = null;
     duration = null;
     finalTime = null;

     sameMovie(movie_name){
         let same = false;
         for(var i = 0; i < this.showings.length; i++){
             if (this.showings[i].movie === movie_name){
                 same = true;
             }
         }
         return same;
     }

     convertDuration(movie_duration){
         return parseInt(parseInt(movie_duration/60) + "00") + movie_duration%60
     }

     timeOverlap(time, movie_duration){
         let overlap = true;
         let movieStartTime = parseInt(time.split(":").join(""));
         let movieDuration = parseInt(movie_duration.split(" min")[0]);
         movieDuration = this.convertDuration(movieDuration);
         if(movieStartTime >this.finalTime){
             this.finalTime = movieStartTime + movieDuration;
             return overlap = false;
         }else{
             this.setState({ warnings: "Movie times overlap!" });
         }
         return overlap
     }

     createSchedule(time, movie_name, movie_duration){
         if(this.showings.length === 0){
             this.showings = [...this.showings, ...[{ time: time, movie: movie_name, duration: movie_duration}]];
             this.initialTime = parseInt(time.split(":").join(""));
             this.duration = this.convertDuration(parseInt(movie_duration.split(" min")[0]));
             this.finalTime = this.initialTime + this.duration;
         }else if(!this.sameMovie(movie_name) && !this.timeOverlap(time, movie_duration)){
             this.showings = [...this.showings, ...[{ time: time, movie: movie_name, duration: movie_duration}]];
             this.setState({ warnings: null });
         }
     }
    handleShowingButtonClick(time, movie_name, movie_duration) {
         this.createSchedule(time, movie_name, movie_duration);
        this.setState({ showings: this.showings });
    }

    timeConvert(time){
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
       return timeValue += (hours >= 12) ? " p.m." : " a.m.";
    }

    renderMovieTime(time, movie_name, movie_duration ){

        let movieStartTime = parseInt(time.split(":").join(""));
        const className = `btn btn-sm ${movieStartTime < this.finalTime || this.sameMovie(movie_name) ? 'btn-basic disabled' : 'btn-secondary'}`;
            return (<button
                key={time}
                type="button"
                className={className}
                onClick={() => {
                    this.handleShowingButtonClick(time, movie_name, movie_duration)
                }}
            > {this.timeConvert(time)} </button>
            )
    }
    handleButtonClick(showUrl) {
        this.props.fetchShowTime( { location: showUrl} )
    }
    renderMovie(movieData) {
        const movieListNames = movieData.movieArray.map((list) =>{
            return (
                <td key={list.movie_name}>
                    <a href={`http://www.imdb.com/title/${list.movie_id}/?ref_=shtt_ov_tt"`} target="_blank">
                    <button
                        type="button"
                        className="btn btn-primary"
                    >{list.movie_name} ({list.duration})</button></a>
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
                    <RaisedButton
                        type="button"
                        backgroundColor="#a4c639"
                        onClick={() => {
                        this.handleButtonClick(link);
                        this.resetSchedule();
                        }}
                        label={this.sliceCorrectDate(link)} />
                </td>
            )});
        return (
            <tr key={dateUrls.dateUrlArray}>
                <td>
                    <RaisedButton
                        type="button"
                        default={true}
                        onClick={() => {
                            this.handleButtonClick(dateUrls.currentDate)
                        }}
                        label="Today" />
                </td>
                {dateList}
                <td>
                    <RaisedButton
                        type="button"
                        secondary={true}
                        onClick={() => {
                            this.resetSchedule()
                        }}
                        label="Reset Schedule" />
                </td>
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

    resetSchedule(){
        this.showings=[];
        this.setState({ showings: this.showings, warning: null});
        this.finalTime = 0;
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
                <MovieSchedule schedule={this.state} timeConvert={this.timeConvert}/>
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