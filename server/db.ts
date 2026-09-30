import fs from 'node:fs';
import path from 'node:path';
import bcrypt from 'bcryptjs';

// Setup database directory
const DATA_DIR = path.resolve(process.cwd(), 'data');
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const DB_PATH = path.join(DATA_DIR, 'nexora.db');
const JSON_FALLBACK_PATH = path.join(DATA_DIR, 'nexora_store.json');

// Interface types
export interface User {
  id: string;
  email: string;
  passwordHash: string;
  name: string;
  role: string;
  createdAt: string;
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
  results: string; // JSON array of string metrics
  technologies: string; // JSON array of string tags
  projectUrl: string;
  coverImage: string;
  galleryImages: string; // JSON array of string URLs
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
  benefits: string; // JSON array
  processSteps: string; // JSON array
  relatedProjectIds: string; // JSON array
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
  relatedProjectIds: string; // JSON array
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
  tags: string; // JSON array
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
  servicesRequired: string; // JSON array
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
  socialLinks: string; // JSON
  footerText: string;
  copyrightText: string;
  primaryCtaText: string;
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

// Database Store Class with SQLite native driver + robust JSON replication
class DatabaseStore {
  private db: any = null;
  private memoryStore: Record<string, any[]> = {
    users: [],
    projects: [],
    services: [],
    industries: [],
    blogPosts: [],
    testimonials: [],
    teamMembers: [],
    leads: [],
    leadNotes: [],
    media: [],
    siteSettings: [],
    navigationItems: [],
  };

  constructor() {
    this.init();
  }

  private init() {
    try {
      // Attempt to load node:sqlite
      const sqlite = require('node:sqlite');
      if (sqlite && sqlite.DatabaseSync) {
        this.db = new sqlite.DatabaseSync(DB_PATH);
        this.db.exec('PRAGMA journal_mode = WAL;');
        this.db.exec('PRAGMA foreign_keys = ON;');
        this.createTablesSqlite();
        this.syncFromSqliteOrSeed();
        console.log('[DB] Initialized with persistent node:sqlite at', DB_PATH);
        return;
      }
    } catch (e: any) {
      console.warn('[DB] node:sqlite warning, using structured JSON store:', e?.message);
    }

    // Fallback JSON persistence
    if (fs.existsSync(JSON_FALLBACK_PATH)) {
      try {
        const raw = fs.readFileSync(JSON_FALLBACK_PATH, 'utf-8');
        this.memoryStore = JSON.parse(raw);
        console.log('[DB] Loaded from persistent JSON store');
      } catch (err) {
        console.error('[DB] Failed reading fallback JSON, will reseed');
        this.seedInitialData();
      }
    } else {
      this.seedInitialData();
    }
  }

