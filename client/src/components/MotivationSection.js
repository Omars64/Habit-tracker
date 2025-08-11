import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MotivationSection = ({ habits }) => {
  const [motivationalData, setMotivationalData] = useState([]);

  useEffect(() => {
    if (habits.length > 0) {
      fetchMotivationalData();
    }
  }, [habits]);

  const fetchMotivationalData = async () => {
    try {
      const promises = habits.map(habit => 
        axios.get(`http://localhost:5000/api/habits/${habit.id}/motivation`)
      );
      const responses = await Promise.all(promises);
      const data = responses.map((response, index) => ({
        habitId: habits[index].id,
        habitName: habits[index].name,
        ...response.data
      }));
      setMotivationalData(data);
    } catch (err) {
      console.error('Failed to fetch motivational data:', err);
    }
  };

  if (habits.length === 0) {
    return null;
  }

  const getEncouragementMessage = () => {
    const cleanHabits = motivationalData.filter(data => 
      data.daysSinceLastOccurrence === null || data.daysSinceLastOccurrence > 0
    );
    
    if (cleanHabits.length === habits.length) {
      return "🌟 Amazing! You're staying strong with all your habits!";
    } else if (cleanHabits.length > habits.length / 2) {
      return "💪 Great progress! You're doing well with most of your habits!";
    } else {
      return "🎯 Keep going! Every day is a new opportunity to improve!";
    }
  };

  const featuredMotivation = motivationalData.find(data => 
    data.randomQuote && (data.daysSinceLastOccurrence === null || data.daysSinceLastOccurrence < 7)
  );

  return (
    <div className="card">
      <h2 style={{ marginBottom: '20px', color: '#333' }}>💡 Daily Motivation</h2>
      
      <div className="motivation-section">
        <div style={{ fontSize: '1.2rem', marginBottom: '15px' }}>
          {getEncouragementMessage()}
        </div>
        
        {featuredMotivation && (
          <div style={{ 
            background: 'rgba(255,255,255,0.3)', 
            borderRadius: '10px', 
            padding: '15px',
            marginTop: '15px'
          }}>
            <div className="motivation-quote">
              "{featuredMotivation.randomQuote}"
            </div>
            <div style={{ fontSize: '0.9rem', color: '#2d3436' }}>
              - For your {featuredMotivation.habitName} habit
            </div>
          </div>
        )}

        <div style={{ marginTop: '20px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
          {motivationalData.map(data => (
            <div key={data.habitId} style={{ 
              background: 'rgba(255,255,255,0.2)', 
              borderRadius: '8px', 
              padding: '15px',
              textAlign: 'center'
            }}>
              <div style={{ fontWeight: '600', marginBottom: '5px' }}>
                {data.habitName}
              </div>
              <div className="days-clean">
                {data.daysSinceLastOccurrence === null 
                  ? '∞ days clean!' 
                  : `${data.daysSinceLastOccurrence} day${data.daysSinceLastOccurrence !== 1 ? 's' : ''} clean`
                }
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MotivationSection;