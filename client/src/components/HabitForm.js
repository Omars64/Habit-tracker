import React, { useState, useEffect } from 'react';
import { FaTimes, FaPlus, FaMinus } from 'react-icons/fa';

const HabitForm = ({ habit, onSubmit, onCancel, isEditing = false }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    motivationalQuotes: ['']
  });

  useEffect(() => {
    if (habit) {
      setFormData({
        name: habit.name || '',
        description: habit.description || '',
        motivationalQuotes: habit.motivationalQuotes?.length > 0 ? habit.motivationalQuotes : ['']
      });
    }
  }, [habit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      alert('Please enter a habit name');
      return;
    }

    const filteredQuotes = formData.motivationalQuotes.filter(quote => quote.trim());
    onSubmit({
      ...formData,
      motivationalQuotes: filteredQuotes
    });
  };

  const handleQuoteChange = (index, value) => {
    const newQuotes = [...formData.motivationalQuotes];
    newQuotes[index] = value;
    setFormData({ ...formData, motivationalQuotes: newQuotes });
  };

  const addQuote = () => {
    setFormData({
      ...formData,
      motivationalQuotes: [...formData.motivationalQuotes, '']
    });
  };

  const removeQuote = (index) => {
    const newQuotes = formData.motivationalQuotes.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      motivationalQuotes: newQuotes.length > 0 ? newQuotes : ['']
    });
  };

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">
            {isEditing ? 'Edit Habit' : 'Add New Habit'}
          </h2>
          <button className="close-btn" onClick={onCancel}>
            <FaTimes />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Habit Name *</label>
            <input
              type="text"
              id="name"
              className="form-control"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g., Smoking, Nail biting, Procrastination"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              className="form-control textarea"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe the habit and why you want to overcome it..."
              rows="3"
            />
          </div>

          <div className="form-group">
            <label>Motivational Quotes/Reminders</label>
            <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '10px' }}>
              Add quotes or reminders to motivate yourself when you're tempted
            </p>
            {formData.motivationalQuotes.map((quote, index) => (
              <div key={index} style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                <input
                  type="text"
                  className="form-control"
                  value={quote}
                  onChange={(e) => handleQuoteChange(index, e.target.value)}
                  placeholder="Enter a motivational quote or reminder..."
                />
                {formData.motivationalQuotes.length > 1 && (
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => removeQuote(index)}
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
              onClick={addQuote}
              style={{ marginTop: '10px' }}
            >
              <FaPlus /> Add Another Quote
            </button>
          </div>

          <div style={{ display: 'flex', gap: '15px', justifyContent: 'flex-end', marginTop: '30px' }}>
            <button type="button" className="btn" onClick={onCancel} style={{ background: '#6c757d', color: 'white' }}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {isEditing ? 'Update Habit' : 'Create Habit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HabitForm;