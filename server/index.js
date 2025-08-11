const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Data storage file path
const DATA_FILE = path.join(__dirname, 'data', 'habits.json');

// Ensure data directory exists
const dataDir = path.dirname(DATA_FILE);
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Initialize data file if it doesn't exist
if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, JSON.stringify({ habits: [], entries: [] }, null, 2));
}

// Helper functions
const readData = () => {
  try {
    const data = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return { habits: [], entries: [] };
  }
};

const writeData = (data) => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
};

// Routes

// Get all habits
app.get('/api/habits', (req, res) => {
  const data = readData();
  res.json(data.habits);
});

// Create a new habit
app.post('/api/habits', (req, res) => {
  const { name, description, motivationalQuotes } = req.body;
  
  if (!name) {
    return res.status(400).json({ error: 'Habit name is required' });
  }

  const data = readData();
  const newHabit = {
    id: uuidv4(),
    name,
    description: description || '',
    motivationalQuotes: motivationalQuotes || [],
    createdAt: new Date().toISOString(),
    lastOccurrence: null,
    totalOccurrences: 0
  };

  data.habits.push(newHabit);
  writeData(data);
  
  res.status(201).json(newHabit);
});

// Update a habit
app.put('/api/habits/:id', (req, res) => {
  const { id } = req.params;
  const { name, description, motivationalQuotes } = req.body;
  
  const data = readData();
  const habitIndex = data.habits.findIndex(h => h.id === id);
  
  if (habitIndex === -1) {
    return res.status(404).json({ error: 'Habit not found' });
  }

  data.habits[habitIndex] = {
    ...data.habits[habitIndex],
    name: name || data.habits[habitIndex].name,
    description: description !== undefined ? description : data.habits[habitIndex].description,
    motivationalQuotes: motivationalQuotes !== undefined ? motivationalQuotes : data.habits[habitIndex].motivationalQuotes
  };

  writeData(data);
  res.json(data.habits[habitIndex]);
});

// Delete a habit
app.delete('/api/habits/:id', (req, res) => {
  const { id } = req.params;
  const data = readData();
  
  const habitIndex = data.habits.findIndex(h => h.id === id);
  if (habitIndex === -1) {
    return res.status(404).json({ error: 'Habit not found' });
  }

  // Remove habit and all its entries
  data.habits.splice(habitIndex, 1);
  data.entries = data.entries.filter(entry => entry.habitId !== id);
  
  writeData(data);
  res.json({ message: 'Habit deleted successfully' });
});

// Get all entries for a specific habit
app.get('/api/habits/:id/entries', (req, res) => {
  const { id } = req.params;
  const data = readData();
  
  const entries = data.entries.filter(entry => entry.habitId === id);
  res.json(entries);
});

// Record a habit occurrence
app.post('/api/habits/:id/entries', (req, res) => {
  const { id } = req.params;
  const { date, notes, mood, triggers } = req.body;
  
  const data = readData();
  const habitIndex = data.habits.findIndex(h => h.id === id);
  
  if (habitIndex === -1) {
    return res.status(404).json({ error: 'Habit not found' });
  }

  const newEntry = {
    id: uuidv4(),
    habitId: id,
    date: date || new Date().toISOString().split('T')[0],
    timestamp: new Date().toISOString(),
    notes: notes || '',
    mood: mood || 'neutral',
    triggers: triggers || []
  };

  data.entries.push(newEntry);
  
  // Update habit statistics
  data.habits[habitIndex].lastOccurrence = newEntry.date;
  data.habits[habitIndex].totalOccurrences += 1;
  
  writeData(data);
  res.status(201).json(newEntry);
});

// Delete an entry
app.delete('/api/entries/:id', (req, res) => {
  const { id } = req.params;
  const data = readData();
  
  const entryIndex = data.entries.findIndex(e => e.id === id);
  if (entryIndex === -1) {
    return res.status(404).json({ error: 'Entry not found' });
  }

  const entry = data.entries[entryIndex];
  data.entries.splice(entryIndex, 1);
  
  // Update habit statistics
  const habitIndex = data.habits.findIndex(h => h.id === entry.habitId);
  if (habitIndex !== -1) {
    data.habits[habitIndex].totalOccurrences = Math.max(0, data.habits[habitIndex].totalOccurrences - 1);
    
    // Update last occurrence
    const remainingEntries = data.entries.filter(e => e.habitId === entry.habitId);
    if (remainingEntries.length > 0) {
      const latestEntry = remainingEntries.sort((a, b) => new Date(b.date) - new Date(a.date))[0];
      data.habits[habitIndex].lastOccurrence = latestEntry.date;
    } else {
      data.habits[habitIndex].lastOccurrence = null;
    }
  }
  
  writeData(data);
  res.json({ message: 'Entry deleted successfully' });
});

// Get statistics for all habits
app.get('/api/stats', (req, res) => {
  const data = readData();
  
  const stats = data.habits.map(habit => {
    const habitEntries = data.entries.filter(entry => entry.habitId === habit.id);
    
    // Calculate streaks
    const sortedEntries = habitEntries.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    let currentStreak = 0;
    let longestStreak = 0;
    let tempStreak = 0;
    
    if (sortedEntries.length > 0) {
      const today = new Date();
      const lastEntryDate = new Date(sortedEntries[0].date);
      const daysSinceLastEntry = Math.floor((today - lastEntryDate) / (1000 * 60 * 60 * 24));
      
      if (daysSinceLastEntry === 0) {
        currentStreak = 1;
      }
      
      // Calculate longest streak (consecutive days without the habit)
      const allDates = sortedEntries.map(entry => entry.date);
      const uniqueDates = [...new Set(allDates)].sort();
      
      for (let i = 0; i < uniqueDates.length - 1; i++) {
        const current = new Date(uniqueDates[i]);
        const next = new Date(uniqueDates[i + 1]);
        const daysDiff = Math.floor((current - next) / (1000 * 60 * 60 * 24));
        
        if (daysDiff === 1) {
          tempStreak++;
        } else {
          longestStreak = Math.max(longestStreak, tempStreak);
          tempStreak = 0;
        }
      }
      longestStreak = Math.max(longestStreak, tempStreak);
    }

    return {
      habitId: habit.id,
      habitName: habit.name,
      totalOccurrences: habit.totalOccurrences,
      lastOccurrence: habit.lastOccurrence,
      currentStreak,
      longestStreak,
      entriesThisWeek: habitEntries.filter(entry => {
        const entryDate = new Date(entry.date);
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        return entryDate >= weekAgo;
      }).length,
      entriesThisMonth: habitEntries.filter(entry => {
        const entryDate = new Date(entry.date);
        const monthAgo = new Date();
        monthAgo.setMonth(monthAgo.getMonth() - 1);
        return entryDate >= monthAgo;
      }).length
    };
  });
  
  res.json(stats);
});

// Get motivational quotes for a habit
app.get('/api/habits/:id/motivation', (req, res) => {
  const { id } = req.params;
  const data = readData();
  
  const habit = data.habits.find(h => h.id === id);
  if (!habit) {
    return res.status(404).json({ error: 'Habit not found' });
  }

  const quotes = habit.motivationalQuotes || [];
  const randomQuote = quotes.length > 0 ? quotes[Math.floor(Math.random() * quotes.length)] : null;
  
  res.json({
    randomQuote,
    allQuotes: quotes,
    daysSinceLastOccurrence: habit.lastOccurrence ? 
      Math.floor((new Date() - new Date(habit.lastOccurrence)) / (1000 * 60 * 60 * 24)) : 
      null
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});