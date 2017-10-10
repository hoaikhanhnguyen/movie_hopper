import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchShowTime } from "../actions/index";

class ShowTimeList extends Component {

    renderMovieTime(time){
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
        return timeValue + `${' | '}`
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
                    <p><b>Times:</b> {list.show_times.map((time) => this.renderMovieTime(time))}</p>
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
                {console.log(this.props)}
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