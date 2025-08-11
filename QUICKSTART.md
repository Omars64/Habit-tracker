# 🚀 Quick Start Guide

Get your Habit Tracker running in 3 simple steps!

## Step 1: Setup
```bash
# Option A: Use the setup script (recommended)
./setup.sh

# Option B: Manual setup
npm run install-all
```

## Step 2: Start the Application
```bash
npm run dev
```

## Step 3: Access the App
- Open your browser to: **http://localhost:3000**
- The backend API runs on: **http://localhost:5000**

## 🎯 First Steps in the App

1. **Add Your First Habit**
   - Click "Add New Habit"
   - Enter a habit name (e.g., "Smoking", "Nail biting")
   - Add motivational quotes to inspire you
   - Save the habit

2. **Record an Occurrence** (when it happens)
   - Click "Record Occurrence" on any habit
   - Select the date
   - Note how you felt and what triggered it
   - Add reflective notes

3. **Track Your Progress**
   - View your statistics dashboard
   - See how many days you've been clean
   - Get motivated by your progress!

## 🆘 Troubleshooting

**Port already in use?**
```bash
# Kill processes on ports 3000 and 5000
sudo lsof -ti:3000 | xargs kill -9
sudo lsof -ti:5000 | xargs kill -9
```

**Dependencies not installing?**
```bash
# Clear npm cache and try again
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

**Need sample data?**
- Copy `server/data/sample-habits.json` to `server/data/habits.json` to start with example habits

---

**You've got this! 💪 Start tracking and improving today!**