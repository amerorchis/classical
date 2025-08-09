# Classical Music Syllabus

A modern, interactive web application for exploring Western Classical Music through 50 essential works, spanning from Medieval times to the 20th century and beyond.

## Features

### 🎵 Comprehensive Music Library
- 50 carefully selected classical works across 6 major periods
- Each work includes composer biography, historical context, and Spotify integration
- Progress tracking for listened/completed works with personal notes

### 🎨 Modern Interface
- **Dark/Light Mode**: Seamless theme switching with system preference detection
- **Responsive Design**: Works beautifully on desktop, tablet, and mobile
- **Smooth Navigation**: Timeline-based navigation with scroll highlighting
- **Side Menu**: Collapsible navigation showing works by musical period

### 📊 Progress Tracking
- **Visual Progress**: Floating progress bubble showing completion status
- **Local Storage**: Your progress persists across browser sessions
- **Personal Notes**: Add private notes for each musical work
- **Auto-expansion**: Side menu automatically expands to show your next work

### 🔐 Cloud Sync (Optional)
- **Google Authentication**: Sign in to sync progress across devices
- **Firebase Integration**: Real-time synchronization of progress and notes
- **Offline Support**: Works perfectly without authentication

### 🎼 Rich Content
- **Composer Biographies**: Detailed popup biographies with portraits
- **Historical Context**: Background information for each musical period
- **Spotify Integration**: Direct links to listen on Spotify
- **Typographic Excellence**: Beautiful typography with proper quotes

## Technology Stack

- **Frontend**: Vanilla JavaScript (ES6 modules), HTML5, CSS3
- **Styling**: Tailwind CSS with custom theme support
- **Backend**: Firebase (Authentication + Firestore)
- **Data**: JSON-based content management
- **Icons**: Custom SVG icons and Feather icons

## Getting Started

### Local Development

**Clone the repository**:
   ```bash
   git clone <repository-url>
   cd classical
   ```

## Configuration

### Firebase Setup (Optional)

To enable cloud sync:

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Authentication with Google provider
3. Create a Firestore database
4. Update `firebaseConfig` in `classical.html` with your project credentials
5. Set up Firestore security rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## Project Structure

```
classical/
├── index.html            # Main HTML file
├── src/
│   ├── css/
│   │   └── styles.css    # Custom styles and dark mode support
│   ├── js/
│   │   ├── app.js        # Main application initialization
│   │   ├── theme-manager.js # Dark/light mode handling
│   │   ├── navigation.js # Menu and scroll navigation
│   │   ├── progress-tracker.js # Progress tracking and persistence
│   │   ├── syllabus-builder.js # Dynamic content generation
│   │   ├── composer-bios.js # Composer biography popups
│   │   └── utils.js      # Utility functions and DOM helpers
│   ├── data/
│   │   ├── syllabus-data.json # Musical works and metadata
│   │   └── composer-data.json # Composer biographies and images
│   └── assets/
│       └── images/       # Composer portraits and other assets
└── docs/                 # Documentation and development notes
```

## Data Structure

### Adding New Works

Edit `src/data/syllabus-data.json`:

```json
{
  "medieval": {
    "title": "Medieval Period (500-1400)",
    "context": "Historical background...",
    "works": [
      {
        "id": "unique-work-id",
        "composer": "composer-id",
        "title": "Work Title",
        "year": "c. 1200",
        "description": "Work description...",
        "spotify_url": "https://open.spotify.com/..."
      }
    ]
  }
}
```

### Adding Composer Biographies

Edit `src/data/composer-data.json`:

```json
{
  "composer-id": {
    "name": "Composer Name",
    "years": "1600-1750",
    "image": "src/assets/images/composer-portrait.jpg",
    "bio": "Detailed biography text..."
  }
}
```

## Acknowledgments

- **Richard Taruskin**: "The Oxford History of Western Music" - primary source
