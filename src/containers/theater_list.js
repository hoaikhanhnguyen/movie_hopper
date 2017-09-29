import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchShowTime } from "../actions/index";

class TheaterList extends Component {
    renderTheater(theaterData) {
        const listNames = theaterData.movieTheaterArray.map((name) =>
            <td key={name.showtimes_url}><button
                type="button"
                className="btn btn-default"
                onClick={() => console.log('clicked!')}>{name.theater_name}</button></td>
        );
        return (
            <tr key={theaterData.movieTheaterArray}>
                {listNames}
            </tr>
        )
    }

    render() {
        return (
            <table className="table">
                <thead>
                    <tr>
                        <th>Theaters</th>
                    </tr>
                </thead>
                <tbody>
                {this.props.theater.map(this.renderTheater)}
                </tbody>
            </table>
        )
    }
}

function mapStateToProps({ theater }) {
    return { theater }
    //es6. instead of passing in state as argument and returning { weather: state.weather }
}

export default connect(mapStateToProps)(TheaterList)