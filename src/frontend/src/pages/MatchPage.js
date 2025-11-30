import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MatchSmallCard } from "../components/MatchSmallCard";
import { YearSelector } from "../components/YearSelector";
import './MatchPage.scss';

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

                const encodedName = encodeURIComponent(teamName);
                const response = await fetch(`${process.env.REACT_APP_API_ROOT_URL}/team/${encodedName}/matches?year=${year}`);

                if (!response.ok) {
                    throw new Error(`Failed to fetch team data: ${response.status}`);
                }

                const data = await response.json();
                console.log('Fetched matches:', data);
                console.log('Team name from URL:', teamName);
                setMatches(data);
            } catch (err) {
                console.error('Error fetching matches:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchMatches();
    }, [teamName, year]);

    if (loading) return <div className="MatchPage">Loading...</div>;
    if (error) return <div className="MatchPage">Error: {error}</div>;

    return (
        <div className="MatchPage">
            <div className="year-selector">
                <h3>Select Year</h3>
                <YearSelector teamName={teamName}/>
            </div>
            <div>
                <h1 className="page-heading">{teamName} matches in {year}</h1>
                {
                    matches.map(match => <MatchSmallCard teamName={teamName} match={match} key={match.id} />)
                }
            </div>
        </div>
    );
}