import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UploadSelfie from './components/UploadSelfie';
import AttendanceReport from './components/AttendanceReport';
import './App.css'; // Import the CSS file

const App = () => {
    return (
        <Router>
            <div className="app-container">
                <header className="app-header">
                    <h1>Attendance Tracking Platform</h1>
                </header>
                <main className="app-main">
                    <Routes>
                        <Route path="/" element={<UploadSelfie />} />
                        <Route path="/report" element={<AttendanceReport />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
};

export default App;
