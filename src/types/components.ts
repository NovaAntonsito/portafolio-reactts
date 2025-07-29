// Component prop interfaces

import type { ReactNode } from 'react';
import type { Technology, SocialLink } from './user';
import type { SpotifyPlaylist, Track } from './music';
import type { ContactForm } from './contact';

// Layout Components
export interface LayoutProps {
  children: ReactNode;
}

export interface NavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  isMobileMenuOpen?: boolean;
  onMobileMenuToggle?: () => void;
}

// Section Components
export interface HomeProps {
  profileImage?: string;
  description: string;
  name: string;
  title: string;
}

export interface AboutProps {
  content: string;
  technologies: Technology[];
}

export interface MusicPlayerProps {
  playlist?: SpotifyPlaylist;
  isConnected: boolean;
  currentTrack?: Track;
  isPlaying: boolean;
  onPlay?: () => void;
  onPause?: () => void;
  onNext?: () => void;
  onPrevious?: () => void;
}

export interface ContactProps {
  socialLinks: SocialLink[];
  onFormSubmit?: (formData: ContactForm) => void;
}

// UI Components
export interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

export interface CardProps {
  children: ReactNode;
  className?: string;
  glowing?: boolean;
}

export interface FormInputProps {
  label: string;
  name: string;
  type?: 'text' | 'email' | 'textarea';
  value: string;
  onChange: (value: string) => void;
  error?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
}