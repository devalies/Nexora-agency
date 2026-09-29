import express from 'express';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { apiRouter } from './server/routes/api.ts';
import { db } from './server/db.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
  const isProd = process.env.NODE_ENV === 'production';

  app.use(express.json({ limit: '20mb' }));
  app.use(express.urlencoded({ extended: true, limit: '20mb' }));

  // Static uploads & assets
  const publicDir = path.resolve(__dirname, 'public');
  const uploadsDir = path.resolve(publicDir, 'uploads');
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }

  app.use('/uploads', express.static(uploadsDir));
  app.use('/assets', express.static(path.resolve(publicDir, 'assets')));

  // REST API Routes
  app.use('/api', apiRouter);

  // SEO: Dynamic Robots.txt
  app.get('/robots.txt', (_req, res) => {
    const robots = `User-agent: *\nAllow: /\nDisallow: /api\nSitemap: ${process.env.APP_URL || 'https://nexora.studio'}/sitemap.xml\n`;
    res.type('text/plain').send(robots);
  });

  // SEO: Dynamic Sitemap.xml
  app.get('/sitemap.xml', (_req, res) => {
    const baseUrl = process.env.APP_URL || 'https://nexora.studio';
    const projects = db.getProjects('published');
    const services = db.getServices('published');
    const industries = db.getIndustries();
    const blogPosts = db.getBlogPosts('published');

    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

    const staticRoutes = [
      { path: '/', priority: '1.0', changefreq: 'weekly' },
      { path: '/services', priority: '0.9', changefreq: 'monthly' },
      { path: '/process', priority: '0.8', changefreq: 'monthly' },
      { path: '/about', priority: '0.8', changefreq: 'monthly' },
      { path: '/industries', priority: '0.8', changefreq: 'monthly' },
      { path: '/contact', priority: '0.8', changefreq: 'monthly' },
      { path: '/start-a-project', priority: '0.9', changefreq: 'monthly' },
      { path: '/privacy-policy', priority: '0.3', changefreq: 'yearly' },
      { path: '/terms', priority: '0.3', changefreq: 'yearly' },
    ];

    for (const r of staticRoutes) {
      xml += `  <url>\n    <loc>${baseUrl}${r.path}</loc>\n    <changefreq>${r.changefreq}</changefreq>\n    <priority>${r.priority}</priority>\n  </url>\n`;
    }

    for (const s of services) {
      xml += `  <url>\n    <loc>${baseUrl}/services/${s.slug}</loc>\n    <changefreq>monthly</changefreq>\n    <priority>0.85</priority>\n  </url>\n`;
    }

    for (const i of industries) {
      xml += `  <url>\n    <loc>${baseUrl}/industries/${i.slug}</loc>\n    <changefreq>monthly</changefreq>\n    <priority>0.75</priority>\n  </url>\n`;
    }

    xml += `</urlset>`;
    res.type('application/xml').send(xml);
  });

  // Vite development vs production static handling
  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.resolve(__dirname, 'dist');
    app.use(express.static(distDir));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distDir, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Nexora Server] Running at http://localhost:${PORT} (${isProd ? 'Production' : 'Development'})`);
  });
}

startServer().catch(err => {
  console.error('[Nexora Server] Fatal error starting server:', err);
  process.exit(1);
});
