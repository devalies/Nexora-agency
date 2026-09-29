import express, { Request, Response } from 'express';
import { db } from '../db';

export const apiRouter = express.Router();

// ==========================================
// 1. PROJECTS / PORTFOLIO
// ==========================================
apiRouter.get('/projects', (req: Request, res: Response) => {
  const status = req.query.status as string | undefined;
  const projects = db.getProjects(status);
  res.json(projects);
});

apiRouter.get('/projects/slug/:slug', (req: Request, res: Response) => {
  const project = db.getProjectBySlug(req.params.slug);
  if (!project) {
    res.status(404).json({ error: 'Project not found' });
    return;
  }
  res.json(project);
});

apiRouter.get('/projects/:id', (req: Request, res: Response) => {
  const project = db.getProjectById(req.params.id);
  if (!project) {
    res.status(404).json({ error: 'Project not found' });
    return;
  }
  res.json(project);
});

// ==========================================
// 2. SERVICES
// ==========================================
apiRouter.get('/services', (req: Request, res: Response) => {
  const status = req.query.status as string | undefined;
  const services = db.getServices(status);
  res.json(services);
});

apiRouter.get('/services/slug/:slug', (req: Request, res: Response) => {
  const service = db.getServiceBySlug(req.params.slug);
  if (!service) {
    res.status(404).json({ error: 'Service not found' });
    return;
  }
  res.json(service);
});

// ==========================================
// 3. INDUSTRIES
// ==========================================
apiRouter.get('/industries', (_req: Request, res: Response) => {
  const industries = db.getIndustries();
  res.json(industries);
});

apiRouter.get('/industries/slug/:slug', (req: Request, res: Response) => {
  const industry = db.getIndustryBySlug(req.params.slug);
  if (!industry) {
    res.status(404).json({ error: 'Industry not found' });
    return;
  }
  res.json(industry);
});

// ==========================================
// 4. BLOG / INSIGHTS
// ==========================================
apiRouter.get('/blog', (req: Request, res: Response) => {
  const status = req.query.status as string | undefined;
  const posts = db.getBlogPosts(status);
  res.json(posts);
});

apiRouter.get('/blog/slug/:slug', (req: Request, res: Response) => {
  const post = db.getBlogPostBySlug(req.params.slug);
  if (!post) {
    res.status(404).json({ error: 'Post not found' });
    return;
  }
  res.json(post);
});

// ==========================================
// 5. TESTIMONIALS
// ==========================================
apiRouter.get('/testimonials', (req: Request, res: Response) => {
  const status = req.query.status as string | undefined;
  const testimonials = db.getTestimonials(status);
  res.json(testimonials);
});

// ==========================================
// 6. TEAM MEMBERS
// ==========================================
apiRouter.get('/team', (req: Request, res: Response) => {
  const status = req.query.status as string | undefined;
  const team = db.getTeamMembers(status);
  res.json(team);
});

// ==========================================
// 7. LEADS & CONTACT INQUIRIES
// ==========================================
apiRouter.post('/leads', (req: Request, res: Response) => {
  try {
    const { name, email } = req.body;
    if (!name || !email) {
      res.status(400).json({ error: 'Name and email are required' });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      res.status(400).json({ error: 'Please provide a valid email address' });
      return;
    }

    const lead = db.createLead(req.body);

    console.log(`[LEAD NOTIFICATION] New inquiry from ${name} (${email}) for ${req.body.projectType || 'Project'}`);

    res.status(201).json({
      success: true,
      message: 'Inquiry received. The Nexora team will review and respond within 24 hours.',
      leadId: lead.id,
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// ==========================================
// 8. SITE SETTINGS & NAVIGATION
// ==========================================
apiRouter.get('/settings', (_req: Request, res: Response) => {
  const settings = db.getSiteSettings();
  res.json(settings);
});

apiRouter.get('/navigation', (_req: Request, res: Response) => {
  const items = db.getNavigationItems();
  res.json(items);
});
