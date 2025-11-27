import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MatchDetailCard } from "../components/MatchDetailCard";
import { MatchSmallCard } from "../components/MatchSmallCard";

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
                const response = await fetch(`/team/${encodedName}`);

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
            <h1>{team.teamName}</h1>

            {team.matches.length > 0 && (
                <MatchDetailCard match={team.matches[0]} teamName={team.teamName} />
            )}

            {team.matches.length > 1 && (
                <div className="match-list">
                    {team.matches.slice(1).map((match, index) => (
                        <MatchSmallCard
                            key={match.id || index}
                            match={match}
                            teamName={team.teamName}
                        />
                    ))}
                </div>
            )}

            {team.matches.length === 0 && (
                <p>No matches found for this team.</p>
            )}
        </div>
    );
}