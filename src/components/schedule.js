import React from 'react';

const MovieSchedule = (props) => {
    if(!props.schedule){
        return <tr><td>Enter zip code, pick a theater, and then choose showings to add to the schedule</td></tr>;
    }

    return (
// used && to detect if property exists, then display
        <tr>
            {props.schedule.warnings && <td className="warning">{props.schedule.warnings}</td>}
            {console.log('showings props', props.schedule)}
            {props.schedule.showings.map((showing, index) => {
                return(<td key={index}><b>{showing.movie}</b><p>Showing Time: {showing.time}</p><p>Movie Duration: {showing.duration}</p></td>)})}
        </tr>
    )

};

export default MovieSchedule;