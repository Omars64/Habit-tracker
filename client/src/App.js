import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HabitList from './components/HabitList';
import HabitForm from './components/HabitForm';
import EntryForm from './components/EntryForm';
import Statistics from './components/Statistics';
import MotivationSection from './components/MotivationSection';
import './App.css';

const API_BASE_URL = 'http://localhost:5000/api';

function App() {
  const [habits, setHabits] = useState([]);
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showHabitForm, setShowHabitForm] = useState(false);
  const [showEntryForm, setShowEntryForm] = useState(false);
  const [selectedHabit, setSelectedHabit] = useState(null);
  const [editingHabit, setEditingHabit] = useState(null);

  useEffect(() => {
    fetchHabits();
    fetchStats();
  }, []);

  const fetchHabits = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/habits`);
      setHabits(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch habits');
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/stats`);
      setStats(response.data);
    } catch (err) {
      console.error('Failed to fetch stats:', err);
    }
  };

  const createHabit = async (habitData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/habits`, habitData);
      setHabits([...habits, response.data]);
      setShowHabitForm(false);
      setSuccess('Habit created successfully!');
      fetchStats();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to create habit');
      setTimeout(() => setError(''), 3000);
    }
  };

  const updateHabit = async (id, habitData) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/habits/${id}`, habitData);
      setHabits(habits.map(h => h.id === id ? response.data : h));
      setEditingHabit(null);
      setSuccess('Habit updated successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to update habit');
      setTimeout(() => setError(''), 3000);
    }
  };

  const deleteHabit = async (id) => {
    if (window.confirm('Are you sure you want to delete this habit? All entries will be lost.')) {
      try {
        await axios.delete(`${API_BASE_URL}/habits/${id}`);
        setHabits(habits.filter(h => h.id !== id));
        setSuccess('Habit deleted successfully!');
        fetchStats();
        setTimeout(() => setSuccess(''), 3000);
      } catch (err) {
        setError('Failed to delete habit');
        setTimeout(() => setError(''), 3000);
      }
    }
  };

  const recordEntry = async (habitId, entryData) => {
    try {
      await axios.post(`${API_BASE_URL}/habits/${habitId}/entries`, entryData);
      setShowEntryForm(false);
      setSelectedHabit(null);
      setSuccess('Entry recorded successfully!');
      fetchHabits();
      fetchStats();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to record entry');
      setTimeout(() => setError(''), 3000);
    }
  };

  if (loading) {
    return (
      <div className="container">
        <div className="loading">
          <h2>Loading your habits...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <header className="header">
        <h1>🎯 Habit Tracker</h1>
        <p>Track, understand, and overcome your bad habits</p>
      </header>

      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}

      <Statistics stats={stats} />
      
      <MotivationSection habits={habits} />

      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2>Your Habits</h2>
          <button 
            className="btn btn-primary"
            onClick={() => setShowHabitForm(true)}
          >
            Add New Habit
          </button>
        </div>

        <HabitList 
          habits={habits}
          onEdit={setEditingHabit}
          onDelete={deleteHabit}
          onRecordEntry={(habit) => {
            setSelectedHabit(habit);
            setShowEntryForm(true);
          }}
        />
      </div>

      {showHabitForm && (
        <HabitForm
          onSubmit={createHabit}
          onCancel={() => setShowHabitForm(false)}
        />
      )}

      {editingHabit && (
        <HabitForm
          habit={editingHabit}
          onSubmit={(data) => updateHabit(editingHabit.id, data)}
          onCancel={() => setEditingHabit(null)}
          isEditing={true}
        />
      )}

      {showEntryForm && selectedHabit && (
        <EntryForm
          habit={selectedHabit}
          onSubmit={(data) => recordEntry(selectedHabit.id, data)}
          onCancel={() => {
            setShowEntryForm(false);
            setSelectedHabit(null);
          }}
        />
      )}
    </div>
  );
}

export default App;