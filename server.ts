import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';
import rateLimit from 'express-rate-limit';
import jwt from 'jsonwebtoken';

// The URL provided by the user for their Google Apps Script Web App
const GAS_URL = 'https://script.google.com/macros/s/AKfycbyJ6Mp449Y2jYBEYKdwRgCb7GvlKHo-TpzapeVpq-XvYyzm7FoY1EU_3bFt0bId7_Id/exec';

// Hero banner image path
const HERO_BANNER_PATH = path.resolve('C:/Users/oil_p/.gemini/antigravity-ide/brain/c36c2d90-e88c-4501-9e17-aad8e7135f98/media__1783327342583.png');

async function startServer() {
  const app = express();
  const PORT = 3000;

  console.log('Setting up Express...');
  
  // Rate Limiting: Max 100 requests per 15 minutes
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: { success: false, message: 'คำขอมากเกินไป กรุณารอสักครู่แล้วลองใหม่' }
  });
  
  app.use('/api', limiter); // Apply to /api routes
  app.use(express.json({ limit: '10mb' }));

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

  // Auth Middleware
  const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    jwt.verify(token, process.env.JWT_SECRET || 'secret', (err: any, user: any) => {
      if (err) return res.status(403).json({ success: false, message: 'Forbidden' });
      next();
    });
  };

  app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    if (
      username === process.env.ADMIN_USERNAME && 
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign({ username }, process.env.JWT_SECRET || 'secret', { expiresIn: '1h' });
      res.json({ success: true, token });
    } else {
      res.status(401).json({ success: false, message: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง' });
    }
  });

  app.post('/api/verify-code', (req, res) => {
    const { code } = req.body;
    if (code === process.env.ALUMNI_SECRET_CODE) {
      res.json({ success: true });
    } else {
      res.status(400).json({ success: false, message: 'รหัสผู้แนะนำไม่ถูกต้อง' });
    }
  });

  app.post('/api/verify-alumni', async (req, res) => {
    try {
      const response = await fetch(GAS_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'verify-alumni',
          searchId: req.body.searchId
        })
      });
      
      const text = await response.text();
      try {
        const result = JSON.parse(text);
        res.json(result);
      } catch (e) {
        console.error('GAS Error Response:', text);
        res.status(500).json({ success: false, message: 'การเชื่อมต่อกับ Google Apps Script ผิดพลาด' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'เกิดข้อผิดพลาดในการตรวจสอบข้อมูล' });
    }
  });

  app.post('/api/register', async (req, res) => {
    try {
      const formData = req.body;
      
      // Server-side validation for alumni secret code
      if (formData.userType === 'alumni') {
        if (formData.secretCode !== process.env.ALUMNI_SECRET_CODE) {
          return res.status(400).json({ success: false, message: 'รหัสลับสำหรับศิษย์เก่าไม่ถูกต้อง' });
        }
      }
      
      const response = await fetch(GAS_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'register',
          formData: formData
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
      // Client MUST send email and phone to prevent IDOR
      if (!updateData.email || !updateData.phone) {
        return res.status(400).json({ success: false, message: 'ต้องระบุอีเมลและเบอร์โทรศัพท์เพื่อยืนยันตัวตน' });
      }
      
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

  app.get('/api/dashboard', authenticateToken, async (req, res) => {
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
    console.log('Creating Vite server...');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    console.log('Vite server created, attaching middleware...');
    app.use(vite.middlewares);
  } else {
    console.log('Serving production build...');
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  console.log('Starting listener on port:', PORT);
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
