import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MatchDetailCard } from "../components/MatchDetailCard";
import { MatchSmallCard } from "../components/MatchSmallCard";
import './TeamPage.scss';
import { PieChart } from 'react-minimal-pie-chart';

export const TeamPage = () => {
    const [team, setTeam] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { teamName } = useParams();

    useEffect(() => {
        const fetchMatches = async () => {
            try {
                setLoading(true);
                setError(null);

                const nameToFetch = teamName || 'Rajasthan Royals';
                const encodedName = encodeURIComponent(nameToFetch);
                const response = await fetch(`${process.env.REACT_APP_API_ROOT_URL}/team/${encodedName}`);

                if (!response.ok) {
                    throw new Error(`Failed to fetch team data: ${response.status}`);
                }

                const data = await response.json();
                setTeam(data);
            } catch (err) {
                console.error('Error fetching team:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchMatches();
    }, [teamName]);

    if (loading) {
        return (
            <div className="TeamPage">
                <h1>Loading...</h1>
            </div>
        );
    }

    if (error) {
        return (
            <div className="TeamPage">
                <h1>Error</h1>
                <p>{error}</p>
            </div>
        );
    }

    if (!team || !team.matches) {
        return (
            <div className="TeamPage">
                <h1>No team data found</h1>
            </div>
        );
    }

    return (
        <div className="TeamPage">
            <div className="team-name-section">
                <h1 className="team-name">{team.teamName}</h1>
            </div>

            <div className="win-loss-section">
                Wins/Losses
                <PieChart
                    data={[
                        { title: 'Losses', value: team.totalMatches - team.totalWins, color: '#a34d53' },
                        { title: 'Wins', value: team.totalWins, color: '#4da375' }
                    ]}
                />
            </div>

            <div className="match-detail-section">
                <h3>Latest Matches</h3>
                <MatchDetailCard
                    teamName={team.teamName}
                    match={team.matches[0]}
                />
            </div>

            {team.matches.slice(1).map(match =>
                <MatchSmallCard
                    key={match.id}
                    teamName={team.teamName}
                    match={match}
                />
            )}

            <div className="more-link">
                <Link to={`/teams/${teamName}/matches/${process.env.REACT_APP_DATA_END_YEAR}`}>More &gt;</Link>
            </div>
        </div>
    );
}