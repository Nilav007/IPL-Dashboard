import React from 'react';

export const MatchSmallCard = ({ match }) => {
    if (!match) return null;

    return (
        <div className="MatchSmallCard">
            <div className="match-summary">
                <p className="teams">{match.team1} vs {match.team2}</p>
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