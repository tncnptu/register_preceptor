import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';

// Configuration — move sensitive values to environment variables in production
const GAS_URL = process.env.GAS_URL || 'https://script.google.com/macros/s/AKfycbyJ6Mp449Y2jYBEYKdwRgCb7GvlKHo-TpzapeVpq-XvYyzm7FoY1EU_3bFt0bId7_Id/exec';
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin_nptu';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin@nptu2569*';
const SECRET_CODE = process.env.SECRET_CODE || 'NPTU-MENTOR26';

// Helper: proxy requests to Google Apps Script
async function proxyToGAS(payload: object): Promise<{ status: number; body: any }> {
  try {
    const response = await fetch(GAS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const text = await response.text();
    try {
      const result = JSON.parse(text);
      return { status: 200, body: result };
    } catch (e) {
      console.error('GAS Error Response:', text);
      return { status: 500, body: { success: false, message: 'การเชื่อมต่อกับ Google Apps Script ผิดพลาด กรุณาตรวจสอบการ Deploy Code.gs' } };
    }
  } catch (error) {
    console.error(error);
    return { status: 500, body: { success: false, message: 'เกิดข้อผิดพลาดในการเชื่อมต่อเซิร์ฟเวอร์' } };
  }
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '50mb' }));

  // ===== Security: Server-side secret code verification =====
  app.post('/api/verify-secret', (req, res) => {
    const { secretCode } = req.body;
    if (secretCode === SECRET_CODE) {
      res.json({ success: true });
    } else {
      res.json({ success: false, message: 'รหัสผู้แนะนำไม่ถูกต้อง' });
    }
  });

  // ===== Security: Server-side admin authentication =====
  app.post('/api/admin-login', (req, res) => {
    const { username, password } = req.body;
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      res.json({ success: true });
    } else {
      res.json({ success: false, message: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง' });
    }
  });

  // ===== Registration =====
  app.post('/api/register', async (req, res) => {
    const result = await proxyToGAS({ action: 'register', formData: req.body });
    res.status(result.status).json(result.body);
  });

  // ===== Search =====
  app.post('/api/search', async (req, res) => {
    const result = await proxyToGAS({ action: 'search', email: req.body.email, phone: req.body.phone });
    res.status(result.status).json(result.body);
  });

  // ===== Update =====
  app.post('/api/update', async (req, res) => {
    const { id, ...updateData } = req.body;
    const result = await proxyToGAS({ action: 'update', id, updateData });
    res.status(result.status).json(result.body);
  });

  // ===== Dashboard =====
  app.get('/api/dashboard', async (req, res) => {
    const result = await proxyToGAS({ action: 'dashboard' });
    res.status(result.status).json(result.body);
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
