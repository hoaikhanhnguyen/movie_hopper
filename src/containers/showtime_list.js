import React, { Component } from 'react';
import { connect } from 'react-redux';

class ShowTimeList extends Component {

    renderMovieTime(time){
        time = time.split(':');
        let hours = Number(time[0]);
        let minutes = Number(time[1]);
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
        timeValue += (hours >= 12) ? " p.m." : " a.m.";
        return timeValue + `${' | '}`
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
                </tbody>
            </table>
        )
    }
}

function mapStateToProps({ showtime }) {
    return { showtime }
    //es6. instead of passing in state as argument and returning { weather: state.weather }
}

export default connect(mapStateToProps)(ShowTimeList)