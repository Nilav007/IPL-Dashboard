import React from 'react';
import {Link} from 'react-router-dom'
export const MatchSmallCard = ({ match,teamName }) => {
    if (!match) return null;
    const otherTeam = match.team1 === teamName ? match.team2 : match.team1;
    return (
        <div className="MatchSmallCard">
            <div className="match-summary">
                <p className="teams">vs
                    <Link to={`/teams/${otherTeam}`}>{otherTeam}</Link>
                </p>
                {match.matchWinner && (
                    <p className="winner">Winner: {match.matchWinner}</p>
                )}
                {match.date && (
                    <p className="date">{new Date(match.date).toLocaleDateString()}</p>
                )}
            </div>
        </div>
    );
}