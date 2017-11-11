import React from 'react';

const MovieSchedule = (props) => {
    if(!props.schedule){
        return <tr><td>Enter zip code, pick a theater, and then choose showings to add to the schedule</td></tr>;
    }

    return (
// used && to detect if property exists, then display
        <tr>
            {props.schedule.warnings && <td className="warning">{props.schedule.warnings}</td>}
            {props.schedule.showings.map((showing, index) => {
                return(<td key={index}><b>{showing.movie}</b> ({showing.duration})<p>Showing Time: {props.timeConvert(showing.time)}</p></td>)})}
        </tr>
    )

};

export default MovieSchedule;