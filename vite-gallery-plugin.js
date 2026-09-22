import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function galleryApiPlugin() {
  const uploadsDir = path.resolve(__dirname, 'public/uploads');
  const galleryDataFile = path.resolve(__dirname, 'public/gallery-data.json');

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

      if (!url.startsWith('/api/gallery')) {
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
        console.error('API Gallery Middleware error:', err);
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
