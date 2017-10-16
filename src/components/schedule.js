import React from 'react';

const MovieSchedule = (props) => {

    const timeConvert = (time) =>{
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
    };

    if(!props.schedule){
        return <tr><td>Enter zip code, pick a theater, and then choose showings to add to the schedule</td></tr>;
    }

    return (
// used && to detect if property exists, then display
        <tr>
            {props.schedule.warnings && <td className="warning">{props.schedule.warnings}</td>}
            {props.schedule.showings.map((showing, index) => {
                return(<td key={index}><b>{showing.movie}</b><p>Showing Time: {timeConvert(showing.time)}</p><p>Movie Duration: {showing.duration}</p></td>)})}
        </tr>
    )

};

export default MovieSchedule;