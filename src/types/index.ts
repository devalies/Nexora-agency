export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  clientName: string;
  industry: string;
  projectType: string;
  shortDesc: string;
  fullCaseStudy: string;
  challenge: string;
  solution: string;
  results: string; // JSON string array
  technologies: string; // JSON string array
  projectUrl: string;
  coverImage: string;
  galleryImages: string; // JSON string array
  isFeatured: boolean;
  isConcept: boolean;
  status: 'published' | 'draft';
  seoTitle: string;
  seoDescription: string;
  displayOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface Service {
  id: string;
  title: string;
  slug: string;
  shortDesc: string;
  fullDesc: string;
  icon: string;
  featuredImage: string;
  benefits: string; // JSON string array
  processSteps: string; // JSON string array
  relatedProjectIds: string; // JSON string array
  seoTitle: string;
  seoDescription: string;
  status: 'published' | 'draft';
  displayOrder: number;
  createdAt: string;
}

export interface Industry {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  relatedProjectIds: string; // JSON string array
  seoTitle: string;
  seoDescription: string;
  displayOrder: number;
  createdAt: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string; // JSON string array
  coverImage: string;
  authorName: string;
  authorRole: string;
  readTime: string;
  status: 'published' | 'draft';
  seoTitle: string;
  seoDescription: string;
  publishedAt: string;
  createdAt: string;
}

export interface Testimonial {
  id: string;
  clientName: string;
  position: string;
  company: string;
  photo: string;
  quote: string;
  rating: number;
  projectTitle: string;
  isFeatured: boolean;
  status: 'published' | 'draft';
  displayOrder: number;
  createdAt: string;
}

export interface TeamMember {
  id: string;
  name: string;
  position: string;
  bio: string;
  photo: string;
  linkedin: string;
  email: string;
  displayOrder: number;
  status: 'active' | 'inactive';
  createdAt: string;
}

export interface LeadNote {
  id: string;
  leadId: string;
  content: string;
  author: string;
  createdAt: string;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  company: string;
  website: string;
  projectType: string;
  budgetRange: string;
  timeline: string;
  message: string;
  referralSource: string;
  servicesRequired: string; // JSON string array
  existingWebsite: string;
  competitors: string;
  status: 'new' | 'contacted' | 'qualified' | 'proposal' | 'won' | 'lost';
  notes?: LeadNote[];
  createdAt: string;
  updatedAt: string;
}

export interface MediaItem {
  id: string;
  name: string;
  url: string;
  mimeType: string;
  sizeBytes: number;
  createdAt: string;
}

export interface SiteSettings {
  id: string;
  agencyName: string;
  tagline: string;
  logoUrl: string;
  email: string;
  phone: string;
  whatsapp: string;
  address: string;
  socialLinks: string; // JSON string
  footerText: string;
  copyrightText: string;
  primaryCtaText: string;
  primaryCtaLink?: string;
  defaultSeoTitle: string;
  defaultSeoDesc: string;
  defaultOgImage: string;
  analyticsId: string;
  updatedAt: string;
}

export interface NavigationItem {
  id: string;
  label: string;
  url: string;
  isVisible: boolean;
  displayOrder: number;
  isCta: boolean;
}

export interface AdminStats {
  totalProjects: number;
  publishedProjects: number;
  servicesCount: number;
  blogCount: number;
  leadsTotal: number;
  newLeads: number;
  teamCount: number;
  testimonialsCount: number;
}
