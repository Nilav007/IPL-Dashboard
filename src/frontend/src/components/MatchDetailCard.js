import React from 'react';
import {Link} from 'react-router-dom'
export const MatchDetailCard = ({ match ,teamName}) => {
    if (!match) return null;
    const otherTeam = match.team1 === teamName ? match.team2 : match.team1;
    return (
        <div className="MatchDetailCard">
            <h3>Latest Match</h3>
            <div className="match-info">
                <h4>vs
                    <Link to={`/teams/${otherTeam}`}>{otherTeam}</Link></h4>
                {match.date && <p>{match.date}</p>}
                {match.venue && <p>{match.venue}</p>}
                {match.matchWinner && <p>{match.matchWinner} won by {match.resultMargin} {match.result}</p>}
            </div>
        </div>
    );
}