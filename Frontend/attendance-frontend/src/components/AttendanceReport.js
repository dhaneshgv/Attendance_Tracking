// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import './AttendanceReport.css'; // Import the CSS file

// const AttendanceReport = () => {
//     const [report, setReport] = useState([]);
//     const [error, setError] = useState('');
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchReport = async () => {
//             try {
//                 setLoading(true); // Set loading to true before fetching data
//                 const response = await axios.get('http://localhost:8000/api/attendance/');
//                 setReport(response.data);
//             } catch (error) {
//                 setError('Failed to fetch report.');
//                 console.error('Report fetch error:', error.message);
//             } finally {
//                 setLoading(false); // Set loading to false after fetching data
//             }
//         };

//         fetchReport();
//     }, []);

//     return (
//         <div className="attendance-report-container">
//             <h2>Attendance Report</h2>
//             {loading && <p>Loading...</p>}
//             {error && <p className="error-message">{error}</p>}
//             <ul className="report-list">
//                 {report.length > 0 ? (
//                     report.map((entry, index) => (
//                         <li key={index} className="report-item">
//                             {entry.date} - {entry.status}
//                         </li>
//                     ))
//                 ) : (
//                     !loading && <p>No data available.</p>
//                 )}
//             </ul>
//         </div>
//     );
// };

// export default AttendanceReport;


import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AttendanceReport = () => {
    const [report, setReport] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReport = async () => {
            try {
                setLoading(true); // Set loading to true before fetching data
                const response = await axios.get('http://localhost:8000/api/attendance/');
                setReport(response.data);
            } catch (error) {
                setError('Failed to fetch report.');
                console.error('Report fetch error:', error.message);
            } finally {
                setLoading(false); // Set loading to false after fetching data
            }
        };

        fetchReport();
    }, []);

    // Inline CSS styles
    const containerStyle = {
        padding: '20px',
        backgroundColor: '#f5f5f5',
        borderRadius: '8px',
        maxWidth: '600px',
        margin: 'auto'
    };

    const headingStyle = {
        color: '#333'
    };

    const errorStyle = {
        color: 'red'
    };

    const loadingStyle = {
        fontSize: '1.2em',
        color: '#333'
    };

    const recordCountStyle = {
        fontSize: '1.2em',
        marginBottom: '20px'
    };

    const listStyle = {
        listStyleType: 'none',
        padding: '0'
    };

    const listItemStyle = {
        padding: '10px',
        borderBottom: '1px solid #ddd'
    };

    return (
        <div style={containerStyle}>
            <h2 style={headingStyle}>Attendance Report</h2>
            {loading && <p style={loadingStyle}>Loading...</p>}
            {error && <p style={errorStyle}>{error}</p>}
            <p style={recordCountStyle}>Total Records: {report.length}</p>
            <ul style={listStyle}>
                {report.length > 0 ? (
                    report.map((entry, index) => (
                        <li key={index} style={listItemStyle}>
                            {entry.date} - {entry.status}
                        </li>
                    ))
                ) : (
                    !loading && <p>No data available.</p>
                )}
            </ul>
        </div>
    );
};

export default AttendanceReport;
