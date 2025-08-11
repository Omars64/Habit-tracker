import React from 'react';
import { FaEdit, FaTrash, FaPlus, FaCalendarAlt } from 'react-icons/fa';

const HabitList = ({ habits, onEdit, onDelete, onRecordEntry }) => {
  if (habits.length === 0) {
    return (
      <div className="empty-state">
        <h3>No habits tracked yet</h3>
        <p>Start by adding a habit you want to overcome!</p>
      </div>
    );
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'Never';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getDaysSince = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    const today = new Date();
    const diffTime = Math.abs(today - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="habit-list">
      {habits.map(habit => {
        const daysSince = getDaysSince(habit.lastOccurrence);
        
        return (
          <div key={habit.id} className="habit-card">
            <div className="habit-header">
              <div>
                <h3 className="habit-name">{habit.name}</h3>
                {habit.description && (
                  <p className="habit-description">{habit.description}</p>
                )}
              </div>
            </div>

            <div className="habit-stats">
              <div className="stat-item">
                <span className="stat-value">{habit.totalOccurrences}</span>
                <span className="stat-label">Total Occurrences</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">
                  {daysSince !== null ? `${daysSince}d` : '∞'}
                </span>
                <span className="stat-label">Days Since Last</span>
              </div>
            </div>

            <div style={{ marginBottom: '15px' }}>
              <strong>Last Occurrence:</strong> {formatDate(habit.lastOccurrence)}
            </div>

            {daysSince !== null && daysSince > 0 && (
              <div className="motivation-section" style={{ margin: '15px 0', padding: '15px' }}>
                <div className="days-clean">
                  🎉 {daysSince} day{daysSince !== 1 ? 's' : ''} clean!
                </div>
                <div style={{ fontSize: '0.9rem', marginTop: '5px', color: '#2d3436' }}>
                  Keep going strong!
                </div>
              </div>
            )}

            <div className="habit-actions">
              <button
                className="btn btn-danger"
                onClick={() => onRecordEntry(habit)}
                title="Record an occurrence of this habit"
              >
                <FaPlus /> Record Occurrence
              </button>
              <button
                className="btn btn-primary"
                onClick={() => onEdit(habit)}
                title="Edit this habit"
              >
                <FaEdit /> Edit
              </button>
              <button
                className="btn btn-danger"
                onClick={() => onDelete(habit.id)}
                title="Delete this habit"
                style={{ background: 'linear-gradient(135deg, #dc3545 0%, #c82333 100%)' }}
              >
                <FaTrash /> Delete
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default HabitList;