import React, { Component } from 'react';
import { connect } from 'react-redux';

class ShowTimeList extends Component {

    renderMovieTime(time) {
        return(
            time + `${' '}`
        )
    }

    renderMovie(movieData) {
        const movieListNames = movieData.movieArray.map((list) =>{
            return (
                <td key={list.movie_name}>
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => {
                            console.log('Clicked!', list);
                            window.open(`http://www.imdb.com/title/${list.movie_id}/?ref_=shtt_ov_tt`);
                        }}>{list.movie_name} ({list.duration})</button>
                    <p>Times: {list.show_times.map((time) => this.renderMovieTime(time))}</p>
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