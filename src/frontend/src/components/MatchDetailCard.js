import React from 'react';

export const MatchDetailCard = ({ match }) => {
    if (!match) return null;

    return (
        <div className="MatchDetailCard">
            <h3>Latest Match</h3>
            <div className="match-info">
                <h4>{match.team1} vs {match.team2}</h4>
                {match.date && <p>Date: {match.date}</p>}
                {match.venue && <p>Venue: {match.venue}</p>}
                {match.matchWinner && <p>Winner: {match.matchWinner}</p>}
            </div>
        </div>
    );
}