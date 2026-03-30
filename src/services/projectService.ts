import axios from 'axios';
import { Project } from '../types';
import { API_CONFIG, MOCK_PROJECTS } from '../constants';

/**
 * Service layer for fetching projects from Google Sheets
 * 
 * Setup Instructions:
 * 
 * METHOD 1: Google Sheets API (Recommended for production)
 * 1. Create a Google Sheet with columns: id, projectName, category, techStack, description, imageUrl, githubLink, liveDemo, featured
 * 2. Go to Google Cloud Console: https://console.cloud.google.com/
 * 3. Create a new project
 * 4. Enable Google Sheets API
 * 5. Create credentials (API Key)
 * 6. Make your sheet public (Share > Anyone with link can view)
 * 7. Set environment variables:
 *    - REACT_APP_GOOGLE_SHEETS_API_KEY=your_api_key
 *    - REACT_APP_GOOGLE_SHEETS_ID=your_sheet_id (from URL)
 * 
 * METHOD 2: SheetDB (Easier alternative)
 * 1. Go to https://sheetdb.io/
 * 2. Create a free account
 * 3. Connect your Google Sheet
 * 4. Copy your API URL
 * 5. Set environment variable:
 *    - REACT_APP_SHEETDB_API_URL=https://sheetdb.io/api/v1/your_id
 */

// Parse Google Sheets response
function parseGoogleSheetsData(values: any[][]): Project[] {
  return values.map((row) => ({
    id: row[0] || '',
    projectName: row[1] || '',
    category: (row[2] || 'Web') as Project['category'],
    techStack: row[3] || '',
    description: row[4] || '',
    longDescription: row[9] || '',
    highlights: row[10] ? row[10].split('|').map((h: string) => h.trim()) : [],
    imageUrl: row[5] || '',
    githubLink: row[6] || '',
    liveDemo: row[7] || '',
    behanceLink: row[11] || '',
    status: (row[12] || 'Completed') as Project['status'],
    featured: row[8]?.toLowerCase() === 'true' || row[8] === '1',
  }));
}

// Fetch from Google Sheets API
async function fetchFromGoogleSheets(): Promise<Project[]> {
  const { GOOGLE_SHEETS_API_KEY, GOOGLE_SHEETS_ID, GOOGLE_SHEETS_RANGE } = API_CONFIG;
  
  if (!GOOGLE_SHEETS_API_KEY || !GOOGLE_SHEETS_ID) {
    throw new Error('Google Sheets API credentials not configured');
  }

  const url = `https://sheets.googleapis.com/v4/spreadsheets/${GOOGLE_SHEETS_ID}/values/${GOOGLE_SHEETS_RANGE}?key=${GOOGLE_SHEETS_API_KEY}`;
  
  const response = await axios.get(url);
  const values = response.data.values || [];
  
  return parseGoogleSheetsData(values);
}

// Fetch from SheetDB
async function fetchFromSheetDB(): Promise<Project[]> {
  const { SHEETDB_API_URL } = API_CONFIG;
  
  if (!SHEETDB_API_URL) {
    throw new Error('SheetDB API URL not configured');
  }

  const response = await axios.get(SHEETDB_API_URL);
  return response.data.map((item: any) => ({
    id: item.id,
    projectName: item.projectName,
    category: item.category as Project['category'],
    techStack: item.techStack,
    description: item.description,
    imageUrl: item.imageUrl,
    githubLink: item.githubLink || '',
    liveDemo: item.liveDemo || '',
    behanceLink: item.behanceLink || '',
    status: (item.status || 'Completed') as Project['status'],
    featured: item.featured === 'true' || item.featured === '1' || item.featured === true,
  }));
}

// Main function to fetch projects
export async function getProjects(): Promise<Project[]> {
  try {
    // Try Google Sheets API first
    if (API_CONFIG.GOOGLE_SHEETS_API_KEY && API_CONFIG.GOOGLE_SHEETS_ID) {
      return await fetchFromGoogleSheets();
    }
    
    // Try SheetDB as fallback
    if (API_CONFIG.SHEETDB_API_URL) {
      return await fetchFromSheetDB();
    }
    
    // Return mock data if no API is configured (expected behaviour in dev/sandbox)
    return MOCK_PROJECTS;
  } catch (error) {
    console.error('Error fetching projects:', error);
    // Return mock data on error
    return MOCK_PROJECTS;
  }
}

// Filter projects by category
export function filterProjects(
  projects: Project[],
  category: string
): Project[] {
  if (category === 'All') {
    return projects;
  }
  return projects.filter((project) => project.category === category);
}

// Get featured projects
export function getFeaturedProjects(projects: Project[]): Project[] {
  return projects.filter((project) => project.featured);
}

// Search projects
export function searchProjects(
  projects: Project[],
  query: string
): Project[] {
  const lowerQuery = query.toLowerCase();
  return projects.filter(
    (project) =>
      project.projectName.toLowerCase().includes(lowerQuery) ||
      project.description.toLowerCase().includes(lowerQuery) ||
      project.techStack.toLowerCase().includes(lowerQuery)
  );
}

// Get project by ID
export function getProjectById(
  projects: Project[],
  id: string
): Project | undefined {
  return projects.find((project) => project.id === id);
}