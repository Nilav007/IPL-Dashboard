import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MatchSmallCard } from "../components/MatchSmallCard";

export const MatchPage = () => {
    const [matches, setMatches] = useState([]);
    const { teamName, year } = useParams();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMatches = async () => {
            try {
                setLoading(true);
                setError(null);

                const nameToFetch = teamName || 'Rajasthan Royals';
                const response = await fetch(`http://localhost:8080/team/${nameToFetch}/matches?year=${year}`);

                if (!response.ok) {
                    throw new Error(`Failed to fetch team data: ${response.status}`);
                }

                const data = await response.json();
                setMatches(data);
            } catch (err) {
                console.error('Error fetching team:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchMatches();
    }, [teamName, year]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h1>MatchPage</h1>
            {matches.map((match, index) => (
                <MatchSmallCard key={match.id || index} match={match} />
            ))}
        </div>
    );
}