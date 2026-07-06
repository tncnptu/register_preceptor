import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';

// The URL provided by the user for their Google Apps Script Web App
const GAS_URL = 'https://script.google.com/macros/s/AKfycbyJ6Mp449Y2jYBEYKdwRgCb7GvlKHo-TpzapeVpq-XvYyzm7FoY1EU_3bFt0bId7_Id/exec';

// Hero banner image path
const HERO_BANNER_PATH = path.resolve('C:/Users/oil_p/.gemini/antigravity-ide/brain/c36c2d90-e88c-4501-9e17-aad8e7135f98/media__1783327342583.png');

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '50mb' }));

  // Serve hero banner image
  app.get('/hero-banner.png', (req, res) => {
    if (fs.existsSync(HERO_BANNER_PATH)) {
      res.setHeader('Content-Type', 'image/png');
      res.setHeader('Cache-Control', 'public, max-age=86400');
      fs.createReadStream(HERO_BANNER_PATH).pipe(res);
    } else {
      res.status(404).send('Not found');
    }
  });

  app.post('/api/register', async (req, res) => {
    try {
      const response = await fetch(GAS_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'register',
          formData: req.body
        })
      });
      
      const text = await response.text();
      try {
        const result = JSON.parse(text);
        res.json(result);
      } catch (e) {
        console.error('GAS Error Response:', text);
        res.status(500).json({ success: false, message: 'การเชื่อมต่อกับ Google Apps Script ผิดพลาด กรุณาตรวจสอบว่าได้คัดลอกโค้ด Code.gs ล่าสุดไปวางและ Deploy เป็น New version แล้ว' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'เกิดข้อผิดพลาดในการบันทึกข้อมูล' });
    }
  });

  app.post('/api/search', async (req, res) => {
    try {
      const response = await fetch(GAS_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'search',
          email: req.body.email,
          phone: req.body.phone
        })
      });
      
      const text = await response.text();
      try {
        const result = JSON.parse(text);
        res.json(result);
      } catch (e) {
        console.error('GAS Error Response:', text);
        res.status(500).json({ success: false, message: 'การเชื่อมต่อกับ Google Apps Script ผิดพลาด กรุณาตรวจสอบการ Deploy Code.gs' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'เกิดข้อผิดพลาดในการค้นหาข้อมูล' });
    }
  });

  app.post('/api/update', async (req, res) => {
    try {
      const { id, ...updateData } = req.body;
      const response = await fetch(GAS_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'update',
          id,
          updateData
        })
      });
      
      const text = await response.text();
      try {
        const result = JSON.parse(text);
        res.json(result);
      } catch (e) {
        console.error('GAS Error Response:', text);
        res.status(500).json({ success: false, message: 'การเชื่อมต่อกับ Google Apps Script ผิดพลาด กรุณาตรวจสอบการ Deploy Code.gs' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'เกิดข้อผิดพลาดในการอัปเดตข้อมูล' });
    }
  });

  app.get('/api/dashboard', async (req, res) => {
    try {
      const response = await fetch(GAS_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'dashboard'
        })
      });
      
      const text = await response.text();
      try {
        const result = JSON.parse(text);
        res.json(result);
      } catch (e) {
        console.error('GAS Error Response:', text);
        res.status(500).json({ success: false, message: 'การเชื่อมต่อกับ Google Apps Script ผิดพลาด กรุณาตรวจสอบการ Deploy Code.gs' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'เกิดข้อผิดพลาดในการดึงข้อมูลแดชบอร์ด' });
    }
  });

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
