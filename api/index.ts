import express from 'express';

const app = express();
const GAS_URL = 'https://script.google.com/macros/s/AKfycbyJ6Mp449Y2jYBEYKdwRgCb7GvlKHo-TpzapeVpq-XvYyzm7FoY1EU_3bFt0bId7_Id/exec';

app.use(express.json({ limit: '50mb' }));

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

export default app;
