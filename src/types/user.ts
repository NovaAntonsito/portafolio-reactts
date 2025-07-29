// User-related interfaces and types

export interface Technology {
  name: string;
  category: 'backend' | 'frontend' | 'devops' | 'database';
  proficiency: 'beginner' | 'intermediate' | 'advanced' | 'expert';
}

export interface SocialLink {
  platform: 'instagram' | 'linkedin' | 'github';
  url: string;
  username: string;
}

export interface UserProfile {
  name: string;
  title: string;
  description: string;
  aboutText: string;
  profileImage?: string;
  technologies: Technology[];
  socialLinks: SocialLink[];
}