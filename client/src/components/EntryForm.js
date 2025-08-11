import React, { useState } from 'react';
import { FaTimes, FaPlus, FaMinus, FaCalendarAlt } from 'react-icons/fa';

const EntryForm = ({ habit, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    notes: '',
    mood: 'neutral',
    triggers: ['']
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const filteredTriggers = formData.triggers.filter(trigger => trigger.trim());
    onSubmit({
      ...formData,
      triggers: filteredTriggers
    });
  };

  const handleTriggerChange = (index, value) => {
    const newTriggers = [...formData.triggers];
    newTriggers[index] = value;
    setFormData({ ...formData, triggers: newTriggers });
  };

  const addTrigger = () => {
    setFormData({
      ...formData,
      triggers: [...formData.triggers, '']
    });
  };

  const removeTrigger = (index) => {
    const newTriggers = formData.triggers.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      triggers: newTriggers.length > 0 ? newTriggers : ['']
    });
  };

  // Show a random motivational quote if available
  const randomQuote = habit.motivationalQuotes?.length > 0 
    ? habit.motivationalQuotes[Math.floor(Math.random() * habit.motivationalQuotes.length)]
    : null;

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Record: {habit.name}</h2>
          <button className="close-btn" onClick={onCancel}>
            <FaTimes />
          </button>
        </div>

        {randomQuote && (
          <div className="motivation-section" style={{ marginBottom: '20px' }}>
            <div className="motivation-quote">
              💪 "{randomQuote}"
            </div>
            <div style={{ fontSize: '0.9rem', color: '#2d3436' }}>
              Remember why you want to overcome this habit!
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="date">Date *</label>
            <input
              type="date"
              id="date"
              className="form-control"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="mood">How did you feel?</label>
            <select
              id="mood"
              className="form-control"
              value={formData.mood}
              onChange={(e) => setFormData({ ...formData, mood: e.target.value })}
            >
              <option value="good">Good - I'm learning from this</option>
              <option value="neutral">Neutral - It happened</option>
              <option value="bad">Bad - I'm disappointed</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="notes">Notes (What happened? How can you avoid it next time?)</label>
            <textarea
              id="notes"
              className="form-control textarea"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Describe what led to this habit occurrence and what you learned..."
              rows="4"
            />
          </div>

          <div className="form-group">
            <label>Triggers (What caused this habit?)</label>
            <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '10px' }}>
              Understanding your triggers helps prevent future occurrences
            </p>
            {formData.triggers.map((trigger, index) => (
              <div key={index} style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                <input
                  type="text"
                  className="form-control"
                  value={trigger}
                  onChange={(e) => handleTriggerChange(index, e.target.value)}
                  placeholder="e.g., Stress, Boredom, Social pressure..."
                />
                {formData.triggers.length > 1 && (
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => removeTrigger(index)}
                    style={{ minWidth: '50px' }}
                  >
                    <FaMinus />
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              className="btn btn-success"
              onClick={addTrigger}
              style={{ marginTop: '10px' }}
            >
              <FaPlus /> Add Trigger
            </button>
          </div>

          <div style={{ 
            background: '#fff3cd', 
            border: '1px solid #ffeaa7', 
            borderRadius: '8px', 
            padding: '15px', 
            marginBottom: '20px',
            textAlign: 'center'
          }}>
            <strong>Remember:</strong> Recording this helps you understand patterns and improve. 
            You're taking a positive step by being honest about your journey!
          </div>

          <div style={{ display: 'flex', gap: '15px', justifyContent: 'flex-end' }}>
            <button 
              type="button" 
              className="btn" 
              onClick={onCancel}
              style={{ background: '#6c757d', color: 'white' }}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              <FaCalendarAlt /> Record Entry
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EntryForm;