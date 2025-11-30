import React from 'react';
import { Link } from 'react-router-dom';
import './YearSelector.scss';

export const YearSelector = ({ teamName }) => {
    let years = [];

    // Convert environment variables to numbers
    const startYear = parseInt(process.env.REACT_APP_DATA_START_YEAR);
    const endYear = parseInt(process.env.REACT_APP_DATA_END_YEAR);

    // Add validation to ensure we have valid numbers
    if (isNaN(startYear) || isNaN(endYear)) {
        console.error('Invalid year configuration in environment variables');
        return <div>Year configuration error</div>;
    }

    for (let i = startYear; i <= endYear; i++) {
        years.push(i);
    }

    return (
        <div>
            <ol className="YearSelector">
                {years.map(year => (
                    <li key={year}>
                        <Link to={`/teams/${teamName}/matches/${year}`}>
                            {year}
                        </Link>
                    </li>
                ))}
            </ol>
        </div>
    );
}
