import React, { useEffect, useState } from 'react';
import { TeamTile } from '../components/TeamTile';
import './HomePage.scss';

export const HomePage = () => {
    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAllTeams = async () => {
            try {
                setLoading(true);
                setError(null);

                // Fixed: use parentheses, await, and response.json()
                const response = await fetch('http://localhost:8080/teams');

                if (!response.ok) {
                    throw new Error(`Failed to fetch teams: ${response.status}`);
                }

                const data = await response.json();
                console.log('Fetched teams:', data);
                setTeams(data);
            } catch (err) {
                console.error('Error fetching teams:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAllTeams();
    }, []);

    if (loading) {
        return (
            <div className="HomePage">
                <h1>Loading teams...</h1>
            </div>
        );
    }

    if (error) {
        return (
            <div className="HomePage">
                <h1>Error</h1>
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div className="HomePage">
            <div className="header-section">
                <h1 className="app-name">Anupam's IPL Dashboard</h1>
            </div>
            <div className="team-grid">
                {teams.map(team => (
                    <TeamTile
                        key={team.teamName}
                        teamName={team.teamName}
                    />
                ))}
            </div>
        </div>
    );
}
