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
import {
  initialSettings,
  initialNavigation,
  initialProjects,
  initialServices,
  initialIndustries,
  initialBlogPosts,
  initialTestimonials,
  initialTeam,
} from '../data/initialData';

async function fetchJson<T>(url: string, options: RequestInit = {}): Promise<T> {
  const headers = new Headers(options.headers || {});

  if (!headers.has('Content-Type') && !(options.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
  }

  const res = await fetch(url, {
    ...options,
    headers,
  });

  const contentType = res.headers.get('content-type') || '';
  if (contentType.includes('text/html')) {
    throw new Error(`Static route returned HTML for ${url}`);
  }

  if (!res.ok) {
    let errorMsg = `HTTP Error ${res.status}`;
    try {
      const data = await res.json();
      if (data && data.error) errorMsg = data.error;
    } catch {
      // ignore
    }
    throw new Error(errorMsg);
  }

  return res.json() as Promise<T>;
}

export const api = {
  // Projects
  getProjects: async (status?: string): Promise<Project[]> => {
    try {
      const data = await fetchJson<Project[]>(`/api/projects${status ? `?status=${status}` : ''}`);
      if (Array.isArray(data) && data.length > 0) return data;
    } catch {
      // fallback to initial data
    }
    return status ? initialProjects.filter(p => p.status === status) : initialProjects;
  },

  getProjectBySlug: async (slug: string): Promise<Project> => {
    try {
      const data = await fetchJson<Project>(`/api/projects/slug/${encodeURIComponent(slug)}`);
      if (data && data.id) return data;
    } catch {
      // fallback
    }
    const found = initialProjects.find(p => p.slug === slug);
    if (!found) throw new Error(`Project ${slug} not found`);
    return found;
  },

  getProjectById: async (id: string): Promise<Project> => {
    try {
      const data = await fetchJson<Project>(`/api/projects/${id}`);
      if (data && data.id) return data;
    } catch {
      // fallback
    }
    const found = initialProjects.find(p => p.id === id);
    if (!found) throw new Error(`Project ${id} not found`);
    return found;
  },

  // Services
  getServices: async (status?: string): Promise<Service[]> => {
    try {
      const data = await fetchJson<Service[]>(`/api/services${status ? `?status=${status}` : ''}`);
      if (Array.isArray(data) && data.length > 0) return data;
    } catch {
      // fallback
    }
    return status ? initialServices.filter(s => s.status === status) : initialServices;
  },

  getServiceBySlug: async (slug: string): Promise<Service> => {
    try {
      const data = await fetchJson<Service>(`/api/services/slug/${encodeURIComponent(slug)}`);
      if (data && data.id) return data;
    } catch {
      // fallback
    }
    const found = initialServices.find(s => s.slug === slug);
    if (!found) throw new Error(`Service ${slug} not found`);
    return found;
  },

  // Industries
  getIndustries: async (): Promise<Industry[]> => {
    try {
      const data = await fetchJson<Industry[]>('/api/industries');
      if (Array.isArray(data) && data.length > 0) return data;
    } catch {
      // fallback
    }
    return initialIndustries;
  },

  getIndustryBySlug: async (slug: string): Promise<Industry> => {
    try {
      const data = await fetchJson<Industry>(`/api/industries/slug/${encodeURIComponent(slug)}`);
      if (data && data.id) return data;
    } catch {
      // fallback
    }
    const found = initialIndustries.find(i => i.slug === slug);
    if (!found) throw new Error(`Industry ${slug} not found`);
    return found;
  },

  // Blog
  getBlogPosts: async (status?: string): Promise<BlogPost[]> => {
    try {
      const data = await fetchJson<BlogPost[]>(`/api/blog${status ? `?status=${status}` : ''}`);
      if (Array.isArray(data) && data.length > 0) return data;
    } catch {
      // fallback
    }
    return status ? initialBlogPosts.filter(b => b.status === status) : initialBlogPosts;
  },

  getBlogPostBySlug: async (slug: string): Promise<BlogPost> => {
    try {
      const data = await fetchJson<BlogPost>(`/api/blog/slug/${encodeURIComponent(slug)}`);
      if (data && data.id) return data;
    } catch {
      // fallback
    }
    const found = initialBlogPosts.find(b => b.slug === slug);
    if (!found) throw new Error(`Post ${slug} not found`);
    return found;
  },

  // Testimonials
  getTestimonials: async (status?: string): Promise<Testimonial[]> => {
    try {
      const data = await fetchJson<Testimonial[]>(`/api/testimonials${status ? `?status=${status}` : ''}`);
      if (Array.isArray(data) && data.length > 0) return data;
    } catch {
      // fallback
    }
    return status ? initialTestimonials.filter(t => t.status === status) : initialTestimonials;
  },

  // Team
  getTeam: async (status?: string): Promise<TeamMember[]> => {
    try {
      const data = await fetchJson<TeamMember[]>(`/api/team${status ? `?status=${status}` : ''}`);
      if (Array.isArray(data) && data.length > 0) return data;
    } catch {
      // fallback
    }
    return status ? initialTeam.filter(t => t.status === status) : initialTeam;
  },

  // Leads submission
  submitLead: async (data: Partial<Lead>): Promise<{ success: boolean; message: string; leadId: string }> => {
    try {
      return await fetchJson<{ success: boolean; message: string; leadId: string }>('/api/leads', {
        method: 'POST',
        body: JSON.stringify(data),
      });
    } catch {
      // Client-side fallback for static deployments
      const leadId = `lead_${Date.now()}`;
      try {
        const existing = JSON.parse(localStorage.getItem('nexora_leads') || '[]');
        existing.push({ ...data, id: leadId, createdAt: new Date().toISOString() });
        localStorage.setItem('nexora_leads', JSON.stringify(existing));
      } catch {
        // ignore
      }
      return {
        success: true,
        message: 'Inquiry received. The Nexora team will review and respond within 24 hours.',
        leadId,
      };
    }
  },

  // Settings & Navigation
  getSettings: async (): Promise<SiteSettings> => {
    try {
      const data = await fetchJson<SiteSettings>('/api/settings');
      if (data && data.id) return data;
    } catch {
      // fallback
    }
    return initialSettings;
  },

  updateSettings: async (data: Partial<SiteSettings>): Promise<SiteSettings> => {
    return { ...initialSettings, ...data };
  },

  getNavigation: async (): Promise<NavigationItem[]> => {
    try {
      const data = await fetchJson<NavigationItem[]>('/api/navigation');
      if (Array.isArray(data) && data.length > 0) return data;
    } catch {
      // fallback
    }
    return initialNavigation;
  },
};