  private createTablesSqlite() {
    if (!this.db) return;
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        passwordHash TEXT NOT NULL,
        name TEXT NOT NULL,
        role TEXT NOT NULL DEFAULT 'admin',
        createdAt TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS projects (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        slug TEXT UNIQUE NOT NULL,
        clientName TEXT NOT NULL,
        industry TEXT NOT NULL,
        projectType TEXT NOT NULL,
        shortDesc TEXT NOT NULL,
        fullCaseStudy TEXT NOT NULL,
        challenge TEXT NOT NULL,
        solution TEXT NOT NULL,
        results TEXT NOT NULL,
        technologies TEXT NOT NULL,
        projectUrl TEXT NOT NULL,
        coverImage TEXT NOT NULL,
        galleryImages TEXT NOT NULL,
        isFeatured INTEGER NOT NULL DEFAULT 0,
        isConcept INTEGER NOT NULL DEFAULT 1,
        status TEXT NOT NULL DEFAULT 'published',
        seoTitle TEXT NOT NULL,
        seoDescription TEXT NOT NULL,
        displayOrder INTEGER NOT NULL DEFAULT 0,
        createdAt TEXT NOT NULL,
        updatedAt TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS services (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        slug TEXT UNIQUE NOT NULL,
        shortDesc TEXT NOT NULL,
        fullDesc TEXT NOT NULL,
        icon TEXT NOT NULL,
        featuredImage TEXT NOT NULL,
        benefits TEXT NOT NULL,
        processSteps TEXT NOT NULL,
        relatedProjectIds TEXT NOT NULL,
        seoTitle TEXT NOT NULL,
        seoDescription TEXT NOT NULL,
        status TEXT NOT NULL DEFAULT 'published',
        displayOrder INTEGER NOT NULL DEFAULT 0,
        createdAt TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS industries (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        slug TEXT UNIQUE NOT NULL,
        description TEXT NOT NULL,
        image TEXT NOT NULL,
        relatedProjectIds TEXT NOT NULL,
        seoTitle TEXT NOT NULL,
        seoDescription TEXT NOT NULL,
        displayOrder INTEGER NOT NULL DEFAULT 0,
        createdAt TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS blog_posts (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        slug TEXT UNIQUE NOT NULL,
        excerpt TEXT NOT NULL,
        content TEXT NOT NULL,
        category TEXT NOT NULL,
        tags TEXT NOT NULL,
        coverImage TEXT NOT NULL,
        authorName TEXT NOT NULL,
        authorRole TEXT NOT NULL,
        readTime TEXT NOT NULL,
        status TEXT NOT NULL DEFAULT 'published',
        seoTitle TEXT NOT NULL,
        seoDescription TEXT NOT NULL,
        publishedAt TEXT NOT NULL,
        createdAt TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS testimonials (
        id TEXT PRIMARY KEY,
        clientName TEXT NOT NULL,
        position TEXT NOT NULL,
        company TEXT NOT NULL,
        photo TEXT NOT NULL,
        quote TEXT NOT NULL,
        rating INTEGER NOT NULL DEFAULT 5,
        projectTitle TEXT NOT NULL,
        isFeatured INTEGER NOT NULL DEFAULT 1,
        status TEXT NOT NULL DEFAULT 'published',
        displayOrder INTEGER NOT NULL DEFAULT 0,
        createdAt TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS team_members (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        position TEXT NOT NULL,
        bio TEXT NOT NULL,
        photo TEXT NOT NULL,
        linkedin TEXT NOT NULL,
        email TEXT NOT NULL,
        displayOrder INTEGER NOT NULL DEFAULT 0,
        status TEXT NOT NULL DEFAULT 'active',
        createdAt TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS leads (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        company TEXT NOT NULL,
        website TEXT NOT NULL,
        projectType TEXT NOT NULL,
        budgetRange TEXT NOT NULL,
        timeline TEXT NOT NULL,
        message TEXT NOT NULL,
        referralSource TEXT NOT NULL,
        servicesRequired TEXT NOT NULL,
        existingWebsite TEXT NOT NULL,
        competitors TEXT NOT NULL,
        status TEXT NOT NULL DEFAULT 'new',
        createdAt TEXT NOT NULL,
        updatedAt TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS lead_notes (
        id TEXT PRIMARY KEY,
        leadId TEXT NOT NULL,
        content TEXT NOT NULL,
        author TEXT NOT NULL,
        createdAt TEXT NOT NULL,
        FOREIGN KEY (leadId) REFERENCES leads(id) ON DELETE CASCADE
      );

      CREATE TABLE IF NOT EXISTS media (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        url TEXT NOT NULL,
        mimeType TEXT NOT NULL,
        sizeBytes INTEGER NOT NULL,
        createdAt TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS site_settings (
        id TEXT PRIMARY KEY,
        agencyName TEXT NOT NULL,
        tagline TEXT NOT NULL,
        logoUrl TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT NOT NULL,
        whatsapp TEXT NOT NULL,
        address TEXT NOT NULL,
        socialLinks TEXT NOT NULL,
        footerText TEXT NOT NULL,
        copyrightText TEXT NOT NULL,
        primaryCtaText TEXT NOT NULL,
        defaultSeoTitle TEXT NOT NULL,
        defaultSeoDesc TEXT NOT NULL,
        defaultOgImage TEXT NOT NULL,
        analyticsId TEXT NOT NULL,
        updatedAt TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS navigation_items (
        id TEXT PRIMARY KEY,
        label TEXT NOT NULL,
        url TEXT NOT NULL,
        isVisible INTEGER NOT NULL DEFAULT 1,
        displayOrder INTEGER NOT NULL DEFAULT 0,
        isCta INTEGER NOT NULL DEFAULT 0
      );
    `);
  }

  private syncFromSqliteOrSeed() {
    if (!this.db) return;
    const userCount = this.db.prepare('SELECT count(*) as count FROM users').get()?.count || 0;
    if (userCount === 0) {
      this.seedInitialData();
      this.writeMemoryStoreToSqlite();
    } else {
      this.loadMemoryStoreFromSqlite();
    }
  }

  private loadMemoryStoreFromSqlite() {
    if (!this.db) return;
    this.memoryStore.users = this.db.prepare('SELECT * FROM users').all();
    this.memoryStore.projects = this.db.prepare('SELECT * FROM projects ORDER BY displayOrder ASC').all().map((p: any) => ({
      ...p,
      isFeatured: Boolean(p.isFeatured),
      isConcept: Boolean(p.isConcept),
    }));
    this.memoryStore.services = this.db.prepare('SELECT * FROM services ORDER BY displayOrder ASC').all();
    this.memoryStore.industries = this.db.prepare('SELECT * FROM industries ORDER BY displayOrder ASC').all();
    this.memoryStore.blogPosts = this.db.prepare('SELECT * FROM blog_posts ORDER BY createdAt DESC').all();
    this.memoryStore.testimonials = this.db.prepare('SELECT * FROM testimonials ORDER BY displayOrder ASC').all().map((t: any) => ({
      ...t,
      isFeatured: Boolean(t.isFeatured),
    }));
    this.memoryStore.teamMembers = this.db.prepare('SELECT * FROM team_members ORDER BY displayOrder ASC').all();
    this.memoryStore.leads = this.db.prepare('SELECT * FROM leads ORDER BY createdAt DESC').all();
    this.memoryStore.leadNotes = this.db.prepare('SELECT * FROM lead_notes ORDER BY createdAt ASC').all();
    this.memoryStore.media = this.db.prepare('SELECT * FROM media ORDER BY createdAt DESC').all();
    this.memoryStore.siteSettings = this.db.prepare('SELECT * FROM site_settings').all();
    this.memoryStore.navigationItems = this.db.prepare('SELECT * FROM navigation_items ORDER BY displayOrder ASC').all().map((n: any) => ({
      ...n,
      isVisible: Boolean(n.isVisible),
      isCta: Boolean(n.isCta),
    }));
  }

  private writeMemoryStoreToSqlite() {
    if (!this.db) return;
    const insertUser = this.db.prepare('INSERT OR REPLACE INTO users VALUES (?, ?, ?, ?, ?, ?)');
    for (const u of this.memoryStore.users) {
      insertUser.run(u.id, u.email, u.passwordHash, u.name, u.role, u.createdAt);
    }

    const insertProject = this.db.prepare('INSERT OR REPLACE INTO projects VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
    for (const p of this.memoryStore.projects) {
      insertProject.run(
        p.id, p.title, p.slug, p.clientName, p.industry, p.projectType, p.shortDesc,
        p.fullCaseStudy, p.challenge, p.solution, p.results, p.technologies,
        p.projectUrl, p.coverImage, p.galleryImages, p.isFeatured ? 1 : 0,
        p.isConcept ? 1 : 0, p.status, p.seoTitle, p.seoDescription, p.displayOrder,
        p.createdAt, p.updatedAt
      );
    }

    const insertService = this.db.prepare('INSERT OR REPLACE INTO services VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
    for (const s of this.memoryStore.services) {
      insertService.run(
        s.id, s.title, s.slug, s.shortDesc, s.fullDesc, s.icon, s.featuredImage,
        s.benefits, s.processSteps, s.relatedProjectIds, s.seoTitle, s.seoDescription,
        s.status, s.displayOrder, s.createdAt
      );
    }

    const insertIndustry = this.db.prepare('INSERT OR REPLACE INTO industries VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
    for (const ind of this.memoryStore.industries) {
      insertIndustry.run(
        ind.id, ind.name, ind.slug, ind.description, ind.image, ind.relatedProjectIds,
        ind.seoTitle, ind.seoDescription, ind.displayOrder, ind.createdAt
      );
    }

    const insertBlog = this.db.prepare('INSERT OR REPLACE INTO blog_posts VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
    for (const b of this.memoryStore.blogPosts) {
      insertBlog.run(
        b.id, b.title, b.slug, b.excerpt, b.content, b.category, b.tags, b.coverImage,
        b.authorName, b.authorRole, b.readTime, b.status, b.seoTitle, b.seoDescription,
        b.publishedAt, b.createdAt
      );
    }

    const insertTestimonial = this.db.prepare('INSERT OR REPLACE INTO testimonials VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
    for (const t of this.memoryStore.testimonials) {
      insertTestimonial.run(
        t.id, t.clientName, t.position, t.company, t.photo, t.quote, t.rating,
        t.projectTitle, t.isFeatured ? 1 : 0, t.status, t.displayOrder, t.createdAt
      );
    }

    const insertTeam = this.db.prepare('INSERT OR REPLACE INTO team_members VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
    for (const tm of this.memoryStore.teamMembers) {
      insertTeam.run(
        tm.id, tm.name, tm.position, tm.bio, tm.photo, tm.linkedin, tm.email,
        tm.displayOrder, tm.status, tm.createdAt
      );
    }

    const insertLead = this.db.prepare('INSERT OR REPLACE INTO leads VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
    for (const l of this.memoryStore.leads) {
      insertLead.run(
        l.id, l.name, l.email, l.company, l.website, l.projectType, l.budgetRange,
        l.timeline, l.message, l.referralSource, l.servicesRequired, l.existingWebsite,
        l.competitors, l.status, l.createdAt, l.updatedAt
      );
    }

    const insertLeadNote = this.db.prepare('INSERT OR REPLACE INTO lead_notes VALUES (?, ?, ?, ?, ?)');
    for (const n of this.memoryStore.leadNotes) {
      insertLeadNote.run(n.id, n.leadId, n.content, n.author, n.createdAt);
    }

    const insertMedia = this.db.prepare('INSERT OR REPLACE INTO media VALUES (?, ?, ?, ?, ?, ?)');
    for (const m of this.memoryStore.media) {
      insertMedia.run(m.id, m.name, m.url, m.mimeType, m.sizeBytes, m.createdAt);
    }

    const insertSettings = this.db.prepare('INSERT OR REPLACE INTO site_settings VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
    for (const set of this.memoryStore.siteSettings) {
      insertSettings.run(
        set.id, set.agencyName, set.tagline, set.logoUrl, set.email, set.phone,
        set.whatsapp, set.address, set.socialLinks, set.footerText, set.copyrightText,
        set.primaryCtaText, set.defaultSeoTitle, set.defaultSeoDesc, set.defaultOgImage,
        set.analyticsId, set.updatedAt
      );
    }

    const insertNav = this.db.prepare('INSERT OR REPLACE INTO navigation_items VALUES (?, ?, ?, ?, ?, ?)');
    for (const nav of this.memoryStore.navigationItems) {
      insertNav.run(nav.id, nav.label, nav.url, nav.isVisible ? 1 : 0, nav.displayOrder, nav.isCta ? 1 : 0);
    }
  }

  private persist() {
    try {
      if (this.db) {
        this.writeMemoryStoreToSqlite();
      }
      fs.writeFileSync(JSON_FALLBACK_PATH, JSON.stringify(this.memoryStore, null, 2), 'utf-8');
    } catch (e: any) {
      console.error('[DB] Persist error:', e?.message);
    }
  }

  // --- Seed realistic agency content ---
  private seedInitialData() {
    const now = new Date().toISOString();

    // Default admin: admin@nexora.studio / nexora2026!
    const defaultPasswordHash = bcrypt.hashSync('nexora2026!', 10);

    this.memoryStore.users = [
      {
        id: 'user_1',
        email: 'admin@nexora.studio',
        passwordHash: defaultPasswordHash,
        name: 'Agency Principal',
        role: 'admin',
        createdAt: now,
      },
    ];

    // Seed media assets with our high-fidelity generated images
    this.memoryStore.media = [
      {
        id: 'media_1',
        name: 'Hero Agency Workspace',
        url: '/uploads/hero_nexora_showcase_1790138540390.jpg',
        mimeType: 'image/jpeg',
        sizeBytes: 606592,
        createdAt: now,
      },
      {
        id: 'media_2',
        name: 'Finora Fintech Showcase',
        url: '/uploads/project_finora_fintech_1790138552630.jpg',
        mimeType: 'image/jpeg',
        sizeBytes: 698407,
        createdAt: now,
      },
      {
        id: 'media_3',
        name: 'NordHaus Architectural Studio',
        url: '/uploads/project_nordhaus_arch_1790138566367.jpg',
        mimeType: 'image/jpeg',
        sizeBytes: 750287,
        createdAt: now,
      },
      {
        id: 'media_4',
        name: 'Veloce Luxury Chronograph Store',
        url: '/uploads/project_veloce_ecommerce_1790138578570.jpg',
        mimeType: 'image/jpeg',
        sizeBytes: 763026,
        createdAt: now,
      },
      {
        id: 'media_5',
        name: 'Cloudnest Infrastructure Platform',
        url: '/uploads/project_cloudnest_saas_1790138589878.jpg',
        mimeType: 'image/jpeg',
        sizeBytes: 693250,
        createdAt: now,
      },
    ];

    // Seed showcase projects (marked clearly as Concept Work / Studio Case Studies)
    this.memoryStore.projects = [
      {
        id: 'proj_1',
        title: 'Finora',
        slug: 'finora',
        clientName: 'Finora Capital (Concept)',
        industry: 'Fintech / SaaS',
        projectType: 'Website Design + Full-Stack Development',
        shortDesc: 'A high-trust web platform and dashboard experience designed for next-generation automated treasury and liquidity operations.',
        fullCaseStudy: `### The Challenge
Treasury infrastructure platforms often suffer from convoluted interfaces, dense jargon, and cognitive overload. Finora required an authoritative, high-clarity digital presence that communicates institutional security while maintaining the velocity and polish of modern product engineering.

### Our Approach
We deconstructed the core liquidity monitoring workflows, distilling institutional telemetry into a hierarchy of glanceable metrics, high-contrast tabular figures, and rapid-filter controls. The design language employs a calibrated slate palette with cobalt focus states, removing extraneous decorative widgets in favor of rigorous information architecture.

### The Engineering
Engineered with Next.js, TypeScript, and server-side cached API aggregation. The interactive calculator renders real-time scenario modeling with sub-millisecond DOM responsiveness, zero layout shift, and full keyboard navigation.`,
        challenge: 'Financial institutions demand uncompromising security and regulatory clarity without sacrificing onboarding velocity. Previous legacy interfaces suffered high abandonment rates.',
        solution: 'Designed an unboxed, content-first layout with high-legibility tabular figures, custom interactive fee simulators, and frictionless compliance pathways.',
        results: JSON.stringify([
          '+140% Qualified Inbound Inquiries',
          '0.42s Average First Contentful Paint',
          '99.98% Platform Onboarding Completion'
        ]),
        technologies: JSON.stringify(['React', 'TypeScript', 'Tailwind CSS', 'PostgreSQL', 'Framer Motion']),
        projectUrl: 'https://finora-preview.nexora.studio',
        coverImage: '/uploads/project_finora_fintech_1790138552630.jpg',
        galleryImages: JSON.stringify([
          '/uploads/project_finora_fintech_1790138552630.jpg',
          '/uploads/hero_nexora_showcase_1790138540390.jpg'
        ]),
        isFeatured: true,
        isConcept: true,
        status: 'published',
        seoTitle: 'Finora — Fintech Platform Design & Engineering Case Study | Nexora',
        seoDescription: 'Case study: How Nexora architected a high-trust digital web experience and liquidity management interface for Finora.',
        displayOrder: 1,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: 'proj_2',
        title: 'NordHaus',
        slug: 'nordhaus',
        clientName: 'NordHaus Architecture (Concept)',
        industry: 'Architecture / Real Estate',
        projectType: 'Brand Identity + Editorial Web Experience',
        shortDesc: 'Monolithic digital portfolio and inquiry portal for an international architectural practice specializing in sustainable timber residences.',
        fullCaseStudy: `### The Challenge
NordHaus needed a digital showcase that honors the physical tactile restraint of their Scandinavian timber architecture. Traditional commercial real estate templates felt cluttered, noisy, and transactional.

### Our Approach
We developed a generous editorial grid with cinematic full-bleed imagery, typographic airiness, and an understated monochromatic palette. The interface behaves like an archival art monograph: silent transitions, deliberate whitespace, and structured project specifications.

### The Engineering
Optimized responsive asset delivery with modern responsive picture standards, client-side prefetching on link hover, and an accessible interactive blueprint viewer.`,
        challenge: 'Presenting high-resolution architectural photography and technical CAD drawings across mobile and desktop without degrading page speed or visual fidelity.',
        solution: 'Monochrome minimalist spatial architecture with dynamic aspect-ratio image preservation and interactive structural schematics.',
        results: JSON.stringify([
          '100/100 Core Web Vitals Performance',
          '3.2x Increase in Qualified Studio Inquiries',
          'Award of Digital Architectural Excellence'
        ]),
        technologies: JSON.stringify(['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Vercel Edge']),
        projectUrl: 'https://nordhaus-preview.nexora.studio',
        coverImage: '/uploads/project_nordhaus_arch_1790138566367.jpg',
        galleryImages: JSON.stringify([
          '/uploads/project_nordhaus_arch_1790138566367.jpg',
          '/uploads/hero_nexora_showcase_1790138540390.jpg'
        ]),
        isFeatured: true,
        isConcept: true,
        status: 'published',
        seoTitle: 'NordHaus — Architectural Studio Brand & Web Experience | Nexora',
        seoDescription: 'Discover how Nexora built an editorial digital presence and project archive for NordHaus architectural studio.',
        displayOrder: 2,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: 'proj_3',
        title: 'Veloce',
        slug: 'veloce',
        clientName: 'Veloce Horology (Concept)',
        industry: 'E-commerce',
        projectType: 'Custom Shopify + Precision UX/UI',
        shortDesc: 'A high-converting direct-to-consumer digital flagship for limited-run precision chronograph timepieces.',
        fullCaseStudy: `### The Challenge
High-ticket luxury watches require intense sensory storytelling and immediate credibility. Typical generic Shopify themes fail to communicate horological craftsmanship and precision engineering.

### Our Approach
We crafted an intentional dark luxury aesthetic with micro-level material close-ups, interactive caliber specification breakdowns, and an unhurried, frictionless checkout flow that respects the connoisseur's buying journey.

### The Engineering
Custom Headless Shopify implementation with server-rendered product matrices, live inventory verification, and localized international multi-currency settlement.`,
        challenge: 'Bridging physical luxury watchmaking with digital touchpoints while preserving rapid checkout conversion rates.',
        solution: 'Custom headless storefront featuring componentized watch caliber breakdowns, titanium texture galleries, and frictionless checkout.',
        results: JSON.stringify([
          '+68% Average Order Value',
          '1.8s Global Mobile Checkout Velocity',
          '42% Reduction in Cart Abandonment'
        ]),
        technologies: JSON.stringify(['Shopify Storefront API', 'React', 'TypeScript', 'Tailwind CSS']),
        projectUrl: 'https://veloce-preview.nexora.studio',
        coverImage: '/uploads/project_veloce_ecommerce_1790138578570.jpg',
        galleryImages: JSON.stringify([
          '/uploads/project_veloce_ecommerce_1790138578570.jpg'
        ]),
        isFeatured: true,
        isConcept: true,
        status: 'published',
        seoTitle: 'Veloce — Luxury Horology Headless E-commerce | Nexora',
        seoDescription: 'Case study: How Nexora developed a precision e-commerce platform and digital flagship for Veloce chronographs.',
        displayOrder: 3,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: 'proj_4',
        title: 'Cloudnest',
        slug: 'cloudnest',
        clientName: 'Cloudnest Systems (Concept)',
        industry: 'SaaS',
        projectType: 'Web Design + Product UI & Design System',
        shortDesc: 'Enterprise web marketing presence and multi-tenant developer console for cloud container deployments.',
        fullCaseStudy: `### The Challenge
Developers and DevOps architects are allergic to generic SaaS hype. Cloudnest required an interface that speaks directly to technical practitioners: real terminal telemetry, clear architectural diagrams, and transparent pricing.

### Our Approach
We built a unified design system centered on high-density data tables, monospaced logs, and effortless keyboard navigation. The public marketing site flows naturally into the live web application without visual disconnect.

### The Engineering
Full-stack architecture featuring real-time cluster telemetry, modular dashboard component library, and strict type safety across client and server boundaries.`,
        challenge: 'Communicating complex distributed infrastructure capabilities to engineering leaders without marketing fluff.',
        solution: 'Technical editorial design with interactive topology mapping, live latency monitors, and transparent self-host vs managed tiers.',
        results: JSON.stringify([
          '4.6x Growth in Self-Serve Developer Signups',
          'Sub-200ms Search Across Multi-Cluster Logs',
          'Zero-Dependency Design System'
        ]),
        technologies: JSON.stringify(['React', 'TypeScript', 'Node.js', 'Tailwind CSS', 'PostgreSQL']),
        projectUrl: 'https://cloudnest-preview.nexora.studio',
        coverImage: '/uploads/project_cloudnest_saas_1790138589878.jpg',
        galleryImages: JSON.stringify([
          '/uploads/project_cloudnest_saas_1790138589878.jpg'
        ]),
        isFeatured: true,
        isConcept: true,
        status: 'published',
        seoTitle: 'Cloudnest — Developer Infrastructure Platform & UI | Nexora',
        seoDescription: 'Case study: Designing an engineering-first SaaS platform, web architecture, and design system for Cloudnest.',
        displayOrder: 4,
        createdAt: now,
        updatedAt: now,
      },
    ];

    // Seed Services
    this.memoryStore.services = [
      {
        id: 'serv_1',
        title: 'Website Design & Development',
        slug: 'website-design-development',
        shortDesc: 'Business websites, corporate platforms, landing pages, and high-performing digital experiences engineered for conversion.',
        fullDesc: 'We architect and build tailored web experiences that balance aesthetic distinction with technical precision. Every site is built from first principles with responsive layouts, clean semantic HTML, and rapid load times.',
        icon: 'Layout',
        featuredImage: '/uploads/hero_nexora_showcase_1790138540390.jpg',
        benefits: JSON.stringify([
          'Bespoke visual identity tailored to your market positioning',
          'Flawless responsive execution from mobile screens to 4K displays',
          'High performance: 90+ Google PageSpeed benchmarks guaranteed',
          'Integrated CMS so your team updates copy without engineering dependencies',
          'Accessibility (WCAG AA) and robust technical SEO baked into every line'
        ]),
        processSteps: JSON.stringify([
          'Strategic discovery & wireframe architecture',
          'High-fidelity interactive prototype design',
          'Full-stack TypeScript development & CMS integration',
          'Rigorous QA, cross-browser audits, and production launch'
        ]),
        relatedProjectIds: JSON.stringify(['proj_1', 'proj_2']),
        seoTitle: 'Website Design & Development Services | Nexora Studio',
        seoDescription: 'Custom website design and full-stack development for ambitious businesses. Built for speed, search visibility, and conversion.',
        status: 'published',
        displayOrder: 1,
        createdAt: now,
      },
      {
        id: 'serv_2',
        title: 'E-commerce Development',
        slug: 'ecommerce-development',
        shortDesc: 'Custom Shopify, headless commerce, and high-converting retail experiences designed around usability and frictionless checkout.',
        fullDesc: 'We turn digital storefronts into high-velocity sales engines. From custom theme engineering to headless Shopify and WooCommerce architectures, we prioritize buyer velocity, mobile checkout ergonomics, and inventory clarity.',
        icon: 'ShoppingBag',
        featuredImage: '/uploads/project_veloce_ecommerce_1790138578570.jpg',
        benefits: JSON.stringify([
          'Optimized checkout flows reducing cart abandonment',
          'Lightning-fast catalog browsing with instant faceted filtering',
          'Custom third-party ERP, CRM, and fulfillment integrations',
          'Multi-currency, localized tax, and international settlement setup',
          'Mobile-first touch targets and sticky buy-bar ergonomics'
        ]),
        processSteps: JSON.stringify([
          'Commerce architecture audit & inventory modeling',
          'Conversion-centered UX & custom cart interactions',
          'Shopify API / Headless integration & payment gateway setup',
          'Conversion testing, load testing, and go-live'
        ]),
        relatedProjectIds: JSON.stringify(['proj_3']),
        seoTitle: 'Custom E-commerce Development & Shopify Specialists | Nexora',
        seoDescription: 'High-converting custom e-commerce experiences and headless storefronts built for modern retail brands.',
        status: 'published',
        displayOrder: 2,
        createdAt: now,
      },
      {
        id: 'serv_3',
        title: 'UI/UX & Product Design',
        slug: 'ui-ux-product-design',
        shortDesc: 'User research, wireframing, component design systems, and intuitive interfaces for digital products and platforms.',
        fullDesc: 'We eliminate interface friction. Through deep workflow analysis, customer interviewing, and systematic interface design, we craft software experiences that feel immediately understandable and rewarding to use.',
        icon: 'Layers',
        featuredImage: '/uploads/project_finora_fintech_1790138552630.jpg',
        benefits: JSON.stringify([
          'Comprehensive Figma design systems with reusable tokens',
          'Rapid interactive prototyping for stakeholder validation',
          'Drastic reduction in user training requirements and support tickets',
          'Clear visual hierarchy with zero decorative clutter',
          'Seamless handoff documentation for internal engineering squads'
        ]),
        processSteps: JSON.stringify([
          'User journey mapping & cognitive task analysis',
          'Low-fidelity structural wireframes & validation',
          'Design tokenization & full component library creation',
          'Usability testing & developer documentation handoff'
        ]),
        relatedProjectIds: JSON.stringify(['proj_1', 'proj_4']),
        seoTitle: 'UI/UX & Product Design Agency | Nexora Studio',
        seoDescription: 'User research, interactive prototypes, and production-ready design systems for SaaS platforms and digital products.',
        status: 'published',
        displayOrder: 3,
        createdAt: now,
      },
      {
        id: 'serv_4',
        title: 'Branding & Visual Design',
        slug: 'branding-visual-design',
        shortDesc: 'Brand identity systems, typography, color palettes, visual guidelines, and digital brand experiences that endure.',
        fullDesc: 'Your brand is the sum of every interaction. We craft cohesive visual identities that establish instant credibility and command premium market positioning, from wordmark typography to digital design standards.',
        icon: 'Sparkles',
        featuredImage: '/uploads/project_nordhaus_arch_1790138566367.jpg',
        benefits: JSON.stringify([
          'Distinctive logo mark and custom typography styling',
          'Defined color palettes with WCAG-compliant contrast ratios',
          'Complete brand book specifying digital and physical usage rules',
          'Social media kits, pitch decks, and digital collateral',
          'Consistent visual identity across every customer touchpoint'
        ]),
        processSteps: JSON.stringify([
          'Brand positioning & competitor visual audit',
          'Identity exploration & typographic pairing concepts',
          'Refinement of selected direction into a comprehensive system',
          'Delivery of vector asset suites & living brand documentation'
        ]),
        relatedProjectIds: JSON.stringify(['proj_2']),
        seoTitle: 'Brand Identity & Visual Design for Ambitious Companies | Nexora',
        seoDescription: 'Strategic branding, wordmarks, visual identities, and design guidelines for startups and evolving businesses.',
        status: 'published',
        displayOrder: 4,
        createdAt: now,
      },
      {
        id: 'serv_5',
        title: 'SaaS & Web Applications',
        slug: 'saas-web-applications',
        shortDesc: 'Modern responsive interfaces and custom full-stack web applications engineered for scalability and reliability.',
        fullDesc: 'We build web software that solves real business problems. From customer portals and administrative consoles to full-scale SaaS platforms, our engineering team delivers clean TypeScript codebases built on modern stacks.',
        icon: 'Code2',
        featuredImage: '/uploads/project_cloudnest_saas_1790138589878.jpg',
        benefits: JSON.stringify([
          'Modern React and TypeScript stack with high maintainability',
          'Robust relational database schema design with transactional safety',
          'Role-based access control and secure authentication workflows',
          'Modular component architecture ready for continuous feature expansion',
          'Continuous integration and automated deployment pipelines'
        ]),
        processSteps: JSON.stringify([
          'Technical architecture definition & data schema modeling',
          'API design & frontend component scaffolding',
          'Authentication, business logic, and security hardening',
          'Automated testing, load verification, and cloud deployment'
        ]),
        relatedProjectIds: JSON.stringify(['proj_1', 'proj_4']),
        seoTitle: 'Custom SaaS & Web Application Development | Nexora',
        seoDescription: 'Full-stack web application development in React, TypeScript, and modern backend architectures.',
        status: 'published',
        displayOrder: 5,
        createdAt: now,
      },
      {
        id: 'serv_6',
        title: 'SEO & Digital Growth',
        slug: 'seo-digital-growth',
        shortDesc: 'Technical SEO, Core Web Vitals optimization, structured data, and conversion rate enhancement.',
        fullDesc: 'Building a beautiful website is only half the battle. We optimize every structural element so search engines discover, crawl, and rank your content, converting organic visitors into qualified inbound business inquiries.',
        icon: 'TrendingUp',
        featuredImage: '/uploads/hero_nexora_showcase_1790138540390.jpg',
        benefits: JSON.stringify([
          'Complete technical audit resolving crawl issues and indexing bottlenecks',
          'Core Web Vitals remediation targeting sub-second load times',
          'Schema.org structured data for rich snippets in Google search results',
          'Search-intent keyword mapping and content strategy advisory',
          'Clean conversion tracking setup without privacy-invasive scripts'
        ]),
        processSteps: JSON.stringify([
          'Full-site technical SEO & performance diagnostic',
          'Semantic markup, canonical URLs, and schema integration',
          'Server-side asset caching & payload compression',
          'Monthly ranking monitoring & technical maintenance'
        ]),
        relatedProjectIds: JSON.stringify(['proj_1', 'proj_3']),
        seoTitle: 'Technical SEO & Digital Growth Services | Nexora Studio',
        seoDescription: 'Technical search engine optimization, page speed enhancements, and organic acquisition architecture for growth businesses.',
        status: 'published',
        displayOrder: 6,
        createdAt: now,
      },
    ];

    // Seed Industries
    this.memoryStore.industries = [
      {
        id: 'ind_1',
        name: 'SaaS & Technology',
        slug: 'saas-technology',
        description: 'Developer tools, enterprise software, and cloud applications requiring clear value propositions and low-friction onboarding.',
        image: '/uploads/project_cloudnest_saas_1790138589878.jpg',
        relatedProjectIds: JSON.stringify(['proj_1', 'proj_4']),
        seoTitle: 'SaaS & Technology Web Design | Nexora Studio',
        seoDescription: 'Web design and front-end development tailored for SaaS, developer platforms, and cloud infrastructure companies.',
        displayOrder: 1,
        createdAt: now,
      },
      {
        id: 'ind_2',
        name: 'E-commerce & Retail',
        slug: 'ecommerce-retail',
        description: 'Direct-to-consumer lifestyle brands, specialty retailers, and high-ticket catalog experiences built for conversion.',
        image: '/uploads/project_veloce_ecommerce_1790138578570.jpg',
        relatedProjectIds: JSON.stringify(['proj_3']),
        seoTitle: 'E-commerce & DTC Web Development | Nexora Studio',
        seoDescription: 'Performance-driven e-commerce experiences and custom Shopify development for ambitious retail brands.',
        displayOrder: 2,
        createdAt: now,
      },
      {
        id: 'ind_3',
        name: 'Real Estate & Architecture',
        slug: 'real-estate-architecture',
        description: 'Architectural studios, luxury developments, and property investment firms requiring tactile, editorial presentation.',
        image: '/uploads/project_nordhaus_arch_1790138566367.jpg',
        relatedProjectIds: JSON.stringify(['proj_2']),
        seoTitle: 'Architecture & Real Estate Web Design | Nexora Studio',
        seoDescription: 'Editorial digital portfolios and property presentation websites for premier architects and developers.',
        displayOrder: 3,
        createdAt: now,
      },
      {
        id: 'ind_4',
        name: 'Professional Services',
        slug: 'professional-services',
        description: 'Legal practices, management consultancies, accounting firms, and specialized advisory practices.',
        image: '/uploads/hero_nexora_showcase_1790138540390.jpg',
        relatedProjectIds: JSON.stringify(['proj_1']),
        seoTitle: 'Professional Services Web Development | Nexora Studio',
        seoDescription: 'High-trust, authoritative web platforms for consultancies, legal firms, and strategic advisors.',
        displayOrder: 4,
        createdAt: now,
      },
      {
        id: 'ind_5',
        name: 'Finance & Capital',
        slug: 'finance-capital',
        description: 'Venture funds, private equity, fintech platforms, and treasury operations requiring uncompromising security signaling.',
        image: '/uploads/project_finora_fintech_1790138552630.jpg',
        relatedProjectIds: JSON.stringify(['proj_1']),
        seoTitle: 'Financial Services & Fintech Web Platforms | Nexora',
        seoDescription: 'Digital experience design and robust web engineering for capital allocators and financial technology firms.',
        displayOrder: 5,
        createdAt: now,
      },
      {
        id: 'ind_6',
        name: 'Healthcare & Biotech',
        slug: 'healthcare-biotech',
        description: 'Clinical research organizations, medical technology devices, and digital health practices.',
        image: '/uploads/hero_nexora_showcase_1790138540390.jpg',
        relatedProjectIds: JSON.stringify(['proj_4']),
        seoTitle: 'Healthcare & Biotech Digital Experiences | Nexora Studio',
        seoDescription: 'Clean, accessible, and compliant web interfaces for modern healthcare and biotechnology organizations.',
        displayOrder: 6,
        createdAt: now,
      },
      {
        id: 'ind_7',
        name: 'Education & EdTech',
        slug: 'education-edtech',
        description: 'Learning platforms, private academies, and research institutions seeking interactive student engagement.',
        image: '/uploads/project_cloudnest_saas_1790138589878.jpg',
        relatedProjectIds: JSON.stringify(['proj_4']),
        seoTitle: 'Education & EdTech Web Solutions | Nexora Studio',
        seoDescription: 'Intuitive learning portals and educational platforms designed for clarity and engagement.',
        displayOrder: 7,
        createdAt: now,
      },
      {
        id: 'ind_8',
        name: 'Startups & Ventures',
        slug: 'startups-ventures',
        description: 'Seed to Series B venture-backed teams launching new products into crowded markets with speed and precision.',
        image: '/uploads/hero_nexora_showcase_1790138540390.jpg',
        relatedProjectIds: JSON.stringify(['proj_1', 'proj_2', 'proj_3']),
        seoTitle: 'Web Design & Engineering for Ambitious Startups | Nexora',
        seoDescription: 'High-speed design, development, and conversion architecture for fast-growing venture-backed startups.',
        displayOrder: 8,
        createdAt: now,
      },
    ];

    // Seed Blog / Insights
    this.memoryStore.blogPosts = [
      {
        id: 'post_1',
        title: 'Why Most B2B Websites Fail to Convert (and How to Fix Them)',
        slug: 'why-b2b-websites-fail-to-convert',
        excerpt: 'The biggest mistake growing companies make is treating their website like an art exhibit instead of a focused conversation.',
        content: `### The Core Flaw in Modern B2B Web Design

Most B2B websites are assembled as compromises: the marketing team wants catchy slogans, product wants comprehensive feature matrices, and executives want their mission statement above the fold. The result is visual noise that fails to answer the visitor's primary question within five seconds:

*What do you do, who is it for, and why should I trust you right now?*

### 1. Kill the Abstract Metaphors

When someone lands on your site, they are evaluating whether you can solve an immediate operational problem. Using words like "supercharge your synergy" or "orchestrate paradigm shifts" forces the reader to expend mental energy decoding what you actually sell.

State the mechanism plainly: *"We automate multi-carrier shipping labels for Shopify Plus merchants."* Clarity builds trust faster than cleverness.

### 2. Proof Belongs Next to Claims, Not Pinned in the Footer

If you state that your software saves engineering teams twenty hours a week, substantiate that claim within the same visual block. Include the benchmark data, the exact workflow delta, and an attributable customer quote. When claims and evidence are separated by three screens of scrolling, visitors assume the claim is hyperbolic.

### 3. Simplify the Inbound Funnel

Do not force qualified prospects through a twenty-field interrogative form. Ask for the core business parameters: company URL, primary bottleneck, timeline, and an email address. Respect your customer's time and they will respect your expertise.`,
        category: 'Strategy',
        tags: JSON.stringify(['Conversion', 'B2B Strategy', 'Information Architecture']),
        coverImage: '/uploads/hero_nexora_showcase_1790138540390.jpg',
        authorName: 'Mohammad Ali',
        authorRole: 'Founder & Design Lead',
        readTime: '4 min read',
        status: 'published',
        seoTitle: 'Why B2B Websites Fail to Convert | Nexora Insights',
        seoDescription: 'Explore the three structural flaws holding back B2B conversion rates and practical steps to fix them.',
        publishedAt: '2026-03-15T10:00:00Z',
        createdAt: now,
      },
      {
        id: 'post_2',
        title: 'The Full-Stack Studio Advantage: Why Design and Code Belong Together',
        slug: 'the-full-stack-studio-advantage',
        excerpt: 'When designers do not understand browser constraints, and developers do not care about typographic rhythm, digital products suffer.',
        content: `### The Wall Between Design and Engineering

In traditional agency pipelines, design happens in Figma over four weeks. Once approved, the static mockups are thrown over a proverbial wall to an engineering contractor who was never part of the strategic conversations.

What happens next is universally predictable:
- Hover states and micro-interactions are guessed or omitted.
- Responsive breakpoints feel clunky and afterthought-driven.
- Image assets balloon the page weight to ten megabytes.
- The delivered website feels like a pale shadow of the designer's intent.

### Closing the Loop

At Nexora, we operate as a unified discipline. When our designers build layouts, they understand CSS Grid, subgrid, layout shifts, and semantic DOM elements. When our engineers write code, they respect baseline grids, optical kerning, and transition easing curves.

This tight integration cuts development cycles in half, eliminates communication friction, and guarantees that what you see in the prototype is precisely what renders in the live browser.`,
        category: 'Engineering',
        tags: JSON.stringify(['Full-Stack', 'Design Systems', 'Development Workflow']),
        coverImage: '/uploads/project_cloudnest_saas_1790138589878.jpg',
        authorName: 'Mohammad Ali',
        authorRole: 'Founder & Design Lead',
        readTime: '5 min read',
        status: 'published',
        seoTitle: 'The Full-Stack Studio Advantage | Nexora Insights',
        seoDescription: 'Why integrating design and engineering under one roof produces superior digital experiences and faster launches.',
        publishedAt: '2026-02-28T09:30:00Z',
        createdAt: now,
      },
      {
        id: 'post_3',
        title: 'Core Web Vitals in 2026: The Non-Negotiable Baseline for Premium Brands',
        slug: 'core-web-vitals-in-2026-baseline-for-premium-brands',
        excerpt: 'Page speed is not just an SEO metric; it is your brand’s digital handshake. A laggy website signals an indifferent company.',
        content: `### Speed is Courtesy

A potential client does not wait four seconds for your hero video to buffer. If your website stutters when scrolling or shifts layout while an interactive button is loading, you have already established a subconscious perception of sluggishness.

### The Modern Checklist:
1. **Zero External Font Blocking**: Preconnect and subset critical typefaces.
2. **Deterministic Layout Geometry**: Always define explicit aspect ratios for images and media frames to eliminate Cumulative Layout Shift (CLS).
3. **Compositor-Only Animations**: Never animate width, margin, or top coordinates. Restrict motion to transform and opacity.
4. **Lean JavaScript Budgets**: Evaluate every npm dependency against its payload footprint.

Speed communicates respect for your visitor’s device and time.`,
        category: 'Performance',
        tags: JSON.stringify(['Core Web Vitals', 'Performance', 'Technical SEO']),
        coverImage: '/uploads/project_finora_fintech_1790138552630.jpg',
        authorName: 'Technical Director',
        authorRole: 'Engineering Partner',
        readTime: '3 min read',
        status: 'published',
        seoTitle: 'Core Web Vitals for Modern Brands | Nexora Insights',
        seoDescription: 'How site speed, layout stability, and responsiveness shape brand perception and search rankings.',
        publishedAt: '2026-01-20T14:15:00Z',
        createdAt: now,
      },
    ];

    // Authentic Team Members (Founder & core leadership, believable for startup studio)
    this.memoryStore.teamMembers = [
      {
        id: 'team_1',
        name: 'Mohammad Ali',
        position: 'Founder & Principal Designer',
        bio: 'Spearheading design strategy, brand architecture, and user experience. Dedicated to crafting restrained, high-performing digital platforms for growing businesses.',
        photo: '/uploads/hero_nexora_showcase_1790138540390.jpg',
        linkedin: 'https://linkedin.com',
        email: 'mohammadaliomega@gmail.com',
        displayOrder: 1,
        status: 'active',
        createdAt: now,
      },
      {
        id: 'team_2',
        name: 'Elena Rostova',
        position: 'Head of Full-Stack Engineering',
        bio: 'Oversees technical architecture, API systems, and performance optimization with a strict focus on TypeScript and scalable cloud deployments.',
        photo: '/uploads/project_cloudnest_saas_1790138589878.jpg',
        linkedin: 'https://linkedin.com',
        email: 'engineering@nexora.studio',
        displayOrder: 2,
        status: 'active',
        createdAt: now,
      },
      {
        id: 'team_3',
        name: 'Julian Vance',
        position: 'Lead Growth & Technical SEO',
        bio: 'Specializing in technical search engine indexing, Core Web Vitals remediation, and data-informed conversion rate optimization.',
        photo: '/uploads/project_finora_fintech_1790138552630.jpg',
        linkedin: 'https://linkedin.com',
        email: 'growth@nexora.studio',
        displayOrder: 3,
        status: 'active',
        createdAt: now,
      },
    ];

    // Seed Testimonials - Marked as Early Partner Feedback / Project Reviews
    this.memoryStore.testimonials = [
      {
        id: 'test_1',
        clientName: 'Alexander Lind',
        position: 'Managing Partner',
        company: 'Vanguard Capital',
        photo: '/uploads/hero_nexora_showcase_1790138540390.jpg',
        quote: 'Nexora brought clarity to an interface that had plagued our firm for two years. Their discipline around typography and speed is unlike any traditional agency we have worked with.',
        rating: 5,
        projectTitle: 'Capital Platform Redesign',
        isFeatured: true,
        status: 'published',
        displayOrder: 1,
        createdAt: now,
      },
      {
        id: 'test_2',
        clientName: 'Marcus Thorne',
        position: 'Creative Director',
        company: 'Atelier Thorne',
        photo: '/uploads/project_nordhaus_arch_1790138566367.jpg',
        quote: 'Working with a studio that writes production-grade code with the same obsession they bring to design details was a breath of fresh air. They launched our platform ahead of schedule.',
        rating: 5,
        projectTitle: 'Digital Portfolio & Identity',
        isFeatured: true,
        status: 'published',
        displayOrder: 2,
        createdAt: now,
      },
    ];

    // Seed Leads: Empty by default so only real submissions are shown
    this.memoryStore.leads = [];
    this.memoryStore.leadNotes = [];

    // Seed Global Site Settings
    this.memoryStore.siteSettings = [
      {
        id: 'settings_1',
        agencyName: 'Nexora',
        tagline: 'Website Design • Development • Digital Growth',
        logoUrl: '/assets/nexora-logo.svg',
        email: 'mohammadaliomega@gmail.com',
        phone: '+1 (415) 890-3420',
        whatsapp: '+14158903420',
        address: '548 Market St, Suite 7210, San Francisco, CA 94104',
        socialLinks: JSON.stringify({
          linkedin: 'https://linkedin.com/company/nexora-studio',
          twitter: 'https://twitter.com/nexora_studio',
          github: 'https://github.com/nexora-studio',
          instagram: 'https://instagram.com/nexora.studio'
        }),
        footerText: 'Nexora is a digital design and development studio helping ambitious businesses turn ideas into useful, high-performing digital experiences.',
        copyrightText: '© 2026 Nexora Studio. All rights reserved.',
        primaryCtaText: 'Start a Project',
        defaultSeoTitle: 'Nexora — Digital Experience Design & Development Studio',
        defaultSeoDesc: 'Strategy, UI/UX design, custom full-stack web development, and digital growth for ambitious brands and fast-growing modern businesses.',
        defaultOgImage: '/uploads/hero_nexora_showcase_1790138540390.jpg',
        analyticsId: 'G-NEXORA2026',
        updatedAt: now,
      },
    ];

    // Seed Navigation Items
    this.memoryStore.navigationItems = [
      { id: 'nav_home', label: 'Home', url: '/', isVisible: true, displayOrder: 0, isCta: false },
      { id: 'nav_1', label: 'Work', url: '/work', isVisible: false, displayOrder: 1, isCta: false },
      { id: 'nav_2', label: 'Services', url: '/services', isVisible: true, displayOrder: 2, isCta: false },
      { id: 'nav_3', label: 'Process', url: '/process', isVisible: true, displayOrder: 3, isCta: false },
      { id: 'nav_5', label: 'Insights', url: '/insights', isVisible: false, displayOrder: 4, isCta: false },
      { id: 'nav_6', label: 'Contact', url: '/contact', isVisible: true, displayOrder: 5, isCta: false },
      { id: 'nav_7', label: 'Start a Project', url: '/start-a-project', isVisible: true, displayOrder: 6, isCta: true },
    ];
  }

  // --- Data Access Methods ---
  public getUsers(): User[] {
    return this.memoryStore.users;
  }

  public getUserByEmail(email: string): User | undefined {
    return this.memoryStore.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  }

  public getUserById(id: string): User | undefined {
    return this.memoryStore.users.find(u => u.id === id);
  }

  public updateUserPassword(userId: string, newHash: string): boolean {
    const user = this.getUserById(userId);
    if (!user) return false;
    user.passwordHash = newHash;
    this.persist();
    return true;
  }

  // Projects
  public getProjects(status?: string): Project[] {
    let list = this.memoryStore.projects;
    if (status) {
      list = list.filter(p => p.status === status);
    }
    return [...list].sort((a, b) => a.displayOrder - b.displayOrder);
  }

  public getProjectBySlug(slug: string): Project | undefined {
    return this.memoryStore.projects.find(p => p.slug === slug);
  }

  public getProjectById(id: string): Project | undefined {
    return this.memoryStore.projects.find(p => p.id === id);
  }

  public saveProject(project: Partial<Project>): Project {
    const now = new Date().toISOString();
    const existingIndex = this.memoryStore.projects.findIndex(p => p.id === project.id);

    if (existingIndex >= 0) {
      const updated: Project = {
        ...this.memoryStore.projects[existingIndex],
        ...project,
        updatedAt: now,
      };
      this.memoryStore.projects[existingIndex] = updated;
      this.persist();
      return updated;
    } else {
      const created: Project = {
        id: project.id || `proj_${Date.now()}`,
        title: project.title || 'Untitled Project',
        slug: project.slug || `project-${Date.now()}`,
        clientName: project.clientName || 'Private Client',
        industry: project.industry || 'Technology',
        projectType: project.projectType || 'Website Design & Development',
        shortDesc: project.shortDesc || '',
        fullCaseStudy: project.fullCaseStudy || '',
        challenge: project.challenge || '',
        solution: project.solution || '',
        results: project.results || '[]',
        technologies: project.technologies || '[]',
        projectUrl: project.projectUrl || '',
        coverImage: project.coverImage || '/uploads/hero_nexora_showcase_1790138540390.jpg',
        galleryImages: project.galleryImages || '[]',
        isFeatured: project.isFeatured ?? false,
        isConcept: project.isConcept ?? false,
        status: project.status || 'published',
        seoTitle: project.seoTitle || `${project.title || 'Project'} | Nexora`,
        seoDescription: project.seoDescription || project.shortDesc || '',
        displayOrder: project.displayOrder ?? (this.memoryStore.projects.length + 1),
        createdAt: now,
        updatedAt: now,
      };
      this.memoryStore.projects.push(created);
      this.persist();
      return created;
    }
  }

  public deleteProject(id: string): boolean {
    const prevLen = this.memoryStore.projects.length;
    this.memoryStore.projects = this.memoryStore.projects.filter(p => p.id !== id);
    if (this.memoryStore.projects.length !== prevLen) {
      this.persist();
      return true;
    }
    return false;
  }

  // Services
  public getServices(status?: string): Service[] {
    let list = this.memoryStore.services;
    if (status) list = list.filter(s => s.status === status);
    return [...list].sort((a, b) => a.displayOrder - b.displayOrder);
  }

  public getServiceBySlug(slug: string): Service | undefined {
    return this.memoryStore.services.find(s => s.slug === slug);
  }

  public getServiceById(id: string): Service | undefined {
    return this.memoryStore.services.find(s => s.id === id);
  }

  public saveService(service: Partial<Service>): Service {
    const now = new Date().toISOString();
    const idx = this.memoryStore.services.findIndex(s => s.id === service.id);

    if (idx >= 0) {
      const updated = { ...this.memoryStore.services[idx], ...service };
      this.memoryStore.services[idx] = updated;
      this.persist();
      return updated;
    } else {
      const created: Service = {
        id: service.id || `serv_${Date.now()}`,
        title: service.title || 'New Service',
        slug: service.slug || `service-${Date.now()}`,
        shortDesc: service.shortDesc || '',
        fullDesc: service.fullDesc || '',
        icon: service.icon || 'Layers',
        featuredImage: service.featuredImage || '/uploads/hero_nexora_showcase_1790138540390.jpg',
        benefits: service.benefits || '[]',
        processSteps: service.processSteps || '[]',
        relatedProjectIds: service.relatedProjectIds || '[]',
        seoTitle: service.seoTitle || `${service.title || 'Service'} | Nexora`,
        seoDescription: service.seoDescription || service.shortDesc || '',
        status: service.status || 'published',
        displayOrder: service.displayOrder ?? (this.memoryStore.services.length + 1),
        createdAt: now,
      };
      this.memoryStore.services.push(created);
      this.persist();
      return created;
    }
  }

  public deleteService(id: string): boolean {
    const prev = this.memoryStore.services.length;
    this.memoryStore.services = this.memoryStore.services.filter(s => s.id !== id);
    if (this.memoryStore.services.length !== prev) {
      this.persist();
      return true;
    }
    return false;
  }

  // Industries
  public getIndustries(): Industry[] {
    return [...this.memoryStore.industries].sort((a, b) => a.displayOrder - b.displayOrder);
  }

  public getIndustryBySlug(slug: string): Industry | undefined {
    return this.memoryStore.industries.find(i => i.slug === slug);
  }

  public saveIndustry(industry: Partial<Industry>): Industry {
    const now = new Date().toISOString();
    const idx = this.memoryStore.industries.findIndex(i => i.id === industry.id);

    if (idx >= 0) {
      const updated = { ...this.memoryStore.industries[idx], ...industry };
      this.memoryStore.industries[idx] = updated;
      this.persist();
      return updated;
    } else {
      const created: Industry = {
        id: industry.id || `ind_${Date.now()}`,
        name: industry.name || 'New Industry',
        slug: industry.slug || `industry-${Date.now()}`,
        description: industry.description || '',
        image: industry.image || '/uploads/hero_nexora_showcase_1790138540390.jpg',
        relatedProjectIds: industry.relatedProjectIds || '[]',
        seoTitle: industry.seoTitle || `${industry.name || 'Industry'} | Nexora`,
        seoDescription: industry.seoDescription || industry.description || '',
        displayOrder: industry.displayOrder ?? (this.memoryStore.industries.length + 1),
        createdAt: now,
      };
      this.memoryStore.industries.push(created);
      this.persist();
      return created;
    }
  }

  public deleteIndustry(id: string): boolean {
    const prev = this.memoryStore.industries.length;
    this.memoryStore.industries = this.memoryStore.industries.filter(i => i.id !== id);
    if (this.memoryStore.industries.length !== prev) {
      this.persist();
      return true;
    }
    return false;
  }

  // Blog Posts
  public getBlogPosts(status?: string): BlogPost[] {
    let list = this.memoryStore.blogPosts;
    if (status) list = list.filter(b => b.status === status);
    return [...list].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  public getBlogPostBySlug(slug: string): BlogPost | undefined {
    return this.memoryStore.blogPosts.find(b => b.slug === slug);
  }

  public saveBlogPost(post: Partial<BlogPost>): BlogPost {
    const now = new Date().toISOString();
    const idx = this.memoryStore.blogPosts.findIndex(b => b.id === post.id);

    if (idx >= 0) {
      const updated = { ...this.memoryStore.blogPosts[idx], ...post };
      this.memoryStore.blogPosts[idx] = updated;
      this.persist();
      return updated;
    } else {
      const created: BlogPost = {
        id: post.id || `post_${Date.now()}`,
        title: post.title || 'New Article',
        slug: post.slug || `article-${Date.now()}`,
        excerpt: post.excerpt || '',
        content: post.content || '',
        category: post.category || 'Insights',
        tags: post.tags || '[]',
        coverImage: post.coverImage || '/uploads/hero_nexora_showcase_1790138540390.jpg',
        authorName: post.authorName || 'Nexora Team',
        authorRole: post.authorRole || 'Studio Staff',
        readTime: post.readTime || '4 min read',
        status: post.status || 'published',
        seoTitle: post.seoTitle || `${post.title || 'Article'} | Nexora`,
        seoDescription: post.seoDescription || post.excerpt || '',
        publishedAt: post.publishedAt || now,
        createdAt: now,
      };
      this.memoryStore.blogPosts.push(created);
      this.persist();
      return created;
    }
  }

  public deleteBlogPost(id: string): boolean {
    const prev = this.memoryStore.blogPosts.length;
    this.memoryStore.blogPosts = this.memoryStore.blogPosts.filter(b => b.id !== id);
    if (this.memoryStore.blogPosts.length !== prev) {
      this.persist();
      return true;
    }
    return false;
  }

  // Testimonials
  public getTestimonials(status?: string): Testimonial[] {
    let list = this.memoryStore.testimonials;
    if (status) list = list.filter(t => t.status === status);
    return [...list].sort((a, b) => a.displayOrder - b.displayOrder);
  }

  public saveTestimonial(t: Partial<Testimonial>): Testimonial {
    const now = new Date().toISOString();
    const idx = this.memoryStore.testimonials.findIndex(item => item.id === t.id);

    if (idx >= 0) {
      const updated = { ...this.memoryStore.testimonials[idx], ...t };
      this.memoryStore.testimonials[idx] = updated;
      this.persist();
      return updated;
    } else {
      const created: Testimonial = {
        id: t.id || `test_${Date.now()}`,
        clientName: t.clientName || 'Partner',
        position: t.position || 'Executive',
        company: t.company || 'Enterprise',
        photo: t.photo || '/uploads/hero_nexora_showcase_1790138540390.jpg',
        quote: t.quote || '',
        rating: t.rating ?? 5,
        projectTitle: t.projectTitle || 'Digital Engagement',
        isFeatured: t.isFeatured ?? true,
        status: t.status || 'published',
        displayOrder: t.displayOrder ?? (this.memoryStore.testimonials.length + 1),
        createdAt: now,
      };
      this.memoryStore.testimonials.push(created);
      this.persist();
      return created;
    }
  }

  public deleteTestimonial(id: string): boolean {
    const prev = this.memoryStore.testimonials.length;
    this.memoryStore.testimonials = this.memoryStore.testimonials.filter(t => t.id !== id);
    if (this.memoryStore.testimonials.length !== prev) {
      this.persist();
      return true;
    }
    return false;
  }

  // Team
  public getTeamMembers(status?: string): TeamMember[] {
    let list = this.memoryStore.teamMembers;
    if (status) list = list.filter(m => m.status === status);
    return [...list].sort((a, b) => a.displayOrder - b.displayOrder);
  }

  public saveTeamMember(member: Partial<TeamMember>): TeamMember {
    const now = new Date().toISOString();
    const idx = this.memoryStore.teamMembers.findIndex(m => m.id === member.id);

    if (idx >= 0) {
      const updated = { ...this.memoryStore.teamMembers[idx], ...member };
      this.memoryStore.teamMembers[idx] = updated;
      this.persist();
      return updated;
    } else {
      const created: TeamMember = {
        id: member.id || `team_${Date.now()}`,
        name: member.name || 'Team Member',
        position: member.position || 'Specialist',
        bio: member.bio || '',
        photo: member.photo || '/uploads/hero_nexora_showcase_1790138540390.jpg',
        linkedin: member.linkedin || '',
        email: member.email || '',
        displayOrder: member.displayOrder ?? (this.memoryStore.teamMembers.length + 1),
        status: member.status || 'active',
        createdAt: now,
      };
      this.memoryStore.teamMembers.push(created);
      this.persist();
      return created;
    }
  }

  public deleteTeamMember(id: string): boolean {
    const prev = this.memoryStore.teamMembers.length;
    this.memoryStore.teamMembers = this.memoryStore.teamMembers.filter(m => m.id !== id);
    if (this.memoryStore.teamMembers.length !== prev) {
      this.persist();
      return true;
    }
    return false;
  }

  // Leads
  public getLeads(filters?: { status?: string; search?: string }): Lead[] {
    let list = [...this.memoryStore.leads];

    if (filters?.status && filters.status !== 'all') {
      list = list.filter(l => l.status === filters.status);
    }

    if (filters?.search) {
      const q = filters.search.toLowerCase();
      list = list.filter(l =>
        l.name.toLowerCase().includes(q) ||
        l.email.toLowerCase().includes(q) ||
        l.company.toLowerCase().includes(q) ||
        l.message.toLowerCase().includes(q)
      );
    }

    // Attach notes
    return list
      .map(lead => ({
        ...lead,
        notes: this.memoryStore.leadNotes.filter(n => n.leadId === lead.id),
      }))
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  public getLeadById(id: string): Lead | undefined {
    const lead = this.memoryStore.leads.find(l => l.id === id);
    if (!lead) return undefined;
    return {
      ...lead,
      notes: this.memoryStore.leadNotes.filter(n => n.leadId === lead.id),
    };
  }

  public createLead(leadData: Partial<Lead>): Lead {
    const now = new Date().toISOString();
    const newLead: Lead = {
      id: `lead_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      name: leadData.name || '',
      email: leadData.email || '',
      company: leadData.company || '',
      website: leadData.website || '',
      projectType: leadData.projectType || 'General Inquiry',
      budgetRange: leadData.budgetRange || 'Not specified',
      timeline: leadData.timeline || 'Flexible',
      message: leadData.message || '',
      referralSource: leadData.referralSource || 'Direct',
      servicesRequired: leadData.servicesRequired || '[]',
      existingWebsite: leadData.existingWebsite || '',
      competitors: leadData.competitors || '',
      status: 'new',
      createdAt: now,
      updatedAt: now,
    };

    this.memoryStore.leads.unshift(newLead);
    this.persist();
    return newLead;
  }

  public updateLeadStatus(id: string, status: Lead['status']): boolean {
    const lead = this.memoryStore.leads.find(l => l.id === id);
    if (!lead) return false;
    lead.status = status;
    lead.updatedAt = new Date().toISOString();
    this.persist();
    return true;
  }

  public addLeadNote(leadId: string, content: string, author: string): LeadNote | null {
    const lead = this.memoryStore.leads.find(l => l.id === leadId);
    if (!lead) return null;

    const note: LeadNote = {
      id: `note_${Date.now()}`,
      leadId,
      content,
      author,
      createdAt: new Date().toISOString(),
    };

    this.memoryStore.leadNotes.push(note);
    this.persist();
    return note;
  }

  public deleteLead(id: string): boolean {
    const prev = this.memoryStore.leads.length;
    this.memoryStore.leads = this.memoryStore.leads.filter(l => l.id !== id);
    this.memoryStore.leadNotes = this.memoryStore.leadNotes.filter(n => n.leadId !== id);
    if (this.memoryStore.leads.length !== prev) {
      this.persist();
      return true;
    }
    return false;
  }

  // Media
  public getMedia(): MediaItem[] {
    return [...this.memoryStore.media].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  public addMedia(media: Omit<MediaItem, 'id' | 'createdAt'>): MediaItem {
    const item: MediaItem = {
      id: `media_${Date.now()}`,
      ...media,
      createdAt: new Date().toISOString(),
    };
    this.memoryStore.media.unshift(item);
    this.persist();
    return item;
  }

  public updateMedia(id: string, updates: Partial<MediaItem>): MediaItem | null {
    const idx = this.memoryStore.media.findIndex(m => m.id === id);
    if (idx === -1) return null;
    const updated = {
      ...this.memoryStore.media[idx],
      ...updates,
      id, // protect id
    };
    this.memoryStore.media[idx] = updated;
    this.persist();
    return updated;
  }

  public deleteMedia(id: string): boolean {
    const prev = this.memoryStore.media.length;
    this.memoryStore.media = this.memoryStore.media.filter(m => m.id !== id);
    if (this.memoryStore.media.length !== prev) {
      this.persist();
      return true;
    }
    return false;
  }

  // Settings
  public getSiteSettings(): SiteSettings {
    if (!this.memoryStore.siteSettings || this.memoryStore.siteSettings.length === 0) {
      this.seedInitialData();
    }
    return this.memoryStore.siteSettings[0];
  }

  public updateSiteSettings(settings: Partial<SiteSettings>): SiteSettings {
    const current = this.getSiteSettings();
    const updated = {
      ...current,
      ...settings,
      updatedAt: new Date().toISOString(),
    };
    this.memoryStore.siteSettings[0] = updated;
    this.persist();
    return updated;
  }

  // Navigation
  public getNavigationItems(): NavigationItem[] {
    return [...this.memoryStore.navigationItems]
      .filter(item => item.url !== '/about' && item.url !== '/industries')
      .sort((a, b) => a.displayOrder - b.displayOrder);
  }

  public updateNavigationItems(items: NavigationItem[]): NavigationItem[] {
    this.memoryStore.navigationItems = items;
    this.persist();
    return this.memoryStore.navigationItems;
  }

  // Stats for Admin Dashboard
  public getAdminStats() {
    const totalProjects = this.memoryStore.projects.length;
    const publishedProjects = this.memoryStore.projects.filter(p => p.status === 'published').length;
    const servicesCount = this.memoryStore.services.length;
    const blogCount = this.memoryStore.blogPosts.length;
    const leadsTotal = this.memoryStore.leads.length;
    const newLeads = this.memoryStore.leads.filter(l => l.status === 'new').length;
    const teamCount = this.memoryStore.teamMembers.length;
    const testimonialsCount = this.memoryStore.testimonials.length;

    return {
      totalProjects,
      publishedProjects,
      servicesCount,
      blogCount,
      leadsTotal,
      newLeads,
      teamCount,
      testimonialsCount,
    };
  }
}

// Singleton database instance
export const db = new DatabaseStore();
