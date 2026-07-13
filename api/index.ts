import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import rateLimit from 'express-rate-limit';
import jwt from 'jsonwebtoken';

const app = express();
const GAS_URL = 'https://script.google.com/macros/s/AKfycbyJ6Mp449Y2jYBEYKdwRgCb7GvlKHo-TpzapeVpq-XvYyzm7FoY1EU_3bFt0bId7_Id/exec';

// Rate Limiting: Max 100 requests per 15 minutes
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { success: false, message: 'คำขอมากเกินไป กรุณารอสักครู่แล้วลองใหม่' }
});

app.use(limiter);
app.use(express.json({ limit: '10mb' }));

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
    const token = jwt.sign({ username }, process.env.JWT_SECRET || 'secret', { expiresIn: '8h' });
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

app.post('/api/check-duplicate', async (req, res) => {
  try {
    const response = await fetch(GAS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'check-duplicate',
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
      res.status(500).json({ success: false, message: 'การเชื่อมต่อกับ Google Apps Script ผิดพลาด' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'เกิดข้อผิดพลาดในการตรวจสอบข้อมูล' });
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

export default app;
