import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function galleryApiPlugin() {
  const uploadsDir = path.resolve(__dirname, 'public/uploads');
  const galleryDataFile = path.resolve(__dirname, 'public/gallery-data.json');
  const adminConfigFile = path.resolve(__dirname, 'public/admin-config.json');

  const ensureDirs = () => {
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }
  };

  const getGalleryData = () => {
    ensureDirs();
    if (fs.existsSync(galleryDataFile)) {
      try {
        const content = fs.readFileSync(galleryDataFile, 'utf8');
        return JSON.parse(content);
      } catch (e) {
        console.error('Error reading gallery data:', e);
      }
    }
    return [];
  };

  const saveGalleryData = (data) => {
    ensureDirs();
    fs.writeFileSync(galleryDataFile, JSON.stringify(data, null, 2), 'utf8');
  };

  const getAdminConfig = () => {
    if (fs.existsSync(adminConfigFile)) {
      try {
        return JSON.parse(fs.readFileSync(adminConfigFile, 'utf8'));
      } catch (e) {
        console.error('Error reading admin config:', e);
      }
    }
    return {
      adminAccounts: [
        {
          id: 'admin-1',
          name: 'MY3 Master Admin',
          email: 'rmythristudiondl.anji@gmail.com',
          password: 'my3studios2026',
          role: 'Master Studio Administrator',
          designation: 'Master Studio Administrator',
          isMaster: true,
          status: 'ACTIVE',
          badges: ['MASTER ADMIN', 'ACTIVE'],
          avatarInitial: 'M',
          lastActive: 'Active',
        },
      ],
      deletedAccountEmails: [
        'admin@my3studios.com',
        'anji@my3studios.com',
        'bookings@my3studios.com',
      ],
      securityQA: {
        question: 'What is the founding location and primary atelier of MY3 Studios?',
        answer: 'Srinivasa Center, Nandyal, Andhra Pradesh',
        lastUpdated: 'October 2026',
      },
    };
  };

  const saveAdminConfig = (data) => {
    try {
      fs.writeFileSync(adminConfigFile, JSON.stringify(data, null, 2), 'utf8');
    } catch (e) {
      console.error('Error saving admin config:', e);
    }
  };

  const handleBase64Image = (imageData, filenamePrefix = 'my3') => {
    if (!imageData || typeof imageData !== 'string' || !imageData.startsWith('data:image/')) {
      return imageData; // Already a URL or relative path
    }

    const matches = imageData.match(/^data:image\/([a-zA-Z0-9+]+);base64,(.+)$/);
    if (!matches) return imageData;

    let ext = matches[1].toLowerCase();
    if (ext === 'jpeg') ext = 'jpg';
    const buffer = Buffer.from(matches[2], 'base64');
    const filename = `${filenamePrefix}-${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${ext}`;
    const filePath = path.join(uploadsDir, filename);

    fs.writeFileSync(filePath, buffer);
    return `/uploads/${filename}`;
  };

  const configureMiddleware = (server) => {
    server.middlewares.use(async (req, res, next) => {
      const url = req.url?.split('?')[0] || '';

      // Skip non-API calls
      if (!url.startsWith('/api/gallery') && !url.startsWith('/api/admin')) {
        return next();
      }

      const getJsonBody = () =>
        new Promise((resolve, reject) => {
          let body = '';
          req.on('data', (chunk) => {
            body += chunk;
          });
          req.on('end', () => {
            try {
              resolve(body ? JSON.parse(body) : {});
            } catch (err) {
              reject(err);
            }
          });
          req.on('error', reject);
        });

      try {
        // ─── ADMIN API ───
        if (url.startsWith('/api/admin')) {
          if (req.method === 'GET' && url === '/api/admin') {
            const config = getAdminConfig();
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(config));
            return;
          }

          if (req.method === 'POST' && url === '/api/admin/sync') {
            const body = await getJsonBody();
            saveAdminConfig(body);
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: true }));
            return;
          }

          if (req.method === 'POST' && url === '/api/admin/account') {
            const body = await getJsonBody();
            const config = getAdminConfig();
            const existingIndex = config.adminAccounts.findIndex((a) => a.id === body.id);
            if (existingIndex >= 0) {
              config.adminAccounts[existingIndex] = { ...config.adminAccounts[existingIndex], ...body };
            } else {
              config.adminAccounts.push(body);
            }
            saveAdminConfig(config);
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: true, account: body }));
            return;
          }

          if (req.method === 'DELETE' && url.startsWith('/api/admin/account/')) {
            const id = decodeURIComponent(url.replace('/api/admin/account/', ''));
            const config = getAdminConfig();
            const target = config.adminAccounts.find((a) => a.id === id);
            if (target && !target.isMaster) {
              config.adminAccounts = config.adminAccounts.filter((a) => a.id !== id);
              if (!config.deletedAccountEmails) config.deletedAccountEmails = [];
              if (target.email && !config.deletedAccountEmails.includes(target.email.toLowerCase())) {
                config.deletedAccountEmails.push(target.email.toLowerCase());
              }
              saveAdminConfig(config);
            }
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: true }));
            return;
          }

          if (req.method === 'POST' && url === '/api/admin/security-qa') {
            const body = await getJsonBody();
            const config = getAdminConfig();
            config.securityQA = {
              question: body.question,
              answer: body.answer,
              lastUpdated: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
            };
            saveAdminConfig(config);
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: true, securityQA: config.securityQA }));
            return;
          }
        }

        // ─── GALLERY API ───
        // GET /api/gallery
        if (req.method === 'GET' && url === '/api/gallery') {
          const items = getGalleryData();
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(items));
          return;
        }

        // POST /api/gallery (add new photo)
        if (req.method === 'POST' && url === '/api/gallery') {
          const body = await getJsonBody();
          const items = getGalleryData();

          const processedImage = handleBase64Image(body.image, 'photo');
          const newItem = {
            ...body,
            id: body.id || `photo-${Date.now()}`,
            image: processedImage,
            thumbnail: processedImage,
            createdAt: new Date().toISOString(),
          };

          const updatedItems = [newItem, ...items];
          saveGalleryData(updatedItems);

          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ success: true, item: newItem, items: updatedItems }));
          return;
        }

        // POST /api/gallery/reset
        if (req.method === 'POST' && url === '/api/gallery/reset') {
          const defaultModule = await import('./src/data/gallery.js');
          const defaultItems = defaultModule.galleryItems || [];
          saveGalleryData(defaultItems);
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ success: true, items: defaultItems }));
          return;
        }

        // PUT /api/gallery/:id
        if (req.method === 'PUT' && url.startsWith('/api/gallery/')) {
          const id = decodeURIComponent(url.replace('/api/gallery/', ''));
          const body = await getJsonBody();
          const items = getGalleryData();

          let updatedItem = null;
          const updatedItems = items.map((item) => {
            if (item.id === id) {
              const processedImage = body.image ? handleBase64Image(body.image, 'photo') : item.image;
              updatedItem = {
                ...item,
                ...body,
                image: processedImage,
                thumbnail: processedImage,
              };
              return updatedItem;
            }
            return item;
          });

          saveGalleryData(updatedItems);
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ success: true, item: updatedItem }));
          return;
        }

        // DELETE /api/gallery/:id
        if (req.method === 'DELETE' && url.startsWith('/api/gallery/')) {
          const id = decodeURIComponent(url.replace('/api/gallery/', ''));
          const items = getGalleryData();
          const updatedItems = items.filter((item) => item.id !== id);
          saveGalleryData(updatedItems);
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ success: true }));
          return;
        }

        next();
      } catch (err) {
        console.error('API Middleware error:', err);
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ error: err.message }));
      }
    });
  };

  return {
    name: 'vite-gallery-api',
    configureServer(server) {
      configureMiddleware(server);
    },
    configurePreviewServer(server) {
      configureMiddleware(server);
    },
  };
}
