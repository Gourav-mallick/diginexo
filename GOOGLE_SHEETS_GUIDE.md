# 📊 Google Sheets Integration Guide

This guide will help you set up Google Sheets as a CMS for your portfolio projects.

## 🎯 Why Google Sheets?

- ✅ No technical knowledge required to update projects
- ✅ Update portfolio content without redeploying
- ✅ Free and easy to use
- ✅ Collaborative (multiple people can update)
- ✅ Data validation and organization

## 📋 Table of Contents

1. [Setting Up Google Sheet](#1-setting-up-google-sheet)
2. [Method 1: Google Sheets API](#2-method-1-google-sheets-api)
3. [Method 2: SheetDB (Recommended for Beginners)](#3-method-2-sheetdb)
4. [Sheet Structure](#4-sheet-structure)
5. [Deployment Configuration](#5-deployment-configuration)
6. [Troubleshooting](#6-troubleshooting)

---

## 1. Setting Up Google Sheet

### Step 1: Create New Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Click **"+ Blank"** to create a new sheet
3. Name it **"Portfolio Projects"**

### Step 2: Add Column Headers

In the first row, add these exact column names (case-sensitive):

| Column | Type | Description | Required |
|--------|------|-------------|----------|
| `id` | Text | Unique identifier (1, 2, 3...) | Yes |
| `projectName` | Text | Name of the project | Yes |
| `category` | Text | Android / Flutter / Web / UIUX | Yes |
| `techStack` | Text | Technologies used (comma-separated) | Yes |
| `description` | Text | Project description | Yes |
| `imageUrl` | URL | Project screenshot URL | Yes |
| `githubLink` | URL | GitHub repository URL | No |
| `liveDemo` | URL | Live demo/app URL | No |
| `featured` | Boolean | true/false or 1/0 | Yes |

### Step 3: Add Sample Data

Here's an example row:

```
id: 1
projectName: TaskMaster Pro
category: Android
techStack: Kotlin, Jetpack Compose, Room, Retrofit, MVVM
description: A comprehensive task management app with offline support, notifications, and cloud sync. Built with clean architecture.
imageUrl: https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop
githubLink: https://github.com/yourusername/taskmaster
liveDemo: https://play.google.com/store/apps/details?id=com.example.taskmaster
featured: true
```

### Important Notes:

- **id**: Must be unique for each project (1, 2, 3...)
- **category**: Must be exactly one of: `Android`, `Flutter`, `Web`, `UIUX`
- **featured**: Use `true`/`false` or `1`/`0`
- **URLs**: Must start with `http://` or `https://`
- **Empty fields**: For optional fields (githubLink, liveDemo), leave them empty if not applicable

---

## 2. Method 1: Google Sheets API

### Pros:
- ✅ Free with no limits
- ✅ Direct access from Google
- ✅ No third-party dependency

### Cons:
- ⚠️ Slightly more complex setup
- ⚠️ Requires Google Cloud account

### Setup Steps:

#### Step 1: Google Cloud Console Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project:
   - Click **"Select a project"** → **"New Project"**
   - Name: **"Portfolio Website"**
   - Click **"Create"**

#### Step 2: Enable Google Sheets API

1. In the Google Cloud Console, go to **"APIs & Services"** → **"Library"**
2. Search for **"Google Sheets API"**
3. Click on it and press **"Enable"**

#### Step 3: Create API Key

1. Go to **"APIs & Services"** → **"Credentials"**
2. Click **"+ Create Credentials"** → **"API Key"**
3. Copy the API key (you'll need this later)
4. Click **"Edit API key"** to restrict it:
   - **API restrictions**: Select **"Google Sheets API"**
   - **Website restrictions** (optional): Add your domain
   - Click **"Save"**

#### Step 4: Make Sheet Public

1. Open your Google Sheet
2. Click **"Share"** button (top-right)
3. Change to **"Anyone with the link"** → **"Viewer"**
4. Click **"Copy link"** and save it
5. Your Sheet ID is the long string in the URL:
   ```
   https://docs.google.com/spreadsheets/d/{THIS_IS_YOUR_SHEET_ID}/edit
   ```

#### Step 5: Configure Environment Variables

Create a `.env` file in your project root:

```env
REACT_APP_GOOGLE_SHEETS_API_KEY=AIzaSyD...your_api_key_here
REACT_APP_GOOGLE_SHEETS_ID=1a2b3c4d...your_sheet_id_here
```

#### Step 6: Test the Integration

1. Start your development server:
   ```bash
   npm run dev
   ```
2. Open the browser console (F12)
3. Look for any errors in the console
4. Check if projects are loading in the Projects section

---

## 3. Method 2: SheetDB

### Pros:
- ✅ Much easier setup (5 minutes)
- ✅ No Google Cloud account needed
- ✅ Additional features (webhooks, etc.)

### Cons:
- ⚠️ Free plan limited to 500 requests/month
- ⚠️ Requires third-party account

### Setup Steps:

#### Step 1: Create SheetDB Account

1. Go to [SheetDB.io](https://sheetdb.io/)
2. Click **"Sign Up"** (it's free)
3. Sign up using Google account

#### Step 2: Connect Your Sheet

1. Click **"Create Database"**
2. Select **"From Google Sheets"**
3. Paste your Google Sheet URL
4. Click **"Create"**

#### Step 3: Get API URL

1. After creation, you'll see your API URL:
   ```
   https://sheetdb.io/api/v1/a1b2c3d4e5f6
   ```
2. Copy this URL

#### Step 4: Configure Environment Variable

Create a `.env` file in your project root:

```env
REACT_APP_SHEETDB_API_URL=https://sheetdb.io/api/v1/your_id_here
```

#### Step 5: Test the Integration

1. Start your development server:
   ```bash
   npm run dev
   ```
2. Projects should load automatically

---

## 4. Sheet Structure

### Complete Example Sheet

| id | projectName | category | techStack | description | imageUrl | githubLink | liveDemo | featured |
|----|------------|----------|-----------|-------------|----------|------------|----------|----------|
| 1 | TaskMaster Pro | Android | Kotlin, Jetpack Compose, Room | Task management app with offline support | https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800 | https://github.com/user/taskmaster | https://play.google.com/store | true |
| 2 | ShopEase | Flutter | Flutter, Dart, Firebase | E-commerce mobile app with payment integration | https://images.unsplash.com/photo-1557821552-17105176677c?w=800 | https://github.com/user/shopease | https://shopease.app | true |
| 3 | Portfolio Dashboard | Web | React, TypeScript, Tailwind | Modern analytics dashboard with charts | https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800 | https://github.com/user/dashboard | https://dashboard.app | false |

### Tips for Images:

**Free Image Sources:**
- [Unsplash](https://unsplash.com/) - High-quality free photos
- [Pexels](https://pexels.com/) - Free stock photos
- [Pixabay](https://pixabay.com/) - Free images and videos

**Recommended Image Specifications:**
- Size: 800x600px or 1200x900px
- Format: JPG or PNG
- Aspect ratio: 4:3 or 16:9
- File size: < 500KB for faster loading

**Image URL Format:**
```
https://images.unsplash.com/photo-xxxxx?w=800&h=600&fit=crop
```

---

## 5. Deployment Configuration

### For Vercel:

1. Go to your project on Vercel
2. Navigate to **Settings** → **Environment Variables**
3. Add your variables:
   - **Key**: `REACT_APP_GOOGLE_SHEETS_API_KEY`
   - **Value**: Your API key
   - Click **"Add"**
4. Repeat for `REACT_APP_GOOGLE_SHEETS_ID` or `REACT_APP_SHEETDB_API_URL`
5. Redeploy your project

### For Netlify:

1. Go to **Site settings** → **Build & deploy** → **Environment**
2. Click **"Add variable"**
3. Add your variables
4. Trigger a new deploy

### For GitHub Pages:

GitHub Pages doesn't support environment variables. You'll need to:
1. Replace `process.env.REACT_APP_*` with actual values in code (not recommended)
2. OR use SheetDB with public URL

---

## 6. Troubleshooting

### Projects not loading?

**Check 1: API Key**
```javascript
// Open browser console and run:
console.log(process.env.REACT_APP_GOOGLE_SHEETS_API_KEY);
// Should show your API key (not undefined)
```

**Check 2: Sheet Visibility**
- Make sure sheet is public: "Anyone with the link can view"
- Check if you can access the sheet URL without logging in

**Check 3: API Enabled**
- Go to Google Cloud Console
- Verify Google Sheets API is enabled

**Check 4: Column Names**
- Must match exactly (case-sensitive)
- No extra spaces

**Check 5: Network Tab**
- Open browser DevTools → Network tab
- Look for 403 or 404 errors

### Common Errors:

**Error: "API key not valid"**
- ✅ Regenerate API key in Google Cloud Console
- ✅ Check for extra spaces in .env file

**Error: "The caller does not have permission"**
- ✅ Make sure sheet is public
- ✅ Check API restrictions in Google Cloud Console

**Error: "Range not found"**
- ✅ Verify sheet name is "Projects"
- ✅ Or update `GOOGLE_SHEETS_RANGE` in constants

**SheetDB limit reached:**
- Free plan: 500 requests/month
- Solution: Upgrade plan or use Google Sheets API

---

## 📝 Tips for Managing Content

### 1. Keep IDs Sequential
```
1, 2, 3, 4, 5... (easier to manage)
```

### 2. Use Data Validation
In Google Sheets:
- Select category column
- Data → Data validation
- List: Android, Flutter, Web, UIUX

### 3. Featured Projects
- Mark your best 3-5 projects as featured
- These appear prominently on the portfolio

### 4. Tech Stack Format
```
Good: Kotlin, Jetpack Compose, Room, Retrofit
Bad:  Kotlin,Jetpack Compose,Room (inconsistent spacing)
```

### 5. Description Length
- Keep descriptions concise (2-3 sentences)
- Aim for 100-150 characters
- Highlight key features

---

## 🎉 You're All Set!

Your portfolio now has a dynamic CMS! Update your Google Sheet anytime to:
- ✅ Add new projects
- ✅ Update project information
- ✅ Change featured projects
- ✅ Update tech stacks

No redeployment needed! 🚀

---

## 📞 Need Help?

If you encounter issues:
1. Check the troubleshooting section above
2. Review browser console for errors
3. Verify all environment variables are set correctly
4. Test the API endpoint directly in browser

For more help, create an issue on GitHub or contact support.
