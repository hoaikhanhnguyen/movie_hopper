import React, { Component } from 'react';
import { connect } from 'react-redux';

class TheaterList extends Component {
    renderTheater(theaterData) {
        const names = theaterData.movieTheaterArray.map(name => name.theater_name);
        const listNames = names.map((name) =>
            <td key={name}>{name}</td>
        );

        return (
            <tr key={theaterData.movieTheaterArray}>
                {listNames}
            </tr>
        )
    }

    render() {
        return (
            <table className="table table-hover">
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