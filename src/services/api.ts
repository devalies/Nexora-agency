import {
  Project,
  Service,
  Industry,
  BlogPost,
  Testimonial,
  TeamMember,
  Lead,
  SiteSettings,
  NavigationItem,
} from '../types';

async function fetchJson<T>(url: string, options: RequestInit = {}): Promise<T> {
  const headers = new Headers(options.headers || {});

  if (!headers.has('Content-Type') && !(options.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
  }

  const res = await fetch(url, {
    ...options,
    headers,
  });

  if (!res.ok) {
    let errorMsg = `HTTP Error ${res.status}`;
    try {
      const data = await res.json();
      if (data.error) errorMsg = data.error;
    } catch {
      // ignore
    }
    throw new Error(errorMsg);
  }

  return res.json() as Promise<T>;
}

export const api = {
  // Projects
  getProjects: (status?: string) =>
    fetchJson<Project[]>(`/api/projects${status ? `?status=${status}` : ''}`),

  getProjectBySlug: (slug: string) =>
    fetchJson<Project>(`/api/projects/slug/${encodeURIComponent(slug)}`),

  getProjectById: (id: string) =>
    fetchJson<Project>(`/api/projects/${id}`),

  // Services
  getServices: (status?: string) =>
    fetchJson<Service[]>(`/api/services${status ? `?status=${status}` : ''}`),

  getServiceBySlug: (slug: string) =>
    fetchJson<Service>(`/api/services/slug/${encodeURIComponent(slug)}`),

  // Industries
  getIndustries: () => fetchJson<Industry[]>('/api/industries'),

  getIndustryBySlug: (slug: string) =>
    fetchJson<Industry>(`/api/industries/slug/${encodeURIComponent(slug)}`),

  // Blog
  getBlogPosts: (status?: string) =>
    fetchJson<BlogPost[]>(`/api/blog${status ? `?status=${status}` : ''}`),

  getBlogPostBySlug: (slug: string) =>
    fetchJson<BlogPost>(`/api/blog/slug/${encodeURIComponent(slug)}`),

  // Testimonials
  getTestimonials: (status?: string) =>
    fetchJson<Testimonial[]>(`/api/testimonials${status ? `?status=${status}` : ''}`),

  // Team
  getTeam: (status?: string) =>
    fetchJson<TeamMember[]>(`/api/team${status ? `?status=${status}` : ''}`),

  // Leads submission
  submitLead: (data: Partial<Lead>) =>
    fetchJson<{ success: boolean; message: string; leadId: string }>('/api/leads', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  // Settings & Navigation
  getSettings: () => fetchJson<SiteSettings>('/api/settings'),

  updateSettings: async (data: Partial<SiteSettings>): Promise<SiteSettings> => {
    // Local / client-side update
    return data as SiteSettings;
  },

  getNavigation: () => fetchJson<NavigationItem[]>('/api/navigation'),
};
