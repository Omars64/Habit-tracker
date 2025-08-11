import React from 'react';
import { FaChartLine, FaCalendarWeek, FaCalendarDay, FaTrophy } from 'react-icons/fa';

const Statistics = ({ stats }) => {
  if (!stats || stats.length === 0) {
    return null;
  }

  const totalHabits = stats.length;
  const totalOccurrences = stats.reduce((sum, stat) => sum + stat.totalOccurrences, 0);
  const habitsWithNoOccurrencesToday = stats.filter(stat => {
    const today = new Date().toISOString().split('T')[0];
    return stat.lastOccurrence !== today;
  }).length;
  const longestStreak = Math.max(...stats.map(stat => stat.longestStreak || 0));

  return (
    <div className="stats-grid">
      <div className="stats-card">
        <FaChartLine style={{ fontSize: '2rem', color: '#667eea', marginBottom: '10px' }} />
        <h3>Habits Tracked</h3>
        <div className="stats-value">{totalHabits}</div>
        <div className="stats-label">Total Habits</div>
      </div>

      <div className="stats-card">
        <FaCalendarDay style={{ fontSize: '2rem', color: '#51cf66', marginBottom: '10px' }} />
        <h3>Clean Today</h3>
        <div className="stats-value">{habitsWithNoOccurrencesToday}</div>
        <div className="stats-label">Habits Avoided Today</div>
      </div>

      <div className="stats-card">
        <FaTrophy style={{ fontSize: '2rem', color: '#ffd43b', marginBottom: '10px' }} />
        <h3>Best Streak</h3>
        <div className="stats-value">{longestStreak}</div>
        <div className="stats-label">Days Clean</div>
      </div>

      <div className="stats-card">
        <FaCalendarWeek style={{ fontSize: '2rem', color: '#ff6b6b', marginBottom: '10px' }} />
        <h3>Total Recorded</h3>
        <div className="stats-value">{totalOccurrences}</div>
        <div className="stats-label">All Time Occurrences</div>
      </div>
    </div>
  );
};

export default Statistics;