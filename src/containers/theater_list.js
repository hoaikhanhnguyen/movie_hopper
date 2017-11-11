import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux';
import { fetchShowTime, showLoader } from "../actions/index";

class TheaterList extends Component {

    handleButtonClick(showUrl) {
        this.props.fetchShowTime( { location: showUrl} )
}

    renderTheater(theaterData) {

        const listNames = theaterData.movieTheaterArray.map((name) =>{
            return (
            <td key={name.showtimes_url}>
                <RaisedButton
                    type="button"
                    primary={true}
                    onClick={() => {
                        this.handleButtonClick(name.showtimes_url)
                    }}
                    label={name.theater_name} />
                {/*<button*/}
                    {/*type="button"*/}
                    {/*className="btn btn-default"*/}
                    {/*onClick={() => {*/}
                        {/*this.handleButtonClick(name.showtimes_url)*/}
                    {/*}}>{name.theater_name}</button>*/}
            </td>
            )});
        return (
            <tr key={theaterData.movieTheaterArray}>
                {listNames}
            </tr>
        )
    }
    render() {
        if(this.props.theater === "Loading..."){
            return <div className="loader"></div>;
        }
        return (
            <table className="table">
                <thead>
                    <tr>
                        <th>Theaters</th>
                    </tr>
                </thead>
                <tbody>
                {this.props.theater.length > 0 && this.props.theater.map((theaterData) => this.renderTheater(theaterData))}
                </tbody>
            </table>
        )
    }
}

function mapStateToProps({ theater, showtime }) {
    return { theater, showtime }
    //es6. instead of passing in state as argument and returning { weather: state.weather }
}

export default connect(mapStateToProps,{ fetchShowTime, showLoader })(TheaterList)