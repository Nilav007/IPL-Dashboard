import React from 'react';
import { Link } from 'react-router-dom';
import './MatchSmallCard.scss';

export const MatchSmallCard = ({ match, teamName }) => {
    if (!match) return null;
    const otherTeam = match.team1 === teamName ? match.team2 : match.team1;
    const isMatchWon = teamName === match.matchWinner;

    return (
        <div className={isMatchWon ? 'MatchSmallCard won-card' : 'MatchSmallCard lost-card'}>
            <div className="match-info">
                <span className="vs">vs</span>
                <h1>
                    <Link to={`/teams/${otherTeam}`}>{otherTeam}</Link>
                </h1>
                {match.date && <h2 className="match-date">{match.date}</h2>}
                {match.venue && <h3 className="match-venue">{match.venue}</h3>}
                {match.matchWinner && <h3 className="match-result">{match.matchWinner} won by {match.resultMargin} {match.result}</h3>}
            </div>

            <div className="additional-details">
                <h3>First Innings</h3>
                <p>{match.team1}</p>
                <h3>Second Innings</h3>
                <p>{match.team2}</p>
                <h3>Man of the match</h3>
                <p>{match.playerOfMatch}</p>
                <h3>Umpires</h3>
                <p>{match.umpire1}, {match.umpire2}</p>
            </div>
        </div>
    );
}