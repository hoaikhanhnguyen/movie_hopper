import React from 'react';

const Showings = ({ schedule }) => {
    if(!schedule){
        return <tr>Loading...</tr>;
    }
    const movieName = schedule.movie_name;
console.log('showings', schedule);
    return(
        <tr>
                <td>{movieName}</td>
        </tr>
    )

};

export default Showings;