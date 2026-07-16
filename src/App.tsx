import React, { useState, useEffect } from 'react';
import { PRICING, RegistrationFormData } from './types';
import {
  Users, CreditCard, CheckCircle2, FileText, LayoutDashboard, Code,
  AlertCircle, RefreshCw, UploadCloud, ArrowRight, ArrowLeft, Copy,
  Phone, Mail, MapPin, GraduationCap, Heart, Calendar, Clock, Award, Home, LogOut
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Schedule from './Schedule';
type Tab = 'home' | 'form' | 'dashboard' | 'schedule';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('home');

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
              <NavButton active={activeTab === 'home'} onClick={() => setActiveTab('home')} icon={<Home className="w-4 h-4 mr-1.5" />} label="หน้าแรก" />
              <NavButton active={activeTab === 'form'} onClick={() => setActiveTab('form')} icon={<FileText className="w-4 h-4 mr-1.5" />} label="ลงทะเบียน" />
              <NavButton active={activeTab === 'schedule'} onClick={() => setActiveTab('schedule')} icon={<Calendar className="w-4 h-4 mr-1.5" />} label="กำหนดการ" />
              <NavButton active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} icon={<LayoutDashboard className="w-4 h-4 mr-1.5" />} label="แดชบอร์ด" />
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <AnimatePresence mode="wait">
          {(activeTab === 'home' || activeTab === 'form') && (
            <motion.div key="flow" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
              <RegistrationFlow activeTab={activeTab} onTabChange={setActiveTab} />
            </motion.div>
          )}
          {activeTab === 'dashboard' && (
            <motion.div key="dashboard" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
              <Dashboard />
            </motion.div>
          )}
          {activeTab === 'schedule' && (
            <motion.div key="schedule" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
              <Schedule onBack={() => setActiveTab('home')} />
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
                <p className="flex items-center"><Phone className="w-3.5 h-3.5 mr-1.5 text-pink-500 shrink-0" />02-975-6999 ต่อ 1605</p>
                <p className="flex items-center"><Mail className="w-3.5 h-3.5 mr-1.5 text-pink-500 shrink-0" />nurse.contact@ptu.ac.th</p>
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

type FlowStep = 'welcome' | 'edit_login' | 'edit_form' | 'select_type' | 'secret_check' | 'alumni_verify' | 'form_general' | 'form_alumni' | 'form_alumni_new' | 'review' | 'submitting' | 'success';

function RegistrationFlow({ activeTab, onTabChange }: { activeTab: Tab, onTabChange: (tab: Tab) => void }) {
  const [step, setStep] = useState<FlowStep>('welcome');

  useEffect(() => {
    if (activeTab === 'home') {
      setStep('welcome');
    } else if (activeTab === 'form' && step === 'welcome') {
      setStep('select_type');
    }
  }, [activeTab]);
  const [formData, setFormData] = useState<Partial<RegistrationFormData>>({ userType: null });
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [isNameChanged, setIsNameChanged] = useState(false);

  // Secret Check State
  const [secretCodeInput, setSecretCodeInput] = useState('');
  const [teacherInput, setTeacherInput] = useState('');
  const [secretError, setSecretError] = useState(false);
  const [checkingCode, setCheckingCode] = useState(false);

  // Edit Login State
  const [editEmail, setEditEmail] = useState('');
  const [editPhone, setEditPhone] = useState('');
  const [editSearchLoading, setEditSearchLoading] = useState(false);

  // Alumni Verification State
  const [alumniSearchInput, setAlumniSearchInput] = useState('');
  const [alumniSearchError, setAlumniSearchError] = useState(false);
  const [checkingAlumni, setCheckingAlumni] = useState(false);

  const handleTypeSelect = (type: 'general' | 'alumni' | 'alumni_new') => {
    setFormData({ ...formData, userType: type });
    if (type === 'general') {
      setStep('form_general');
    } else if (type === 'alumni_new') {
      setStep('alumni_verify');
    } else {
      setStep('secret_check');
    }
  };

  const handleSecretCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    if (secretCodeInput.trim() !== '' && teacherInput.trim() !== '') {
      setCheckingCode(true);
      try {
        const res = await fetch('/api/verify-code', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ code: secretCodeInput.trim() })
        });
        const data = await res.json();

        if (data.success) {
          setSecretError(false);
          setFormData({ ...formData, secretCode: secretCodeInput.trim(), referringTeacher: teacherInput.trim() });
          setStep('form_alumni');
        } else {
          setSecretError(true);
        }
      } catch (err) {
        setSecretError(true);
      } finally {
        setCheckingCode(false);
      }
    } else {
      setSecretError(true);
    }
  };

  const handleAlumniVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (alumniSearchInput.trim() !== '') {
      setCheckingAlumni(true);
      try {
        const res = await fetch('/api/verify-alumni', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ searchId: alumniSearchInput.trim() })
        });
        const data = await res.json();

        if (data.success && data.name) {
          setAlumniSearchError(false);
          setFormData({ ...formData, name: data.name, originalName: data.name, newName: '' });
          setIsNameChanged(false);
          setStep('form_alumni_new');
        } else {
          setAlumniSearchError(true);
        }
      } catch (err) {
        setAlumniSearchError(true);
      } finally {
        setCheckingAlumni(false);
      }
    } else {
      setAlumniSearchError(true);
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
      if ((formData.userType === 'general' || formData.userType === 'alumni_new') && formData.slipFile && formData.slipFile instanceof File) {
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

  const checkDuplicateBeforeReview = async () => {
    try {
      const res = await fetch('/api/check-duplicate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email, phone: formData.phone })
      });
      const result = await res.json();
      if (result.success && result.isDuplicate) {
        const typeMsg = result.type === 'email' ? 'อีเมล' : 'เบอร์โทรศัพท์';
        const confirmEdit = window.confirm(`พบว่า${typeMsg}นี้มีการลงทะเบียนไว้แล้ว คุณต้องการไปยังหน้า 'แก้ไขข้อมูล' แทนหรือไม่?`);
        if (confirmEdit) {
          setEditEmail(formData.email || '');
          setEditPhone(formData.phone || '');
          setStep('edit_login');
        }
        return false;
      }
      return true;
    } catch (e) {
      console.error(e);
      return true;
    }
  };

  const handleGeneralSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.email || !formData.lineId || !formData.licenseNumber || !formData.licenseExpiry || !formData.slipFile) {
      alert('กรุณากรอกข้อมูลและแนบสลิปให้ครบถ้วน');
      return;
    }
    const canProceed = await checkDuplicateBeforeReview();
    if (canProceed) setStep('review');
  };

  const handleAlumniNewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.email || !formData.lineId || !formData.licenseNumber || !formData.licenseExpiry || !formData.slipFile) {
      alert('กรุณากรอกข้อมูลและแนบสลิปให้ครบถ้วน');
      return;
    }
    if (isNameChanged && (!formData.newName || !formData.newName.trim())) {
      alert('กรุณาระบุชื่อ-นามสกุลใหม่');
      return;
    }
    const canProceed = await checkDuplicateBeforeReview();
    if (canProceed) setStep('review');
  };

  const handleAlumniSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.email || !formData.lineId || !formData.licenseNumber || !formData.licenseExpiry) {
      alert('กรุณากรอกข้อมูลให้ครบถ้วน');
      return;
    }
    const canProceed = await checkDuplicateBeforeReview();
    if (canProceed) setStep('review');
  };

  const handleSubmitData = async () => {
    setStep('submitting');
    try {
      let base64Data = '';
      if ((formData.userType === 'general' || formData.userType === 'alumni_new') && formData.slipFile) {
        base64Data = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = (e) => resolve((e.target?.result as string).split(',')[1]);
          reader.onerror = (e) => reject(e);
          reader.readAsDataURL(formData.slipFile!);
        });
      }

      const payload = {
        ...formData,
        name: isNameChanged && formData.newName?.trim() ? `${formData.newName.trim()} (เดิม: ${formData.originalName})` : formData.name,
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
      case 'secret_check':
      case 'alumni_verify': return '30%';
      case 'form_general':
      case 'form_alumni_new':
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
                <button onClick={() => { onTabChange('form'); setStep('select_type'); }} className="card-hover flex flex-col items-center justify-center p-6 rounded-2xl border-2 border-navy-200 bg-gradient-to-br from-navy-50 to-white hover:border-navy-400 transition-all shadow-sm focus:outline-none group">
                  <div className="w-14 h-14 bg-navy-100 text-navy-600 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <FileText className="w-7 h-7" />
                  </div>
                  <span className="text-lg font-bold text-navy-700">ลงทะเบียนอบรมฯ</span>
                  <span className="text-xs text-slate-500 mt-1">สำหรับผู้สมัครใหม่</span>
                </button>
                <button onClick={() => { onTabChange('form'); setStep('edit_login'); }} className="card-hover flex flex-col items-center justify-center p-6 rounded-2xl border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-white hover:border-amber-400 transition-all shadow-sm focus:outline-none group">
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
                <button type="button" onClick={() => onTabChange('home')} className="w-1/3 flex items-center justify-center py-3 px-4 border border-slate-200 rounded-xl shadow-sm text-base font-medium text-slate-600 bg-white hover:bg-slate-50 transition-colors">
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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button onClick={() => handleTypeSelect('general')} className="card-hover flex flex-col items-center justify-center p-8 rounded-xl border-2 border-slate-200 bg-white hover:bg-navy-50 hover:border-navy-300 transition-all shadow-sm focus:outline-none">
                  <div className="w-12 h-12 bg-navy-100 text-navy-600 rounded-full flex items-center justify-center mb-3">
                    <Users className="w-6 h-6" />
                  </div>
                  <span className="text-lg font-bold text-navy-700">บุคคลทั่วไป</span>
                </button>
                <button onClick={() => handleTypeSelect('alumni_new')} className="card-hover flex flex-col items-center justify-center p-8 rounded-xl border-2 border-slate-200 bg-white hover:bg-indigo-50 hover:border-indigo-300 transition-all shadow-sm focus:outline-none">
                  <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mb-3">
                    <Award className="w-6 h-6" />
                  </div>
                  <span className="text-lg font-bold text-navy-700">ศิษย์เก่า</span>
                </button>
                <button onClick={() => handleTypeSelect('alumni')} className="card-hover flex flex-col items-center justify-center p-8 rounded-xl border-2 border-slate-200 bg-white hover:bg-pink-50 hover:border-pink-300 transition-all shadow-sm focus:outline-none">
                  <div className="w-12 h-12 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center mb-3">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <span className="text-lg font-bold text-navy-700">พยาบาลพี่เลี้ยง</span>
                </button>
              </div>
              <div className="pt-4 flex justify-center">
                <button type="button" onClick={() => onTabChange('home')} className="text-sm font-medium text-slate-400 hover:text-navy-600 transition-colors">
                  ← ยกเลิกและกลับหน้าแรก
                </button>
              </div>
            </motion.div>
          )}

          {step === 'secret_check' && (
            <motion.form key="secret_check" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} onSubmit={handleSecretCheck} className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-navy-700">ยืนยันสิทธิ์พยาบาลพี่เลี้ยง</h2>
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
                  <input type="text" required value={secretCodeInput} onChange={(e) => setSecretCodeInput(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-navy-300 focus:border-navy-400 transition-colors bg-slate-50/50" placeholder="ระบุรหัสผู้แนะนำ" />
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
                <button type="submit" disabled={checkingCode} className="w-2/3 flex items-center justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-base font-medium text-white btn-primary-gradient disabled:opacity-50">
                  {checkingCode ? <RefreshCw className="w-5 h-5 animate-spin" /> : <><span className="mr-2">ตรวจสอบ</span> <ArrowRight className="w-5 h-5" /></>}
                </button>
              </div>
            </motion.form>
          )}

          {step === 'alumni_verify' && (
            <motion.form key="alumni_verify" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} onSubmit={handleAlumniVerify} className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-navy-700">ตรวจสอบสิทธิ์ศิษย์เก่า</h2>
                <p className="text-slate-500 mt-2">กรุณากรอกรหัสประจำตัวนักศึกษา หรือ เลขบัตรประจำตัวประชาชน</p>
              </div>
              {alumniSearchError && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-start">
                  <AlertCircle className="w-5 h-5 mr-2 shrink-0 mt-0.5" />
                  <p className="text-sm">ไม่พบข้อมูลศิษย์เก่าในระบบ หรือ ข้อมูลไม่ถูกต้อง กรุณาตรวจสอบอีกครั้ง</p>
                </motion.div>
              )}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-navy-700 mb-1">เลขบัตรประจำตัวประชาชน หรือ รหัสประจำตัวนักศึกษา <span className="text-pink-500">*</span></label>
                  <input type="text" required value={alumniSearchInput} onChange={(e) => setAlumniSearchInput(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-navy-300 focus:border-navy-400 transition-colors bg-slate-50/50" placeholder="ระบุเลขบัตรประชาชน หรือ รหัสนักศึกษา" />
                </div>
              </div>
              <div className="pt-6 flex space-x-4">
                <button type="button" onClick={() => setStep('select_type')} className="w-1/3 flex items-center justify-center py-3 px-4 border border-slate-200 rounded-xl shadow-sm text-base font-medium text-slate-600 bg-white hover:bg-slate-50 transition-colors">
                  <ArrowLeft className="mr-2 w-5 h-5" /> กลับ
                </button>
                <button type="submit" disabled={checkingAlumni} className="w-2/3 flex items-center justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-base font-medium text-white btn-primary-gradient disabled:opacity-50">
                  {checkingAlumni ? <RefreshCw className="w-5 h-5 animate-spin" /> : <><span className="mr-2">ตรวจสอบ</span> <ArrowRight className="w-5 h-5" /></>}
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

          {step === 'form_alumni_new' && (
            <motion.form key="form_alumni_new" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} onSubmit={handleAlumniNewSubmit} className="space-y-6">
              <div className="text-center mb-8">
                <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-50 text-indigo-600 border border-indigo-100 mb-3">
                  <Award className="w-3.5 h-3.5 mr-1" /> ศิษย์เก่า
                </div>
                <h2 className="text-2xl font-bold text-navy-700">ข้อมูลลงทะเบียน</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-navy-700 mb-1">ชื่อ-นามสกุล (ตามฐานข้อมูล) <span className="text-pink-500">*</span></label>
                  <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                    <input type="text" readOnly value={formData.originalName || formData.name || ''} className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-100 text-slate-500 cursor-not-allowed" />
                    <button type="button" onClick={() => setIsNameChanged(!isNameChanged)} className="shrink-0 px-4 py-3 border border-slate-200 rounded-xl text-sm font-medium text-navy-600 hover:bg-slate-50 transition-colors">
                      {isNameChanged ? 'ยกเลิกเปลี่ยนชื่อ' : 'เปลี่ยนชื่อ-สกุลใหม่'}
                    </button>
                  </div>
                </div>

                <AnimatePresence>
                  {isNameChanged && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                      <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl">
                        <label className="block text-sm font-medium text-navy-700 mb-1">ชื่อ-นามสกุลใหม่ <span className="text-pink-500">*</span></label>
                        <input type="text" required={isNameChanged} value={formData.newName || ''} onChange={(e) => setFormData({ ...formData, newName: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-amber-200 focus:ring-2 focus:ring-amber-300 focus:border-amber-400 bg-white" placeholder="ระบุชื่อ-นามสกุลปัจจุบันของคุณ" />
                        <p className="text-xs text-amber-600 mt-2 flex items-start"><AlertCircle className="w-3.5 h-3.5 mr-1 shrink-0" /> ชื่อใหม่นี้จะถูกนำไปใช้สำหรับการออกใบประกาศ และบันทึกลงระบบ</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
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
                      ยอดชำระ 700 บาท
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
                        <label htmlFor="file-upload-alumni" className="relative cursor-pointer bg-white rounded-lg font-medium text-navy-600 hover:text-navy-800 px-4 py-1.5 shadow-sm border border-navy-200 transition-colors">
                          <span>อัปโหลดไฟล์</span>
                          <input id="file-upload-alumni" type="file" accept="image/*,.pdf" className="sr-only" onChange={handleFileChange} />
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
                  <GraduationCap className="w-3.5 h-3.5 mr-1" /> พยาบาลพี่เลี้ยง
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
                    <dd className="mt-1 text-base font-semibold text-navy-800">
                      {formData.userType === 'general' ? 'บุคคลทั่วไป' : formData.userType === 'alumni_new' ? 'ศิษย์เก่า' : 'พยาบาลพี่เลี้ยง'}
                    </dd>
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
  const [token, setToken] = useState('');

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedToken = localStorage.getItem('adminToken');
    if (savedToken) {
      setToken(savedToken);
      setIsAuthenticated(true);
      fetchDashboard(savedToken);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const json = await res.json();
      if (json.success && json.token) {
        setToken(json.token);
        setIsAuthenticated(true);
        setLoginError(false);
        localStorage.setItem('adminToken', json.token);
        fetchDashboard(json.token);
      } else {
        setLoginError(true);
      }
    } catch (error) {
      setLoginError(true);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setToken('');
    setIsAuthenticated(false);
    setData(null);
  };

  const fetchDashboard = async (authToken?: string | React.MouseEvent) => {
    const currentToken = typeof authToken === 'string' ? authToken : token;
    if (!currentToken) return;

    setLoading(true);
    try {
      const res = await fetch('/api/dashboard', {
        headers: { 'Authorization': `Bearer ${currentToken}` }
      });
      if (res.status === 401 || res.status === 403) {
        handleLogout();
        return;
      }
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
        <div className="flex space-x-2">
          <button onClick={fetchDashboard} disabled={loading} className="flex items-center px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-50 transition-colors">
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} /> รีเฟรช
          </button>
          <button onClick={handleLogout} className="flex items-center px-4 py-2 bg-red-50 border border-red-200 rounded-xl text-sm font-medium text-red-600 hover:bg-red-100 transition-colors">
            <LogOut className="w-4 h-4 mr-2" /> ออกจากระบบ
          </button>
        </div>
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
                <div className="flex items-center"><div className="w-3 h-3 bg-indigo-500 rounded-full mr-3"></div><span className="text-sm font-medium text-navy-800">ศิษย์เก่า</span></div>
                <div className="flex items-baseline"><span className="text-2xl font-semibold text-navy-800">{data.alumni_new || 0}</span><span className="ml-2 text-sm text-slate-500">คน</span></div>
              </div>
              <div className="px-6 py-5 flex items-center justify-between">
                <div className="flex items-center"><div className="w-3 h-3 bg-pink-500 rounded-full mr-3"></div><span className="text-sm font-medium text-navy-800">พยาบาลพี่เลี้ยง</span></div>
                <div className="flex items-baseline"><span className="text-2xl font-semibold text-navy-800">{data.alumni}</span><span className="ml-2 text-sm text-slate-500">คน</span></div>
              </div>
            </div>
          </div>

          {data.preceptorGroups && Object.keys(data.preceptorGroups).length > 0 && (
            <div className="bg-white rounded-2xl shadow-md border border-slate-100 overflow-hidden mt-6">
              <div className="px-6 py-5 border-b border-slate-100 bg-indigo-50/50 flex items-center">
                <Users className="w-5 h-5 text-indigo-600 mr-2" />
                <h3 className="text-base font-semibold text-navy-800">รายชื่อพยาบาลพี่เลี้ยง (แบ่งตามอาจารย์ผู้แนะนำ)</h3>
              </div>
              <div className="divide-y divide-slate-100">
                {Object.entries(data.preceptorGroups).map(([teacher, students]) => (
                  <div key={teacher} className="px-6 py-5">
                    <h4 className="text-sm font-bold text-navy-700 mb-3 flex items-center">
                      <div className="w-2 h-2 bg-indigo-400 rounded-full mr-2"></div>
                      อาจารย์ผู้แนะนำ: <span className="text-indigo-700 ml-1">{teacher}</span>
                    </h4>
                    <ul className="space-y-2 pl-4 border-l-2 border-indigo-50 ml-1">
                      {(students as string[]).map((name, index) => (
                        <li key={index} className="text-sm text-slate-600 flex items-start">
                          <span className="text-indigo-300 mr-2 mt-0.5">•</span>
                          ชื่อผู้ลงทะเบียน: {name}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      ) : null}
    </div>
  );
}


