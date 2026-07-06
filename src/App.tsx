import React, { useState, useEffect } from 'react';
import { PRICING, RegistrationFormData } from './types';
import {
  Users, CreditCard, CheckCircle2, FileText, LayoutDashboard, Code,
  AlertCircle, RefreshCw, UploadCloud, ArrowRight, ArrowLeft, Copy,
  Phone, Mail, MapPin, GraduationCap, Heart, Calendar, Clock, Award
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import gasCodeRaw from './gas/Code.gs.txt?raw';
import gasHtmlRaw from './gas/index.html.txt?raw';

type Tab = 'form' | 'dashboard' | 'gas';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('form');

  return (
    <div className="min-h-screen font-sans text-slate-800">
      {/* Navigation */}
      <nav className="nav-gradient sticky top-0 z-10 shadow-lg">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center h-auto sm:h-16 py-3 sm:py-0">
            <div className="flex items-center mb-3 sm:mb-0">
              <img src="https://nurse.ptu.ac.th/wp-content/uploads/2026/07/logo-remake-N-PTU.png" alt="N-PTU Logo" className="h-10 w-auto mr-3 object-contain drop-shadow-md" />
              <div>
                <h1 className="text-base sm:text-lg font-bold text-white tracking-tight leading-tight">คณะพยาบาลศาสตร์</h1>
                <p className="text-xs text-navy-200 font-light hidden sm:block">มหาวิทยาลัยปทุมธานี</p>
              </div>
            </div>

            <div className="flex space-x-1 sm:space-x-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0 hide-scrollbar">
              <NavButton active={activeTab === 'form'} onClick={() => setActiveTab('form')} icon={<FileText className="w-4 h-4 mr-1.5" />} label="ลงทะเบียน" />
              <NavButton active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} icon={<LayoutDashboard className="w-4 h-4 mr-1.5" />} label="แดชบอร์ด" />
              <NavButton active={activeTab === 'gas'} onClick={() => setActiveTab('gas')} icon={<Code className="w-4 h-4 mr-1.5" />} label="ตั้งค่า GAS" />
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <AnimatePresence mode="wait">
          {activeTab === 'form' && (
            <motion.div key="form" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
              <RegistrationFlow />
            </motion.div>
          )}
          {activeTab === 'dashboard' && (
            <motion.div key="dashboard" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
              <Dashboard />
            </motion.div>
          )}
          {activeTab === 'gas' && (
            <motion.div key="gas" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
              <GasSetup />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-navy-100 bg-white/80 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div>
              <div className="flex items-center mb-3">
                <img src="https://nurse.ptu.ac.th/wp-content/uploads/2026/07/logo-remake-N-PTU.png" alt="N-PTU Logo" className="h-8 w-auto mr-2 object-contain" />
                <div>
                  <p className="font-semibold text-navy-700">คณะพยาบาลศาสตร์</p>
                  <p className="text-xs text-slate-500">มหาวิทยาลัยปทุมธานี</p>
                </div>
              </div>
              <p className="text-slate-500 text-xs leading-relaxed">ผลิตบัณฑิตพยาบาลที่มีคุณภาพ มีความรู้ความสามารถ และมีจริยธรรมในวิชาชีพ</p>
            </div>
            <div>
              <p className="font-semibold text-navy-700 mb-2">ติดต่อเรา</p>
              <div className="space-y-1.5 text-slate-500 text-xs">
                <p className="flex items-center"><MapPin className="w-3.5 h-3.5 mr-1.5 text-pink-500 shrink-0" />มหาวิทยาลัยปทุมธานี จ.ปทุมธานี</p>
                <p className="flex items-center"><Phone className="w-3.5 h-3.5 mr-1.5 text-pink-500 shrink-0" />02-975-6999</p>
                <p className="flex items-center"><Mail className="w-3.5 h-3.5 mr-1.5 text-pink-500 shrink-0" />nurse@ptu.ac.th</p>
              </div>
            </div>
            <div>
              <p className="font-semibold text-navy-700 mb-2">โครงการ</p>
              <p className="text-slate-500 text-xs leading-relaxed">N-PTU Preceptor Masterclass 2026 โครงการอบรมเชิงปฏิบัติการ พยาบาลพี่เลี้ยงสู่คุณภาพการเรียนการสอน</p>
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-slate-100 text-center text-xs text-slate-400">
            © 2026 คณะพยาบาลศาสตร์ มหาวิทยาลัยปทุมธานี — สงวนลิขสิทธิ์
          </div>
        </div>
      </footer>
    </div>
  );
}

function NavButton({ active, onClick, icon, label }: { active: boolean; onClick: () => void; icon: React.ReactNode; label: string }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${active
        ? 'bg-white/20 text-white shadow-sm backdrop-blur-sm'
        : 'text-navy-200 hover:text-white hover:bg-white/10'
        }`}
    >
      {icon}
      {label}
    </button>
  );
}

type FlowStep = 'welcome' | 'edit_login' | 'edit_form' | 'select_type' | 'secret_check' | 'form_general' | 'form_alumni' | 'review' | 'submitting' | 'success';

function RegistrationFlow() {
  const [step, setStep] = useState<FlowStep>('welcome');
  const [formData, setFormData] = useState<Partial<RegistrationFormData>>({ userType: null });
  const [filePreview, setFilePreview] = useState<string | null>(null);

  // Secret Check State
  const [secretCodeInput, setSecretCodeInput] = useState('');
  const [teacherInput, setTeacherInput] = useState('');
  const [secretError, setSecretError] = useState(false);

  // Edit Login State
  const [editEmail, setEditEmail] = useState('');
  const [editPhone, setEditPhone] = useState('');
  const [editSearchLoading, setEditSearchLoading] = useState(false);

  const handleTypeSelect = (type: 'general' | 'alumni') => {
    setFormData({ ...formData, userType: type });
    if (type === 'general') {
      setStep('form_general');
    } else {
      setStep('secret_check');
    }
  };

  const handleSecretCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (secretCodeInput.trim() === 'NPTU-MENTOR26' && teacherInput.trim() !== '') {
      setSecretError(false);
      setFormData({ ...formData, secretCode: secretCodeInput, referringTeacher: teacherInput });
      setStep('form_alumni');
    } else {
      setSecretError(true);
    }
  };

  const handleEditSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setEditSearchLoading(true);
    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: editEmail, phone: editPhone })
      });
      const result = await response.json();
      if (result.success) {
        setFormData(result.data);
        if (result.data.slipUrl) {
          setFilePreview(result.data.slipUrl);
        }
        setStep('edit_form');
      } else {
        alert(result.message);
      }
    } catch (error) {
      alert('เกิดข้อผิดพลาดในการเชื่อมต่อเซิร์ฟเวอร์');
    } finally {
      setEditSearchLoading(false);
    }
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStep('submitting');
    try {
      let base64Data = '';
      if (formData.userType === 'general' && formData.slipFile && formData.slipFile instanceof File) {
        base64Data = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = (e) => resolve((e.target?.result as string).split(',')[1]);
          reader.onerror = (e) => reject(e);
          reader.readAsDataURL(formData.slipFile!);
        });
      }

      const payload = {
        ...formData,
        slipFile: formData.slipFile instanceof File ? {
          filename: formData.slipFile.name,
          mimeType: formData.slipFile.type,
          data: base64Data
        } : undefined // Do not overwrite if not changed
      };

      const response = await fetch('/api/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const result = await response.json();
      if (result.success) {
        setStep('success');
      } else {
        alert('เกิดข้อผิดพลาด: ' + result.message);
        setStep('edit_form');
      }
    } catch (error) {
      console.error(error);
      alert('เกิดข้อผิดพลาดในการเชื่อมต่อเซิร์ฟเวอร์');
      setStep('edit_form');
    }
  };

  const handleGeneralSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.email || !formData.lineId || !formData.licenseNumber || !formData.licenseExpiry || !formData.slipFile) {
      alert('กรุณากรอกข้อมูลและแนบสลิปให้ครบถ้วน');
      return;
    }
    setStep('review');
  };

  const handleAlumniSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.email || !formData.lineId || !formData.licenseNumber || !formData.licenseExpiry) {
      alert('กรุณากรอกข้อมูลให้ครบถ้วน');
      return;
    }
    setStep('review');
  };

  const handleSubmitData = async () => {
    setStep('submitting');
    try {
      let base64Data = '';
      if (formData.userType === 'general' && formData.slipFile) {
        base64Data = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = (e) => resolve((e.target?.result as string).split(',')[1]);
          reader.onerror = (e) => reject(e);
          reader.readAsDataURL(formData.slipFile!);
        });
      }

      const payload = {
        ...formData,
        slipFile: formData.slipFile ? {
          filename: formData.slipFile.name,
          mimeType: formData.slipFile.type,
          data: base64Data
        } : null
      };

      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const result = await response.json();
      if (result.success) {
        setStep('success');
      } else {
        alert('เกิดข้อผิดพลาด: ' + result.message);
        setStep('review');
      }
    } catch (error) {
      console.error(error);
      alert('เกิดข้อผิดพลาดในการเชื่อมต่อเซิร์ฟเวอร์');
      setStep('review');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, slipFile: file });
      if (file.type.startsWith('image/')) {
        setFilePreview(URL.createObjectURL(file));
      } else {
        setFilePreview(null);
      }
    }
  };

  const progressWidth = () => {
    switch (step) {
      case 'select_type': return '15%';
      case 'secret_check': return '30%';
      case 'form_general':
      case 'form_alumni': return '60%';
      case 'review': return '90%';
      case 'submitting':
      case 'success': return '100%';
      case 'edit_form': return '50%';
      default: return '0%';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md border border-slate-100 overflow-hidden">
      {/* Progress Bar */}
      <div className="h-1.5 bg-navy-50 w-full flex">
        <div className="h-full bg-gradient-to-r from-navy-500 to-pink-500 transition-all duration-500 rounded-r-full" style={{ width: progressWidth() }} />
      </div>

      <div className="p-6 sm:p-10">
        <AnimatePresence mode="wait">
          {step === 'welcome' && (
            <motion.div key="welcome" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.05 }} className="space-y-6">

              {/* Hero Banner */}
              <div className="hero-banner-container -mx-6 sm:-mx-10 -mt-6 sm:-mt-10 mb-8">
                <img
                  src="https://img2.pic.in.th/banner-hero.png"
                  alt="โครงการอบรมเชิงปฏิบัติการ พยาบาลพี่เลี้ยงสู่คุณภาพการเรียนการสอน Online"
                  className="w-full h-auto object-cover"
                />
              </div>

              {/* Badge */}
              <div className="flex justify-center -mt-4">
                <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-semibold bg-gradient-to-r from-pink-500 to-pink-600 text-white shadow-md animate-pulse-soft">
                  <Heart className="w-4 h-4 mr-1.5" /> เปิดรับสมัครแล้ววันนี้
                </span>
              </div>

              {/* Title */}
              <div className="text-center">
                <h2 className="text-2xl sm:text-3xl font-bold text-navy-700 mb-3">ลงทะเบียนอบรมเชิงปฏิบัติการ</h2>
                <p className="text-slate-500 text-base max-w-lg mx-auto leading-relaxed">N-PTU Preceptor Masterclass 2026<br />พยาบาลพี่เลี้ยงสู่คุณภาพด้านการเรียนการสอน</p>
              </div>

              {/* Info Cards */}
              <div className="grid grid-cols-3 gap-3 max-w-md mx-auto">
                <div className="text-center p-3 rounded-xl bg-navy-50 border border-navy-100">
                  <Calendar className="w-5 h-5 mx-auto mb-1.5 text-navy-500" />
                  <p className="text-xs font-medium text-navy-600">อบรม Online</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">ผ่านระบบออนไลน์</p>
                </div>
                <div className="text-center p-3 rounded-xl bg-pink-50 border border-pink-100">
                  <Award className="w-5 h-5 mx-auto mb-1.5 text-pink-500" />
                  <p className="text-xs font-medium text-pink-600">ได้รับวุฒิบัตร</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">เมื่อเสร็จสิ้นโครงการ</p>
                </div>
                <div className="text-center p-3 rounded-xl bg-emerald-50 border border-emerald-100">
                  <GraduationCap className="w-5 h-5 mx-auto mb-1.5 text-emerald-500" />
                  <p className="text-xs font-medium text-emerald-600">CNEU</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">หน่วยคะแนนสภาฯ</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-xl mx-auto pt-2">
                <button onClick={() => setStep('select_type')} className="card-hover flex flex-col items-center justify-center p-6 rounded-2xl border-2 border-navy-200 bg-gradient-to-br from-navy-50 to-white hover:border-navy-400 transition-all shadow-sm focus:outline-none group">
                  <div className="w-14 h-14 bg-navy-100 text-navy-600 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <FileText className="w-7 h-7" />
                  </div>
                  <span className="text-lg font-bold text-navy-700">ลงทะเบียนอบรมฯ</span>
                  <span className="text-xs text-slate-500 mt-1">สำหรับผู้สมัครใหม่</span>
                </button>
                <button onClick={() => setStep('edit_login')} className="card-hover flex flex-col items-center justify-center p-6 rounded-2xl border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-white hover:border-amber-400 transition-all shadow-sm focus:outline-none group">
                  <div className="w-14 h-14 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <RefreshCw className="w-7 h-7" />
                  </div>
                  <span className="text-lg font-bold text-amber-700">แก้ไขข้อมูล</span>
                  <span className="text-xs text-slate-500 mt-1">(ผู้ลงทะเบียนแล้ว)</span>
                </button>
              </div>
            </motion.div>
          )}

          {step === 'edit_login' && (
            <motion.form key="edit_login" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} onSubmit={handleEditSearch} className="space-y-6 max-w-md mx-auto">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <RefreshCw className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-bold text-navy-700">ค้นหาข้อมูลของคุณ</h2>
                <p className="text-slate-500 mt-2">กรุณากรอกอีเมลและเบอร์โทรศัพท์ที่ใช้ลงทะเบียน</p>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-navy-700 mb-1">อีเมลที่ใช้ลงทะเบียน <span className="text-pink-500">*</span></label>
                  <input type="email" required value={editEmail} onChange={(e) => setEditEmail(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-navy-300 focus:border-navy-400 transition-colors bg-slate-50/50" placeholder="อีเมลของคุณ" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-navy-700 mb-1">เบอร์โทรศัพท์ <span className="text-pink-500">*</span></label>
                  <input type="tel" required value={editPhone} onChange={(e) => setEditPhone(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-navy-300 focus:border-navy-400 transition-colors bg-slate-50/50" placeholder="เบอร์โทรศัพท์" />
                </div>
              </div>
              <div className="pt-6 flex space-x-4">
                <button type="button" onClick={() => setStep('welcome')} className="w-1/3 flex items-center justify-center py-3 px-4 border border-slate-200 rounded-xl shadow-sm text-base font-medium text-slate-600 bg-white hover:bg-slate-50 transition-colors">
                  <ArrowLeft className="mr-2 w-5 h-5" /> กลับ
                </button>
                <button type="submit" disabled={editSearchLoading} className="w-2/3 flex items-center justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-base font-medium text-white bg-amber-500 hover:bg-amber-600 disabled:opacity-50 transition-colors">
                  {editSearchLoading ? <RefreshCw className="w-5 h-5 animate-spin" /> : 'ค้นหาข้อมูล'}
                </button>
              </div>
            </motion.form>
          )}

          {step === 'select_type' && (
            <motion.div key="select_type" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-navy-700">เลือกประเภทผู้สมัคร</h2>
                <p className="text-slate-500 mt-2">กรุณาเลือกประเภทผู้สมัครเพื่อดำเนินการต่อ</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button onClick={() => handleTypeSelect('general')} className="card-hover flex flex-col items-center justify-center p-8 rounded-xl border-2 border-slate-200 bg-white hover:bg-navy-50 hover:border-navy-300 transition-all shadow-sm focus:outline-none">
                  <div className="w-12 h-12 bg-navy-100 text-navy-600 rounded-full flex items-center justify-center mb-3">
                    <Users className="w-6 h-6" />
                  </div>
                  <span className="text-lg font-bold text-navy-700">บุคคลทั่วไป</span>
                </button>
                <button onClick={() => handleTypeSelect('alumni')} className="card-hover flex flex-col items-center justify-center p-8 rounded-xl border-2 border-slate-200 bg-white hover:bg-pink-50 hover:border-pink-300 transition-all shadow-sm focus:outline-none">
                  <div className="w-12 h-12 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center mb-3">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <span className="text-lg font-bold text-navy-700">ศิษย์เก่า / พยาบาลพี่เลี้ยง</span>
                </button>
              </div>
              <div className="pt-4 flex justify-center">
                <button type="button" onClick={() => setStep('welcome')} className="text-sm font-medium text-slate-400 hover:text-navy-600 transition-colors">
                  ← ยกเลิกและกลับหน้าแรก
                </button>
              </div>
            </motion.div>
          )}

          {step === 'secret_check' && (
            <motion.form key="secret_check" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} onSubmit={handleSecretCheck} className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-navy-700">ยืนยันสิทธิ์ศิษย์เก่า/พยาบาลพี่เลี้ยง</h2>
                <p className="text-slate-500 mt-2">กรุณากรอกรหัสผู้แนะนำและชื่ออาจารย์ผู้แนะนำ</p>
              </div>
              {secretError && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-start">
                  <AlertCircle className="w-5 h-5 mr-2 shrink-0 mt-0.5" />
                  <p className="text-sm">รหัสผู้แนะนำไม่ถูกต้อง หรือ ลืมกรอกชื่ออาจารย์ผู้แนะนำ กรุณาตรวจสอบอีกครั้ง</p>
                </motion.div>
              )}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-navy-700 mb-1">รหัสผู้แนะนำ<span className="text-pink-500">*</span></label>
                  <input type="text" required value={secretCodeInput} onChange={(e) => setSecretCodeInput(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-navy-300 focus:border-navy-400 transition-colors bg-slate-50/50" placeholder="ระบุรหัสผู้นแนะนำ" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-navy-700 mb-1">ชื่ออาจารย์ผู้แนะนำ <span className="text-pink-500">*</span></label>
                  <input type="text" required value={teacherInput} onChange={(e) => setTeacherInput(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-navy-300 focus:border-navy-400 transition-colors bg-slate-50/50" placeholder="ชื่อ-นามสกุล อาจารย์ผู้แนะนำ" />
                </div>
              </div>
              <div className="pt-6 flex space-x-4">
                <button type="button" onClick={() => setStep('select_type')} className="w-1/3 flex items-center justify-center py-3 px-4 border border-slate-200 rounded-xl shadow-sm text-base font-medium text-slate-600 bg-white hover:bg-slate-50 transition-colors">
                  <ArrowLeft className="mr-2 w-5 h-5" /> กลับ
                </button>
                <button type="submit" className="w-2/3 flex items-center justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-base font-medium text-white btn-primary-gradient">
                  ตรวจสอบ <ArrowRight className="ml-2 w-5 h-5" />
                </button>
              </div>
            </motion.form>
          )}

          {step === 'form_general' && (
            <motion.form key="form_general" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} onSubmit={handleGeneralSubmit} className="space-y-6">
              <div className="text-center mb-8">
                <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-navy-50 text-navy-600 border border-navy-100 mb-3">
                  <Users className="w-3.5 h-3.5 mr-1" /> บุคคลทั่วไป
                </div>
                <h2 className="text-2xl font-bold text-navy-700">ข้อมูลลงทะเบียน</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-navy-700 mb-1">ชื่อ-นามสกุล <span className="text-pink-500">*</span></label>
                  <input type="text" required value={formData.name || ''} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-navy-300 focus:border-navy-400 bg-slate-50/50" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-navy-700 mb-1">เบอร์โทรศัพท์ <span className="text-pink-500">*</span></label>
                    <input type="tel" required value={formData.phone || ''} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-navy-300 focus:border-navy-400 bg-slate-50/50" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-navy-700 mb-1">ID Line <span className="text-pink-500">*</span></label>
                    <input type="text" required value={formData.lineId || ''} onChange={(e) => setFormData({ ...formData, lineId: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-navy-300 focus:border-navy-400 bg-slate-50/50" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-navy-700 mb-1">อีเมล <span className="text-pink-500">*</span></label>
                  <input type="email" required value={formData.email || ''} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-navy-300 focus:border-navy-400 bg-slate-50/50" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-navy-700 mb-1">เลขที่ใบประกอบวิชาชีพ <span className="text-pink-500">*</span></label>
                    <input type="text" required value={formData.licenseNumber || ''} onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-navy-300 focus:border-navy-400 bg-slate-50/50" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-navy-700 mb-1">วันหมดอายุใบประกอบวิชาชีพ <span className="text-pink-500">*</span></label>
                    <input type="date" required value={formData.licenseExpiry || ''} onChange={(e) => setFormData({ ...formData, licenseExpiry: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-navy-300 focus:border-navy-400 bg-slate-50/50" />
                  </div>
                </div>

                {/* Payment Info Card */}
                <div className="bg-gradient-to-br from-navy-50 to-pink-50 border border-navy-200 rounded-2xl p-6 my-6 flex flex-col items-center text-center">
                  <h3 className="font-bold text-navy-800 mb-4 flex items-center justify-center w-full">
                    <CreditCard className="w-5 h-5 mr-2 text-pink-500" /> บัญชีสำหรับการโอนชำระค่าสมัคร
                  </h3>
                  <div className="text-center mb-4">
                    <span className="bg-gradient-to-r from-pink-500 to-pink-600 text-white text-lg font-bold px-5 py-2 rounded-full shadow-md inline-block">
                      ยอดชำระ 1,000 บาท
                    </span>
                  </div>
                  <img src="https://moneyexpo.net/wp-content/uploads/2023/06/BBL.jpg" alt="Bangkok Bank Logo" className="w-14 h-14 rounded-full object-cover mb-4 border-2 border-white shadow-md" />
                  <div className="space-y-2 text-sm text-navy-700 w-full">
                    <p>ชื่อบัญชี: <strong className="font-semibold text-navy-800 text-base">มหาวิทยาลัยปทุมธานี</strong></p>
                    <p>ธนาคาร: <strong className="font-semibold text-navy-800 text-base">กรุงเทพ</strong></p>
                    <div className="pt-2 flex flex-col items-center">
                      <p className="mb-1 text-navy-600">เลขที่บัญชี:</p>
                      <div className="flex items-center justify-center space-x-2 bg-white px-4 py-2 rounded-xl border border-navy-200 shadow-sm inline-flex">
                        <strong className="font-semibold text-2xl text-navy-800 tracking-wider">011-7-167395</strong>
                        <button
                          type="button"
                          onClick={() => {
                            navigator.clipboard.writeText('0117167395');
                            alert('คัดลอกเลขบัญชี 011-7-167395 แล้ว');
                          }}
                          className="p-2 text-pink-500 hover:text-pink-700 hover:bg-pink-50 rounded-lg transition-colors"
                          title="คัดลอกเลขบัญชี"
                        >
                          <Copy className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-navy-700 mb-2">อัปโหลดหลักฐานการชำระเงิน <span className="text-pink-500">*</span></label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-navy-200 border-dashed rounded-xl bg-navy-50/30 hover:bg-navy-50 transition-colors">
                    <div className="space-y-1 text-center">
                      {!filePreview && !formData.slipFile && <UploadCloud className="mx-auto h-12 w-12 text-navy-300" />}
                      {filePreview && <div className="mb-4"><img src={filePreview} alt="Slip preview" className="mx-auto h-48 object-contain rounded-lg shadow-sm border border-slate-200" /></div>}
                      {formData.slipFile && !filePreview && <div className="mb-4 flex flex-col items-center"><FileText className="h-12 w-12 text-pink-500 mb-2" /><span className="text-sm font-medium text-navy-800">{formData.slipFile.name}</span></div>}
                      <div className="flex text-sm text-slate-600 justify-center">
                        <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-lg font-medium text-navy-600 hover:text-navy-800 px-4 py-1.5 shadow-sm border border-navy-200 transition-colors">
                          <span>อัปโหลดไฟล์</span>
                          <input id="file-upload" type="file" accept="image/*,.pdf" className="sr-only" onChange={handleFileChange} />
                        </label>
                      </div>
                      <p className="text-xs text-slate-400 mt-2">PNG, JPG, หรือ PDF</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="pt-6 flex space-x-4">
                <button type="button" onClick={() => setStep('select_type')} className="w-1/3 flex items-center justify-center py-3 px-4 border border-slate-200 rounded-xl shadow-sm text-base font-medium text-slate-600 bg-white hover:bg-slate-50 transition-colors">กลับ</button>
                <button type="submit" className="w-2/3 flex items-center justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-base font-medium text-white btn-primary-gradient">ถัดไป <ArrowRight className="ml-2 w-5 h-5" /></button>
              </div>
            </motion.form>
          )}

          {step === 'form_alumni' && (
            <motion.form key="form_alumni" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} onSubmit={handleAlumniSubmit} className="space-y-6">
              <div className="text-center mb-8">
                <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-pink-50 text-pink-600 border border-pink-100 mb-3">
                  <GraduationCap className="w-3.5 h-3.5 mr-1" /> ศิษย์เก่า / พยาบาลพี่เลี้ยง
                </div>
                <h2 className="text-2xl font-bold text-navy-700">ข้อมูลลงทะเบียน</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-navy-700 mb-1">ชื่อ-นามสกุล <span className="text-pink-500">*</span></label>
                  <p className="text-xs text-slate-400 mb-2">กรณีมีการเปลี่ยนแปลงชื่อ-นามสกุล กรุณาวงเล็บชื่อนามสกุลเดิม</p>
                  <input type="text" required value={formData.name || ''} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-navy-300 focus:border-navy-400 bg-slate-50/50" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-navy-700 mb-1">เบอร์โทรติดต่อ <span className="text-pink-500">*</span></label>
                    <input type="tel" required value={formData.phone || ''} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-navy-300 focus:border-navy-400 bg-slate-50/50" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-navy-700 mb-1">ID Line <span className="text-pink-500">*</span></label>
                    <input type="text" required value={formData.lineId || ''} onChange={(e) => setFormData({ ...formData, lineId: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-navy-300 focus:border-navy-400 bg-slate-50/50" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-navy-700 mb-1">อีเมลที่ใช้งานจริง <span className="text-pink-500">*</span></label>
                  <p className="text-xs text-slate-400 mb-2">รับข้อมูลจากคณะฯ ช่องทางการเข้าห้องอบรม ระเบียบการอบรม ฯ</p>
                  <input type="email" required value={formData.email || ''} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-navy-300 focus:border-navy-400 bg-slate-50/50" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-navy-700 mb-1">เลขที่ใบประกอบวิชาชีพ <span className="text-pink-500">*</span></label>
                    <input type="text" required value={formData.licenseNumber || ''} onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-navy-300 focus:border-navy-400 bg-slate-50/50" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-navy-700 mb-1">วันหมดอายุใบประกอบวิชาชีพ <span className="text-pink-500">*</span></label>
                    <input type="date" required value={formData.licenseExpiry || ''} onChange={(e) => setFormData({ ...formData, licenseExpiry: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-navy-300 focus:border-navy-400 bg-slate-50/50" />
                  </div>
                </div>
              </div>
              <div className="pt-6 flex space-x-4">
                <button type="button" onClick={() => setStep('secret_check')} className="w-1/3 flex items-center justify-center py-3 px-4 border border-slate-200 rounded-xl shadow-sm text-base font-medium text-slate-600 bg-white hover:bg-slate-50 transition-colors">กลับ</button>
                <button type="submit" className="w-2/3 flex items-center justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-base font-medium text-white btn-accent-gradient">ถัดไป <ArrowRight className="ml-2 w-5 h-5" /></button>
              </div>
            </motion.form>
          )}

          {step === 'edit_form' && (
            <motion.form key="edit_form" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} onSubmit={handleEditSubmit} className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-navy-700">แก้ไขข้อมูลการลงทะเบียน</h2>
                <p className="text-slate-500 mt-2">คุณสามารถปรับปรุงข้อมูลด้านล่างแล้วกดยืนยัน</p>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-navy-700 mb-1">ชื่อ-นามสกุล <span className="text-pink-500">*</span></label>
                  <input type="text" required value={formData.name || ''} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-navy-300 focus:border-navy-400 bg-slate-50/50" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-navy-700 mb-1">เบอร์โทรติดต่อ <span className="text-pink-500">*</span></label>
                    <input type="tel" required value={formData.phone || ''} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-navy-300 focus:border-navy-400 bg-slate-50/50" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-navy-700 mb-1">อีเมล <span className="text-pink-500">*</span></label>
                    <input type="email" required value={formData.email || ''} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-navy-300 focus:border-navy-400 bg-slate-50/50" />
                  </div>
                </div>

                {formData.userType === 'alumni' && (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-navy-700 mb-1">ID Line <span className="text-pink-500">*</span></label>
                        <input type="text" required value={formData.lineId || ''} onChange={(e) => setFormData({ ...formData, lineId: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-navy-300 focus:border-navy-400 bg-slate-50/50" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-navy-700 mb-1">ชื่ออาจารย์ผู้แนะนำ <span className="text-pink-500">*</span></label>
                        <input type="text" required value={formData.referringTeacher || ''} onChange={(e) => setFormData({ ...formData, referringTeacher: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-navy-300 focus:border-navy-400 bg-slate-50/50" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-navy-700 mb-1">เลขที่ใบประกอบวิชาชีพ <span className="text-pink-500">*</span></label>
                        <input type="text" required value={formData.licenseNumber || ''} onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-navy-300 focus:border-navy-400 bg-slate-50/50" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-navy-700 mb-1">วันหมดอายุใบประกอบวิชาชีพ <span className="text-pink-500">*</span></label>
                        <input type="date" required value={formData.licenseExpiry || ''} onChange={(e) => setFormData({ ...formData, licenseExpiry: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-navy-300 focus:border-navy-400 bg-slate-50/50" />
                      </div>
                    </div>
                  </>
                )}

                {formData.userType === 'general' && (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-navy-700 mb-1">ID Line <span className="text-pink-500">*</span></label>
                        <input type="text" required value={formData.lineId || ''} onChange={(e) => setFormData({ ...formData, lineId: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-navy-300 focus:border-navy-400 bg-slate-50/50" />
                      </div>
                      <div>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-navy-700 mb-1">เลขที่ใบประกอบวิชาชีพ <span className="text-pink-500">*</span></label>
                        <input type="text" required value={formData.licenseNumber || ''} onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-navy-300 focus:border-navy-400 bg-slate-50/50" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-navy-700 mb-1">วันหมดอายุใบประกอบวิชาชีพ <span className="text-pink-500">*</span></label>
                        <input type="date" required value={formData.licenseExpiry || ''} onChange={(e) => setFormData({ ...formData, licenseExpiry: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-navy-300 focus:border-navy-400 bg-slate-50/50" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-navy-700 mb-2">อัปโหลดหลักฐานการชำระเงินใหม่ (ถ้าต้องการเปลี่ยน)</label>
                      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-navy-200 border-dashed rounded-xl bg-navy-50/30 hover:bg-navy-50 transition-colors">
                        <div className="space-y-1 text-center">
                          {!filePreview && <UploadCloud className="mx-auto h-12 w-12 text-navy-300" />}
                          {filePreview && <div className="mb-4"><img src={filePreview} alt="Slip preview" className="mx-auto h-48 object-contain rounded-lg shadow-sm border border-slate-200" /></div>}
                          <div className="flex text-sm text-slate-600 justify-center">
                            <label htmlFor="file-upload-edit" className="relative cursor-pointer bg-white rounded-lg font-medium text-navy-600 hover:text-navy-800 px-4 py-1.5 shadow-sm border border-navy-200 transition-colors">
                              <span>เปลี่ยนไฟล์ใหม่</span>
                              <input id="file-upload-edit" type="file" accept="image/*,.pdf" className="sr-only" onChange={handleFileChange} />
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}

              </div>
              <div className="pt-6 flex space-x-4">
                <button type="button" onClick={() => setStep('welcome')} className="w-1/3 flex items-center justify-center py-3 px-4 border border-slate-200 rounded-xl shadow-sm text-base font-medium text-slate-600 bg-white hover:bg-slate-50 transition-colors">ยกเลิก</button>
                <button type="submit" className="w-2/3 flex items-center justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-base font-medium text-white bg-amber-500 hover:bg-amber-600 transition-colors">
                  <CheckCircle2 className="mr-2 w-5 h-5" /> บันทึกการแก้ไข
                </button>
              </div>
            </motion.form>
          )}

          {step === 'review' && (
            <motion.div key="review" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-navy-700">ตรวจสอบข้อมูลการลงทะเบียน</h2>
                <div className="mt-4 bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start text-left">
                  <AlertCircle className="w-5 h-5 text-amber-600 mr-3 shrink-0 mt-0.5" />
                  <p className="text-sm text-amber-800">กรุณาตรวจสอบความถูกต้องของข้อมูล หากถูกต้องครบถ้วนแล้ว ให้กดปุ่ม "ยืนยันการลงทะเบียน"</p>
                </div>
              </div>

              <div className="bg-navy-50/50 rounded-2xl p-6 border border-navy-100">
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6">
                  <div className="sm:col-span-2">
                    <dt className="text-sm font-medium text-slate-500">ประเภทผู้สมัคร</dt>
                    <dd className="mt-1 text-base font-semibold text-navy-800">{formData.userType === 'general' ? 'บุคคลทั่วไป' : 'ศิษย์เก่า / พยาบาลพี่เลี้ยง'}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-slate-500">ชื่อ-นามสกุล</dt>
                    <dd className="mt-1 text-base font-semibold text-navy-800">{formData.name}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-slate-500">เบอร์โทรศัพท์</dt>
                    <dd className="mt-1 text-base font-semibold text-navy-800">{formData.phone}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-slate-500">อีเมล</dt>
                    <dd className="mt-1 text-base font-semibold text-navy-800">{formData.email}</dd>
                  </div>

                  <div>
                    <dt className="text-sm font-medium text-slate-500">ID Line</dt>
                    <dd className="mt-1 text-base font-semibold text-navy-800">{formData.lineId}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-slate-500">เลขที่ใบประกอบวิชาชีพ</dt>
                    <dd className="mt-1 text-base font-semibold text-navy-800">{formData.licenseNumber}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-slate-500">วันหมดอายุใบประกอบวิชาชีพ</dt>
                    <dd className="mt-1 text-base font-semibold text-navy-800">{formData.licenseExpiry}</dd>
                  </div>

                  {formData.userType === 'general' && formData.slipFile && (
                    <div className="sm:col-span-2 pt-4 border-t border-navy-100">
                      <dt className="text-sm font-medium text-slate-500 mb-2">ไฟล์หลักฐานการชำระเงิน</dt>
                      <dd className="mt-1 flex items-center p-3 bg-white border border-slate-200 rounded-xl">
                        <FileText className="w-5 h-5 text-pink-400 mr-3" />
                        <span className="text-sm text-navy-800 truncate">{formData.slipFile.name}</span>
                      </dd>
                    </div>
                  )}

                  {formData.userType === 'alumni' && (
                    <div className="sm:col-span-2 pt-4 border-t border-navy-100">
                      <dt className="text-sm font-medium text-slate-500">ชื่ออาจารย์ผู้แนะนำ</dt>
                      <dd className="mt-1 text-base font-semibold text-navy-800">{formData.referringTeacher}</dd>
                    </div>
                  )}
                </dl>
              </div>

              <div className="flex space-x-4">
                <button onClick={() => setStep(formData.userType === 'general' ? 'form_general' : 'form_alumni')} className="w-1/3 flex items-center justify-center py-3 px-4 border border-slate-200 rounded-xl shadow-sm text-base font-medium text-slate-600 bg-white hover:bg-slate-50 transition-colors">กลับไปแก้ไข</button>
                <button onClick={handleSubmitData} className="w-2/3 flex items-center justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-base font-medium text-white bg-emerald-600 hover:bg-emerald-700 transition-colors">
                  <CheckCircle2 className="mr-2 w-5 h-5" /> ยืนยันการลงทะเบียน
                </button>
              </div>
            </motion.div>
          )}

          {step === 'submitting' && (
            <motion.div key="submitting" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center py-16 text-center">
              <div className="relative mb-8">
                <div className="w-16 h-16 border-4 border-navy-100 rounded-full"></div>
                <div className="w-16 h-16 border-4 border-navy-500 rounded-full border-t-transparent animate-spin absolute top-0 left-0"></div>
              </div>
              <h3 className="text-xl font-bold text-navy-700">กำลังบันทึกข้อมูล...</h3>
              <p className="text-slate-400 mt-2 text-sm">กรุณารอสักครู่</p>
            </motion.div>
          )}

          {step === 'success' && (
            <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center text-center py-12">
              <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
                <CheckCircle2 className="w-10 h-10 text-emerald-600" />
              </div>
              <h2 className="text-3xl font-bold text-navy-700 mb-2">ลงทะเบียนสำเร็จ!</h2>
              <p className="text-slate-500 mb-8 max-w-sm mx-auto">ระบบได้บันทึกข้อมูลของคุณเรียบร้อยแล้ว</p>
              <button onClick={() => window.location.reload()} className="py-3 px-6 border border-transparent rounded-xl shadow-sm text-base font-medium text-white btn-primary-gradient">กลับหน้าหลัก</button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function Dashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin_nptu' && password === 'admin@nptu2569*') {
      setIsAuthenticated(true);
      setLoginError(false);
      fetchDashboard();
    } else {
      setLoginError(true);
    }
  };

  const fetchDashboard = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/dashboard');
      const json = await res.json();
      if (json.success) setData(json.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto mt-12 bg-white p-8 rounded-2xl shadow-md border border-slate-100">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-navy-100 text-navy-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <LayoutDashboard className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-navy-700">เข้าสู่ระบบสำหรับผู้ดูแล</h2>
          <p className="text-slate-500 mt-2">กรุณาเข้าสู่ระบบเพื่อดูข้อมูลแดชบอร์ด</p>
        </div>

        {loginError && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm flex items-start">
            <AlertCircle className="w-5 h-5 mr-2 shrink-0 mt-0.5" />
            <p>ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง</p>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-navy-700 mb-1">ชื่อผู้ใช้ (Username)</label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-navy-300 focus:border-navy-400 transition-colors bg-slate-50/50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-navy-700 mb-1">รหัสผ่าน (Password)</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-navy-300 focus:border-navy-400 transition-colors bg-slate-50/50"
            />
          </div>
          <button type="submit" className="w-full mt-6 py-3 px-4 border border-transparent rounded-xl shadow-sm text-base font-medium text-white btn-primary-gradient">
            เข้าสู่ระบบ
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end mb-6">
        <div>
          <h2 className="text-2xl font-bold text-navy-700">แดชบอร์ดสรุปผล</h2>
          <p className="text-slate-500 mt-1">ภาพรวมการลงทะเบียน (เฉพาะผู้ดูแลระบบ)</p>
        </div>
        <button onClick={fetchDashboard} disabled={loading} className="flex items-center px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-50 transition-colors">
          <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} /> รีเฟรช
        </button>
      </div>

      {loading && !data ? (
        <div className="bg-white rounded-2xl shadow-md border border-slate-100 p-12 flex justify-center">
          <div className="w-8 h-8 border-4 border-navy-500 rounded-full border-t-transparent animate-spin"></div>
        </div>
      ) : data ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-2xl shadow-md border border-slate-100 p-6 flex flex-col items-center justify-center text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5"><Users className="w-24 h-24 text-navy-600" /></div>
              <h3 className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-2 z-10">ผู้สมัครทั้งหมด (คน)</h3>
              <p className="text-5xl font-bold text-navy-600 z-10">{data.total}</p>
            </div>
            <div className="bg-white rounded-2xl shadow-md border border-slate-100 p-6 flex flex-col items-center justify-center text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5"><CreditCard className="w-24 h-24 text-emerald-600" /></div>
              <h3 className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-2 z-10">รายได้โดยประมาณ (บาท)</h3>
              <p className="text-5xl font-bold text-emerald-600 z-10">฿{data.revenue.toLocaleString()}</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-md border border-slate-100 overflow-hidden">
            <div className="px-6 py-5 border-b border-slate-100 bg-navy-50/50">
              <h3 className="text-base font-semibold text-navy-800">แบ่งตามประเภทผู้สมัคร</h3>
            </div>
            <div className="divide-y divide-slate-100">
              <div className="px-6 py-5 flex items-center justify-between">
                <div className="flex items-center"><div className="w-3 h-3 bg-navy-500 rounded-full mr-3"></div><span className="text-sm font-medium text-navy-800">บุคคลทั่วไป</span></div>
                <div className="flex items-baseline"><span className="text-2xl font-semibold text-navy-800">{data.general}</span><span className="ml-2 text-sm text-slate-500">คน</span></div>
              </div>
              <div className="px-6 py-5 flex items-center justify-between">
                <div className="flex items-center"><div className="w-3 h-3 bg-pink-500 rounded-full mr-3"></div><span className="text-sm font-medium text-navy-800">ศิษย์เก่า / พยาบาลพี่เลี้ยง</span></div>
                <div className="flex items-baseline"><span className="text-2xl font-semibold text-navy-800">{data.alumni}</span><span className="ml-2 text-sm text-slate-500">คน</span></div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}

function GasSetup() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-md border border-slate-100 p-6 sm:p-8">
        <h2 className="text-2xl font-bold text-navy-700 mb-2">คำแนะนำการติดตั้ง Google Apps Script (GAS)</h2>
        <p className="text-slate-500 mb-8">แอปพลิเคชันที่คุณเห็นในหน้านี้ทำงานบนสภาพแวดล้อมจำลอง หากต้องการนำระบบนี้ไปใช้งานจริงผ่าน Google Sheets ให้ทำตามขั้นตอนด้านล่างนี้</p>
        <div className="space-y-8">
          <div className="relative pl-10">
            <div className="absolute left-0 top-0.5 w-7 h-7 bg-navy-100 text-navy-700 rounded-full flex items-center justify-center font-bold text-sm">1</div>
            <h3 className="text-lg font-bold text-navy-800 mb-2">เตรียมพื้นที่ใน Google Drive</h3>
            <ul className="list-disc pl-5 space-y-2 text-slate-600 text-sm">
              <li>สร้าง Google Sheets ใหม่หนึ่งไฟล์ (ระบบจะสร้าง Sheet1 ให้เอง)</li>
              <li>สร้าง Folder ใหม่ใน Drive สำหรับเก็บภาพสลิปที่อัปโหลด</li>
              <li>คัดลอก Folder ID จาก URL เตรียมไว้สำหรับใส่ในโค้ด</li>
            </ul>
          </div>
          <div className="relative pl-10">
            <div className="absolute left-0 top-0.5 w-7 h-7 bg-navy-100 text-navy-700 rounded-full flex items-center justify-center font-bold text-sm">2</div>
            <h3 className="text-lg font-bold text-navy-800 mb-2">สร้างไฟล์ Script</h3>
            <ul className="list-disc pl-5 space-y-2 text-slate-600 text-sm">
              <li>ในหน้า Google Sheets ไปที่เมนู <strong>ส่วนขยาย (Extensions)</strong> &gt; <strong>Apps Script</strong></li>
              <li>คัดลอกโค้ด <code className="bg-navy-50 text-navy-700 px-1 py-0.5 rounded text-xs">Code.gs</code> ด้านล่าง ไปวางทับในไฟล์ <strong>Code.gs</strong></li>
              <li>สร้างไฟล์ HTML ใหม่ตั้งชื่อ <strong>index</strong> (จะได้เป็น index.html) และคัดลอกโค้ดไปวาง</li>
            </ul>
          </div>
          <div className="relative pl-10">
            <div className="absolute left-0 top-0.5 w-7 h-7 bg-navy-100 text-navy-700 rounded-full flex items-center justify-center font-bold text-sm">3</div>
            <h3 className="text-lg font-bold text-navy-800 mb-2">Deploy ระบบ</h3>
            <ul className="list-disc pl-5 space-y-2 text-slate-600 text-sm">
              <li>เลือกฟังก์ชัน <strong>setupSheet</strong> แล้วกด <strong>เรียกใช้ (Run)</strong> 1 ครั้ง เพื่อสร้างหัวคอลัมน์</li>
              <li>มุมขวาบนกด <strong>การทำให้ใช้งานได้ (Deploy)</strong> &gt; <strong>การทำให้ใช้งานได้รายการใหม่ (New deployment)</strong></li>
              <li>เลือกประเภทเป็น <strong>เว็บแอป (Web app)</strong> ให้ <strong>ทุกคน (Anyone)</strong> เข้าถึงได้</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-md border border-slate-100 overflow-hidden">
        <div className="bg-navy-50 px-6 py-4 border-b border-navy-100 flex justify-between items-center">
          <h3 className="font-bold text-navy-800 flex items-center"><Code className="w-5 h-5 mr-2 text-navy-500" /> ไฟล์: Code.gs</h3>
          <CopyButton text={gasCodeRaw} />
        </div>
        <div className="p-0 max-h-96 overflow-y-auto"><pre className="p-6 text-xs font-mono text-slate-700 bg-navy-50/30 m-0">{gasCodeRaw}</pre></div>
      </div>

      <div className="bg-white rounded-2xl shadow-md border border-slate-100 overflow-hidden">
        <div className="bg-navy-50 px-6 py-4 border-b border-navy-100 flex justify-between items-center">
          <h3 className="font-bold text-navy-800 flex items-center"><Code className="w-5 h-5 mr-2 text-pink-500" /> ไฟล์: index.html</h3>
          <CopyButton text={gasHtmlRaw} />
        </div>
        <div className="p-0 max-h-96 overflow-y-auto"><pre className="p-6 text-xs font-mono text-slate-700 bg-navy-50/30 m-0">{gasHtmlRaw}</pre></div>
      </div>
    </div>
  );
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button onClick={handleCopy} className="text-xs font-medium px-3 py-1.5 bg-white border border-navy-200 rounded-lg hover:bg-navy-50 flex items-center transition-colors">
      {copied ? <><CheckCircle2 className="w-3.5 h-3.5 mr-1.5 text-emerald-500" />คัดลอกแล้ว</> : <><FileText className="w-3.5 h-3.5 mr-1.5 text-navy-400" />คัดลอกโค้ด</>}
    </button>
  );
}
