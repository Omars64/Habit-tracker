# 🎯 Habit Tracker

A comprehensive web application designed to help you track, understand, and overcome bad habits. This app provides motivation, progress tracking, and detailed analytics to support your journey of self-improvement.

## ✨ Features

### 🔍 Habit Management
- **Add Bad Habits**: Create habits you want to overcome with descriptions
- **Edit & Delete**: Modify habit details or remove habits entirely
- **Detailed Tracking**: Record when habits occur with specific dates

### 📊 Progress Analytics
- **Statistics Dashboard**: View overall progress across all habits
- **Streak Tracking**: Monitor days clean for each habit
- **Occurrence Counting**: Track total occurrences over time
- **Visual Progress**: Beautiful charts and progress indicators

### 💪 Motivation System
- **Custom Motivational Quotes**: Add personal reminders and quotes for each habit
- **Daily Motivation**: Random motivational messages displayed throughout the app
- **Progress Celebrations**: Encouraging messages for clean streaks
- **Positive Reinforcement**: Focus on progress rather than setbacks

### 📝 Detailed Entry Logging
- **Date Selection**: Record entries for any date (past or present)
- **Mood Tracking**: Log how you felt during the habit occurrence
- **Trigger Identification**: Track what caused the habit (stress, boredom, etc.)
- **Reflection Notes**: Add detailed notes about circumstances and learnings
- **Pattern Recognition**: Identify triggers and patterns over time

### 🎨 User Experience
- **Modern UI**: Beautiful, responsive design that works on all devices
- **Intuitive Interface**: Easy-to-use forms and navigation
- **Real-time Updates**: Instant feedback and progress updates
- **Mobile Friendly**: Fully responsive design for mobile and desktop

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd habit-tracker
   ```

2. **Install all dependencies**
   ```bash
   npm run install-all
   ```
   This will install dependencies for the root project, server, and client.

3. **Start the development servers**
   ```bash
   npm run dev
   ```
   This starts both the backend server (port 5000) and frontend client (port 3000).

4. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

### Alternative Setup

You can also start the servers separately:

```bash
# Terminal 1 - Start backend server
cd server
npm install
npm start

# Terminal 2 - Start frontend client
cd client
npm install
npm start
```

## 🏗️ Project Structure

```
habit-tracker/
├── client/                 # React frontend application
│   ├── public/            # Static files
│   ├── src/
│   │   ├── components/    # React components
│   │   │   ├── HabitList.js      # Display habits
│   │   │   ├── HabitForm.js      # Add/edit habits
│   │   │   ├── EntryForm.js      # Record occurrences
│   │   │   ├── Statistics.js     # Progress analytics
│   │   │   └── MotivationSection.js # Motivational content
│   │   ├── App.js         # Main application component
│   │   ├── App.css        # Application styles
│   │   ├── index.js       # React entry point
│   │   └── index.css      # Global styles
│   └── package.json       # Frontend dependencies
├── server/                # Node.js backend API
│   ├── data/             # JSON data storage
│   │   └── habits.json   # Persistent data file
│   ├── index.js          # Express server
│   └── package.json      # Backend dependencies
├── package.json          # Root package configuration
└── README.md            # This file
```

## 🔧 API Endpoints

### Habits
- `GET /api/habits` - Get all habits
- `POST /api/habits` - Create a new habit
- `PUT /api/habits/:id` - Update a habit
- `DELETE /api/habits/:id` - Delete a habit
- `GET /api/habits/:id/motivation` - Get motivational content for a habit

### Entries
- `GET /api/habits/:id/entries` - Get all entries for a habit
- `POST /api/habits/:id/entries` - Record a new habit occurrence
- `DELETE /api/entries/:id` - Delete an entry

### Statistics
- `GET /api/stats` - Get comprehensive statistics for all habits

## 💾 Data Storage

The application uses JSON file storage for simplicity and portability:
- Data is stored in `server/data/habits.json`
- Automatic backup and data integrity
- Easy to export and import data

### Data Structure

**Habit Object:**
```json
{
  "id": "uuid",
  "name": "Habit name",
  "description": "Optional description",
  "motivationalQuotes": ["Quote 1", "Quote 2"],
  "createdAt": "2024-01-01T00:00:00.000Z",
  "lastOccurrence": "2024-01-01",
  "totalOccurrences": 5
}
```

**Entry Object:**
```json
{
  "id": "uuid",
  "habitId": "habit-uuid",
  "date": "2024-01-01",
  "timestamp": "2024-01-01T12:00:00.000Z",
  "notes": "What happened and lessons learned",
  "mood": "neutral",
  "triggers": ["stress", "boredom"]
}
```

## 🎯 How to Use

### 1. Add a New Habit
1. Click "Add New Habit" button
2. Enter the habit name (e.g., "Smoking", "Nail biting")
3. Add an optional description
4. Add motivational quotes or reminders
5. Click "Create Habit"

### 2. Record a Habit Occurrence
1. Click "Record Occurrence" on any habit card
2. Select the date (defaults to today)
3. Choose your mood during the occurrence
4. Add notes about what happened and what you learned
5. Identify triggers that led to the habit
6. Click "Record Entry"

### 3. Track Your Progress
- View the statistics dashboard for overall progress
- See "days clean" counters for each habit
- Monitor your best streaks and total occurrences
- Get daily motivational messages

### 4. Stay Motivated
- Read your custom motivational quotes
- Celebrate clean day streaks
- Reflect on your progress with detailed analytics
- Use trigger identification to prevent future occurrences

## 🌟 Key Benefits

1. **Self-Awareness**: Understand patterns and triggers
2. **Progress Tracking**: Visual feedback on improvement
3. **Motivation**: Personalized quotes and encouragement
4. **Honest Reflection**: Safe space to record setbacks
5. **Pattern Recognition**: Identify what leads to habits
6. **Positive Focus**: Celebrate progress and clean days

## 🔮 Future Enhancements

- Export data to CSV/PDF reports
- Habit categories and tags
- Goal setting and milestones
- Social sharing and accountability partners
- Mobile app version
- Advanced analytics and insights
- Habit replacement suggestions
- Integration with calendar apps

## 🤝 Contributing

This is a personal habit tracking tool, but contributions are welcome! Feel free to:
- Report bugs or issues
- Suggest new features
- Submit pull requests
- Share your success stories

## 📄 License

MIT License - feel free to use and modify for your personal growth journey!

---

**Remember**: The goal isn't perfection, but progress. Every entry you record is a step toward understanding and overcoming your habits. Be kind to yourself and celebrate small victories! 🌱