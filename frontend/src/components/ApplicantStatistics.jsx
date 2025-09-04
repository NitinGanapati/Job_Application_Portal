import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ApplicantStatistics = ({ userId }) => {
  const [stats, setStats] = useState({
    totalApplications: 0,
    lastWeekApplications: 0,
    interviews: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/statistics/applicant/${userId}` // Ensure the endpoint matches
        );
        setStats(response.data);
      } catch (error) {
        console.error('Error fetching statistics:', error.message);
      }
    };

    if (userId) fetchStats();
  }, [userId]);

  return (
    <div className="statistics-container">
      <h2>Your Job Application Statistics</h2>
      <div className="stat">
        <strong>Total Applications:</strong> {stats.totalApplications}
      </div>
      <div className="stat">
        <strong>Last Week's Applications:</strong> {stats.lastWeekApplications}
      </div>
      <div className="stat">
        <strong>Interviews Scheduled:</strong> {stats.interviews}
      </div>
    </div>
  );
};

export default ApplicantStatistics;
