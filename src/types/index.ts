// Type definitions for the portfolio

export interface Project {
  id: string;
  projectName: string;
  category: 'Android' | 'Flutter' | 'ReactNative' | 'Web' | 'UIUX';
  techStack: string;
  description: string;
  longDescription?: string;
  highlights?: string[];
  problem?: string;
  solution?: string;
  impact?: string[];
  imageUrl: string;
  githubLink?: string;
  liveDemo?: string;
  behanceLink?: string;
  status?: 'Completed' | 'In Progress' | 'Concept';
  featured: boolean;
}

export interface Skill {
  name: string;
  level: number;
  category: 'Android' | 'Web' | 'Cross-platform' | 'UIUX';
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar?: string;
}

export interface ContactForm {
  name: string;
  email: string;
  phone: string;
  countryCode: string;
  message: string;
}

export type CategoryFilter = 'All' | 'Android' | 'Flutter' | 'ReactNative' | 'Web' | 'UIUX';