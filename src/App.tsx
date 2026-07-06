import React, { useState, useEffect, useCallback } from 'react';
import { PRICING, RegistrationFormData } from './types';
import { 
  Users, CreditCard, CheckCircle2, FileText, LayoutDashboard, Code, 
  AlertCircle, RefreshCw, UploadCloud, ArrowRight, ArrowLeft, Copy,
  Heart, Phone, Mail, MapPin, GraduationCap, ShieldCheck, Stethoscope,
  Calendar, X, Info, ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import gasCodeRaw from './gas/Code.gs.txt?raw';
import gasHtmlRaw from './gas/index.html.txt?raw';
import bannerImage from './assets/preceptor-banner.png';

type Tab = 'form' | 'dashboard' | 'gas';

// ==================== Toast Notification System ====================
interface ToastData {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
}

let toastId = 0;
let globalSetToasts: React.Dispatch<React.SetStateAction<ToastData[]>> | null = null;

function showToast(message: string, type: ToastData['type'] = 'info') {
  if (globalSetToasts) {
    const id = ++toastId;
    globalSetToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      globalSetToasts?.(prev => prev.filter(t => t.id !== id));
    }, 4000);
  }
}

function ToastContainer() {
  const [toasts, setToasts] = useState<ToastData[]>([]);
  useEffect(() => { globalSetToasts = setToasts; return () => { globalSetToasts = null; }; }, []);

  const colors = {
    success: 'bg-emerald-500 border-emerald-600',
    error: 'bg-red-500 border-red-600',
    info: 'bg-brand-navy border-brand-navy-light',
    warning: 'bg-amber-500 border-amber-600',
  };
  const icons = {
    success: <CheckCircle2 className="w-5 h-5" />,
    error: <AlertCircle className="w-5 h-5" />,
    info: <Info className="w-5 h-5" />,
    warning: <AlertCircle className="w-5 h-5" />,
  };

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-3 max-w-sm">
      <AnimatePresence>
        {toasts.map(t => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className={`${colors[t.type]} text-white px-5 py-3.5 rounded-xl shadow-lg border flex items-center gap-3 cursor-pointer`}
            onClick={() => globalSetToasts?.(prev => prev.filter(x => x.id !== t.id))}
          >
            {icons[t.type]}
            <span className="text-sm font-medium">{t.message}</span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

// ==================== Main App ====================
export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('form');

  return (
    <div className="min-h-screen bg-pattern font-sans text-slate-900 flex flex-col">
      <ToastContainer />

      {/* Navbar */}
      <nav className="nav-gradient sticky top-0 z-40 shadow-lg">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center h-auto sm:h-16 py-3 sm:py-0">
            <div className="flex items-center mb-3 sm:mb-0 gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <img src="https://nurse.ptu.ac.th/wp-content/uploads/2026/07/logo-remake-N-PTU.png" alt="N-PTU Logo" className="h-7 w-auto object-contain" />
              </div>
              <div>
                <h1 className="text-base font-bold text-white tracking-tight leading-tight">คณะพยาบาลศาสตร์</h1>
                <p className="text-xs text-white/70 leading-tight">มหาวิทยาลัยปทุมธานี</p>
              </div>
            </div>
            
            <div className="flex gap-1 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0 hide-scrollbar">
              <NavButton active={activeTab === 'form'} onClick={() => setActiveTab('form')} icon={<FileText className="w-4 h-4" />} label="ลงทะเบียน" />
              <NavButton active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} icon={<LayoutDashboard className="w-4 h-4" />} label="แดชบอร์ด" />
              <NavButton active={activeTab === 'gas'} onClick={() => setActiveTab('gas')} icon={<Code className="w-4 h-4" />} label="ตั้งค่า GAS" />
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <AnimatePresence mode="wait">
          {activeTab === 'form' && (
            <motion.div key="form" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25 }}>
              <RegistrationFlow />
            </motion.div>
          )}
          {activeTab === 'dashboard' && (
            <motion.div key="dashboard" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25 }}>
              <Dashboard />
            </motion.div>
          )}
          {activeTab === 'gas' && (
            <motion.div key="gas" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25 }}>
              <GasSetup />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="nav-gradient mt-auto">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Stethoscope className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-sm">คณะพยาบาลศาสตร์</h3>
                  <p className="text-white/60 text-xs">มหาวิทยาลัยปทุมธานี</p>
                </div>
              </div>
              <p className="text-white/50 text-xs leading-relaxed">โครงการอบรมเชิงปฏิบัติการ พยาบาลพี่เลี้ยงสู่คุณภาพการเรียนการสอน Online</p>
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm mb-3">ติดต่อเรา</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-white/60 text-xs">
                  <Mail className="w-3.5 h-3.5 shrink-0" />
                  <span>ns@ptu.ac.th</span>
                </div>
                <div className="flex items-center gap-2 text-white/60 text-xs">
                  <Phone className="w-3.5 h-3.5 shrink-0" />
                  <span>02-975-6999</span>
                </div>
                <div className="flex items-center gap-2 text-white/60 text-xs">
                  <MapPin className="w-3.5 h-3.5 shrink-0" />
                  <span>140 หมู่ 4 ถ.ติวานนท์ ต.บ้านกลาง อ.เมือง จ.ปทุมธานี</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm mb-3">ลิงก์ที่เกี่ยวข้อง</h4>
              <div className="space-y-2">
                <a href="https://nurse.ptu.ac.th" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white/60 hover:text-brand-pink-light text-xs transition-colors">
                  <ChevronRight className="w-3.5 h-3.5" />
                  <span>เว็บไซต์คณะพยาบาลศาสตร์</span>
                </a>
                <a href="https://www.ptu.ac.th" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white/60 hover:text-brand-pink-light text-xs transition-colors">
                  <ChevronRight className="w-3.5 h-3.5" />
                  <span>มหาวิทยาลัยปทุมธานี</span>
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 mt-6 pt-5 text-center">
            <p className="text-white/40 text-xs">© 2026 คณะพยาบาลศาสตร์ มหาวิทยาลัยปทุมธานี — N-PTU Preceptor Masterclass</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ==================== Nav Button ====================
function NavButton({ active, onClick, icon, label }: { active: boolean; onClick: () => void; icon: React.ReactNode; label: string }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
        active 
          ? 'bg-white/20 text-white shadow-inner backdrop-blur-sm' 
          : 'text-white/70 hover:text-white hover:bg-white/10'
      }`}
    >
      {icon}
      {label}
    </button>
  );
}

// ==================== Styled Input ====================
function FormInput({ label, required, note, ...props }: { label: string; required?: boolean; note?: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="block text-sm font-semibold text-slate-700 mb-1.5">
        {label} {required && <span className="text-brand-pink">*</span>}
      </label>
      {note && <p className="text-xs text-slate-400 mb-2">{note}</p>}
      <input
        {...props}
        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white/80 backdrop-blur-sm text-slate-800 placeholder:text-slate-400 transition-all hover:border-brand-pink-light"
      />
    </div>
  );
}

// ==================== Registration Flow ====================
type FlowStep = 'welcome' | 'edit_login' | 'edit_form' | 'select_type' | 'secret_check' | 'form_general' | 'form_alumni' | 'review' | 'submitting' | 'success';

function RegistrationFlow() {
  const [step, setStep] = useState<FlowStep>('welcome');
  const [formData, setFormData] = useState<Partial<RegistrationFormData>>({ userType: null });
  const [filePreview, setFilePreview] = useState<string | null>(null);
  
  // Secret Check State
  const [secretCodeInput, setSecretCodeInput] = useState('');
  const [teacherInput, setTeacherInput] = useState('');
  const [secretError, setSecretError] = useState(false);
  const [secretLoading, setSecretLoading] = useState(false);

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

  const handleSecretCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    if (teacherInput.trim() === '') {
      setSecretError(true);
      return;
    }
    setSecretLoading(true);
    try {
      const response = await fetch('/api/verify-secret', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ secretCode: secretCodeInput.trim() })
      });
      const result = await response.json();
      if (result.success) {
        setSecretError(false);
        setFormData({ ...formData, secretCode: secretCodeInput, referringTeacher: teacherInput });
        setStep('form_alumni');
      } else {
        setSecretError(true);
      }
    } catch {
      showToast('เกิดข้อผิดพลาดในการเชื่อมต่อเซิร์ฟเวอร์', 'error');
    } finally {
      setSecretLoading(false);
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
        showToast(result.message, 'error');
      }
    } catch {
      showToast('เกิดข้อผิดพลาดในการเชื่อมต่อเซิร์ฟเวอร์', 'error');
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
        } : undefined
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
        showToast('เกิดข้อผิดพลาด: ' + result.message, 'error');
        setStep('edit_form');
      }
    } catch {
      showToast('เกิดข้อผิดพลาดในการเชื่อมต่อเซิร์ฟเวอร์', 'error');
      setStep('edit_form');
    }
  };

  const handleGeneralSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.email || !formData.lineId || !formData.licenseNumber || !formData.licenseExpiry || !formData.slipFile) {
      showToast('กรุณากรอกข้อมูลและแนบสลิปให้ครบถ้วน', 'warning');
      return;
    }
    setStep('review');
  };

  const handleAlumniSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.email || !formData.lineId || !formData.licenseNumber || !formData.licenseExpiry) {
      showToast('กรุณากรอกข้อมูลให้ครบถ้วน', 'warning');
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
        showToast('เกิดข้อผิดพลาด: ' + result.message, 'error');
        setStep('review');
      }
    } catch {
      showToast('เกิดข้อผิดพลาดในการเชื่อมต่อเซิร์ฟเวอร์', 'error');
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
    <div>
      {/* Progress Bar */}
      {step !== 'welcome' && (
        <div className="h-1.5 bg-slate-100 rounded-full mb-6 overflow-hidden">
          <div className="h-full progress-shimmer rounded-full transition-all duration-500" style={{ width: progressWidth() }} />
        </div>
      )}

      <div className="glass-card rounded-2xl overflow-hidden">
        <div className="p-6 sm:p-10">
          <AnimatePresence mode="wait">

            {/* ===== WELCOME ===== */}
            {step === 'welcome' && (
              <motion.div key="welcome" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.05 }} className="space-y-8">
                {/* Hero Banner */}
                <div className="relative -m-6 sm:-m-10 mb-6 sm:mb-8 overflow-hidden bg-brand-pink-soft/20 min-h-[120px] sm:min-h-[200px] flex items-center justify-center">
                  <img 
                    src={bannerImage}
                    alt="โครงการอบรมเชิงปฏิบัติการ พยาบาลพี่เลี้ยงสู่คุณภาพการเรียนการสอน Online" 
                    className="w-full h-auto object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                      // Fallback text if image fails
                      e.currentTarget.parentElement?.classList.add('p-10');
                      e.currentTarget.parentElement!.innerHTML = '<h2 class="text-2xl font-bold text-brand-navy">N-PTU Preceptor Masterclass</h2>';
                    }}
                  />
                  {/* Gradient overlay at bottom */}
                  <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent pointer-events-none" />
                </div>

                {/* Info Cards */}
                <div className="pt-2">
                  <div className="text-center mb-8">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gradient mb-3">N-PTU Preceptor Masterclass 2026</h2>
                    <p className="text-slate-500 text-sm max-w-lg mx-auto leading-relaxed">
                      โครงการอบรมเชิงปฏิบัติการ พยาบาลพี่เลี้ยงสู่คุณภาพด้านการเรียนการสอน
                    </p>
                  </div>

                  {/* Feature highlights */}
                  <div className="grid grid-cols-3 gap-3 mb-8">
                    <div className="text-center p-3 rounded-xl bg-brand-pink-soft/50">
                      <Calendar className="w-6 h-6 text-brand-pink mx-auto mb-2" />
                      <p className="text-xs font-semibold text-slate-700">อบรม Online</p>
                      <p className="text-[10px] text-slate-400">สะดวก ทุกที่</p>
                    </div>
                    <div className="text-center p-3 rounded-xl bg-blue-50/50">
                      <GraduationCap className="w-6 h-6 text-brand-navy mx-auto mb-2" />
                      <p className="text-xs font-semibold text-slate-700">ได้ CNEU</p>
                      <p className="text-[10px] text-slate-400">หน่วยคะแนน</p>
                    </div>
                    <div className="text-center p-3 rounded-xl bg-emerald-50/50">
                      <ShieldCheck className="w-6 h-6 text-emerald-600 mx-auto mb-2" />
                      <p className="text-xs font-semibold text-slate-700">ใบ Certificate</p>
                      <p className="text-[10px] text-slate-400">รับรองผล</p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                  <button 
                    onClick={() => setStep('select_type')} 
                    className="group flex flex-col items-center justify-center p-7 rounded-2xl border-2 border-brand-pink/20 bg-gradient-to-br from-brand-pink-soft to-white hover:border-brand-pink/40 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="w-14 h-14 bg-brand-pink/10 text-brand-pink rounded-2xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <FileText className="w-7 h-7" />
                    </div>
                    <span className="text-lg font-bold text-brand-navy">ลงทะเบียนอบรมฯ</span>
                    <span className="text-xs text-slate-400 mt-1">สำหรับผู้สมัครใหม่</span>
                  </button>
                  <button 
                    onClick={() => setStep('edit_login')} 
                    className="group flex flex-col items-center justify-center p-7 rounded-2xl border-2 border-brand-gold/30 bg-gradient-to-br from-amber-50 to-white hover:border-brand-gold/50 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="w-14 h-14 bg-brand-gold/15 text-amber-600 rounded-2xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <RefreshCw className="w-7 h-7" />
                    </div>
                    <span className="text-lg font-bold text-brand-navy">แก้ไขข้อมูล</span>
                    <span className="text-xs text-slate-400 mt-1">ผู้ลงทะเบียนแล้ว</span>
                  </button>
                </div>
              </motion.div>
            )}

            {/* ===== EDIT LOGIN ===== */}
            {step === 'edit_login' && (
              <motion.form key="edit_login" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} onSubmit={handleEditSearch} className="space-y-6 max-w-md mx-auto">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-brand-gold/15 text-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <RefreshCw className="w-8 h-8" />
                  </div>
                  <h2 className="text-2xl font-bold text-brand-navy">ค้นหาข้อมูลของคุณ</h2>
                  <p className="text-slate-400 mt-2 text-sm">กรุณากรอกอีเมลและเบอร์โทรศัพท์ที่ใช้ลงทะเบียน</p>
                </div>
                <div className="space-y-4">
                  <FormInput label="อีเมลที่ใช้ลงทะเบียน" required type="email" value={editEmail} onChange={(e) => setEditEmail(e.target.value)} placeholder="อีเมลของคุณ" />
                  <FormInput label="เบอร์โทรศัพท์" required type="tel" value={editPhone} onChange={(e) => setEditPhone(e.target.value)} placeholder="เบอร์โทรศัพท์" />
                </div>
                <div className="pt-4 flex gap-3">
                  <button type="button" onClick={() => setStep('welcome')} className="w-1/3 flex items-center justify-center py-3 px-4 rounded-xl text-sm font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors">
                    <ArrowLeft className="mr-1.5 w-4 h-4" /> กลับ
                  </button>
                  <button type="submit" disabled={editSearchLoading} className="w-2/3 flex items-center justify-center py-3 px-4 rounded-xl text-sm font-semibold btn-gold disabled:opacity-50">
                    {editSearchLoading ? <RefreshCw className="w-5 h-5 animate-spin" /> : 'ค้นหาข้อมูล'}
                  </button>
                </div>
              </motion.form>
            )}

            {/* ===== SELECT TYPE ===== */}
            {step === 'select_type' && (
              <motion.div key="select_type" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-6">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-brand-navy">เลือกประเภทผู้สมัคร</h2>
                  <p className="text-slate-400 mt-2 text-sm">กรุณาเลือกประเภทผู้สมัครเพื่อดำเนินการต่อ</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button 
                    onClick={() => handleTypeSelect('general')} 
                    className="group flex flex-col items-center justify-center p-8 rounded-2xl border-2 border-slate-200 bg-white hover:bg-brand-pink-soft hover:border-brand-pink/30 transition-all shadow-sm"
                  >
                    <div className="w-14 h-14 bg-brand-pink/10 text-brand-pink rounded-2xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <Users className="w-7 h-7" />
                    </div>
                    <span className="text-lg font-bold text-brand-navy">บุคคลทั่วไป</span>
                    <span className="text-xs text-slate-400 mt-1">ค่าลงทะเบียน {PRICING.general.toLocaleString()} บาท</span>
                  </button>
                  <button 
                    onClick={() => handleTypeSelect('alumni')} 
                    className="group flex flex-col items-center justify-center p-8 rounded-2xl border-2 border-slate-200 bg-white hover:bg-purple-50 hover:border-purple-300 transition-all shadow-sm"
                  >
                    <div className="w-14 h-14 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <GraduationCap className="w-7 h-7" />
                    </div>
                    <span className="text-lg font-bold text-brand-navy">ศิษย์เก่า / พยาบาลพี่เลี้ยง</span>
                    <span className="text-xs text-slate-400 mt-1">ไม่มีค่าใช้จ่าย</span>
                  </button>
                </div>
                <div className="pt-2 flex justify-center">
                  <button type="button" onClick={() => setStep('welcome')} className="text-sm font-medium text-slate-400 hover:text-brand-navy transition-colors flex items-center gap-1">
                    <ArrowLeft className="w-3.5 h-3.5" /> ยกเลิกและกลับหน้าแรก
                  </button>
                </div>
              </motion.div>
            )}

            {/* ===== SECRET CHECK ===== */}
            {step === 'secret_check' && (
              <motion.form key="secret_check" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} onSubmit={handleSecretCheck} className="space-y-6 max-w-md mx-auto">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <ShieldCheck className="w-8 h-8" />
                  </div>
                  <h2 className="text-2xl font-bold text-brand-navy">ยืนยันสิทธิ์ศิษย์เก่า</h2>
                  <p className="text-slate-400 mt-2 text-sm">กรุณากรอกรหัสผู้แนะนำและชื่ออาจารย์ผู้แนะนำ</p>
                </div>
                {secretError && (
                  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-start">
                    <AlertCircle className="w-5 h-5 mr-2 shrink-0 mt-0.5" />
                    <p className="text-sm">รหัสผู้แนะนำไม่ถูกต้อง หรือ ลืมกรอกชื่ออาจารย์ผู้แนะนำ</p>
                  </motion.div>
                )}
                <div className="space-y-4">
                  <FormInput label="รหัสผู้แนะนำ" required type="text" value={secretCodeInput} onChange={(e) => setSecretCodeInput(e.target.value)} placeholder="ระบุรหัสผู้แนะนำ" />
                  <FormInput label="ชื่ออาจารย์ผู้แนะนำ" required type="text" value={teacherInput} onChange={(e) => setTeacherInput(e.target.value)} placeholder="ชื่อ-นามสกุล อาจารย์ผู้แนะนำ" />
                </div>
                <div className="pt-4 flex gap-3">
                  <button type="button" onClick={() => setStep('select_type')} className="w-1/3 flex items-center justify-center py-3 px-4 rounded-xl text-sm font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors">
                    <ArrowLeft className="mr-1.5 w-4 h-4" /> กลับ
                  </button>
                  <button type="submit" disabled={secretLoading} className="w-2/3 flex items-center justify-center py-3 px-4 rounded-xl text-sm font-semibold btn-primary disabled:opacity-50">
                    {secretLoading ? <RefreshCw className="w-5 h-5 animate-spin" /> : <>ตรวจสอบ <ArrowRight className="ml-1.5 w-4 h-4" /></>}
                  </button>
                </div>
              </motion.form>
            )}

            {/* ===== FORM: GENERAL ===== */}
            {step === 'form_general' && (
              <motion.form key="form_general" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} onSubmit={handleGeneralSubmit} className="space-y-6">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-pink-soft rounded-full text-brand-pink text-xs font-semibold mb-3">
                    <Users className="w-3.5 h-3.5" /> บุคคลทั่วไป
                  </div>
                  <h2 className="text-2xl font-bold text-brand-navy">ข้อมูลลงทะเบียน</h2>
                </div>
                <div className="space-y-4">
                  <FormInput label="ชื่อ-นามสกุล" required type="text" value={formData.name || ''} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormInput label="เบอร์โทรศัพท์" required type="tel" value={formData.phone || ''} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
                    <FormInput label="ID Line" required type="text" value={formData.lineId || ''} onChange={(e) => setFormData({ ...formData, lineId: e.target.value })} />
                  </div>
                  <FormInput label="อีเมล" required type="email" value={formData.email || ''} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormInput label="เลขที่ใบประกอบวิชาชีพ" required type="text" value={formData.licenseNumber || ''} onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })} />
                    <FormInput label="วันหมดอายุใบประกอบวิชาชีพ" required type="date" value={formData.licenseExpiry || ''} onChange={(e) => setFormData({ ...formData, licenseExpiry: e.target.value })} />
                  </div>

                  {/* Payment Info */}
                  <div className="bg-gradient-to-br from-brand-navy to-brand-navy-light rounded-2xl p-6 text-white my-4">
                    <h3 className="font-bold mb-4 flex items-center justify-center text-base">
                      <CreditCard className="w-5 h-5 mr-2" /> บัญชีสำหรับชำระค่าสมัคร
                    </h3>
                    <div className="text-center mb-4">
                      <span className="bg-brand-gold text-brand-navy text-lg font-bold px-5 py-2 rounded-full inline-block shadow-md">
                        ยอดชำระ {PRICING.general.toLocaleString()} บาท
                      </span>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 space-y-2 text-sm">
                      <p className="text-white/80">ชื่อบัญชี: <strong className="text-white">มหาวิทยาลัยปทุมธานี</strong></p>
                      <p className="text-white/80">ธนาคาร: <strong className="text-white">กรุงเทพ</strong></p>
                      <div className="pt-2 flex flex-col items-center">
                        <p className="text-white/70 mb-2 text-xs">เลขที่บัญชี:</p>
                        <div className="flex items-center gap-2 bg-white/15 px-5 py-2.5 rounded-xl">
                          <strong className="font-bold text-xl tracking-widest text-brand-gold">011-7-167395</strong>
                          <button 
                            type="button"
                            onClick={() => {
                              navigator.clipboard.writeText('0117167395');
                              showToast('คัดลอกเลขบัญชีเรียบร้อยแล้ว', 'success');
                            }}
                            className="p-1.5 text-white/70 hover:text-brand-gold hover:bg-white/10 rounded-lg transition-colors"
                            title="คัดลอกเลขบัญชี"
                          >
                            <Copy className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* File Upload */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">อัปโหลดหลักฐานการชำระเงิน <span className="text-brand-pink">*</span></label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed border-slate-200 rounded-2xl bg-white/50 hover:bg-brand-pink-soft/20 hover:border-brand-pink/30 transition-all">
                      <div className="space-y-2 text-center">
                        {!filePreview && !formData.slipFile && <UploadCloud className="mx-auto h-12 w-12 text-slate-300" />}
                        {filePreview && <div className="mb-3"><img src={filePreview} alt="Slip preview" className="mx-auto h-44 object-contain rounded-xl shadow-md border border-slate-100" /></div>}
                        {formData.slipFile && !filePreview && <div className="mb-3 flex flex-col items-center"><FileText className="h-12 w-12 text-brand-pink mb-2" /><span className="text-sm font-medium text-slate-700">{formData.slipFile.name}</span></div>}
                        <div className="flex text-sm justify-center">
                          <label htmlFor="file-upload" className="relative cursor-pointer rounded-xl font-semibold text-brand-pink hover:text-brand-pink-light px-4 py-2 bg-brand-pink-soft/50 hover:bg-brand-pink-soft transition-colors">
                            <span>{filePreview || formData.slipFile ? 'เปลี่ยนไฟล์' : 'เลือกไฟล์'}</span>
                            <input id="file-upload" type="file" accept="image/*,.pdf" className="sr-only" onChange={handleFileChange} />
                          </label>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-1">PNG, JPG, หรือ PDF</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="pt-4 flex gap-3">
                  <button type="button" onClick={() => setStep('select_type')} className="w-1/3 flex items-center justify-center py-3 px-4 rounded-xl text-sm font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors">กลับ</button>
                  <button type="submit" className="w-2/3 flex items-center justify-center py-3 px-4 rounded-xl text-sm font-semibold btn-primary">ถัดไป <ArrowRight className="ml-1.5 w-4 h-4" /></button>
                </div>
              </motion.form>
            )}

            {/* ===== FORM: ALUMNI ===== */}
            {step === 'form_alumni' && (
              <motion.form key="form_alumni" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} onSubmit={handleAlumniSubmit} className="space-y-6">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-purple-100 rounded-full text-purple-700 text-xs font-semibold mb-3">
                    <GraduationCap className="w-3.5 h-3.5" /> ศิษย์เก่า / พยาบาลพี่เลี้ยง
                  </div>
                  <h2 className="text-2xl font-bold text-brand-navy">ข้อมูลลงทะเบียน</h2>
                </div>
                <div className="space-y-4">
                  <FormInput label="ชื่อ-นามสกุล" required type="text" value={formData.name || ''} onChange={(e) => setFormData({ ...formData, name: e.target.value })} note="กรณีมีการเปลี่ยนแปลงชื่อ-นามสกุล กรุณาวงเล็บชื่อนามสกุลเดิม" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormInput label="เบอร์โทรติดต่อ" required type="tel" value={formData.phone || ''} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
                    <FormInput label="ID Line" required type="text" value={formData.lineId || ''} onChange={(e) => setFormData({ ...formData, lineId: e.target.value })} />
                  </div>
                  <FormInput label="อีเมลที่ใช้งานจริง" required type="email" value={formData.email || ''} onChange={(e) => setFormData({ ...formData, email: e.target.value })} note="รับข้อมูลจากคณะฯ ช่องทางการเข้าห้องอบรม ระเบียบการอบรม ฯ" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormInput label="เลขที่ใบประกอบวิชาชีพ" required type="text" value={formData.licenseNumber || ''} onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })} />
                    <FormInput label="วันหมดอายุใบประกอบวิชาชีพ" required type="date" value={formData.licenseExpiry || ''} onChange={(e) => setFormData({ ...formData, licenseExpiry: e.target.value })} />
                  </div>
                </div>
                <div className="pt-4 flex gap-3">
                  <button type="button" onClick={() => setStep('secret_check')} className="w-1/3 flex items-center justify-center py-3 px-4 rounded-xl text-sm font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors">กลับ</button>
                  <button type="submit" className="w-2/3 flex items-center justify-center py-3 px-4 rounded-xl text-sm font-semibold btn-primary">ถัดไป <ArrowRight className="ml-1.5 w-4 h-4" /></button>
                </div>
              </motion.form>
            )}

            {/* ===== EDIT FORM ===== */}
            {step === 'edit_form' && (
              <motion.form key="edit_form" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} onSubmit={handleEditSubmit} className="space-y-6">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-100 rounded-full text-amber-700 text-xs font-semibold mb-3">
                    <RefreshCw className="w-3.5 h-3.5" /> แก้ไขข้อมูล
                  </div>
                  <h2 className="text-2xl font-bold text-brand-navy">แก้ไขข้อมูลการลงทะเบียน</h2>
                  <p className="text-slate-400 mt-2 text-sm">ปรับปรุงข้อมูลด้านล่างแล้วกดยืนยัน</p>
                </div>
                <div className="space-y-4">
                  <FormInput label="ชื่อ-นามสกุล" required type="text" value={formData.name || ''} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormInput label="เบอร์โทรติดต่อ" required type="tel" value={formData.phone || ''} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
                    <FormInput label="อีเมล" required type="email" value={formData.email || ''} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                  </div>
                  
                  {formData.userType === 'alumni' && (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormInput label="ID Line" required type="text" value={formData.lineId || ''} onChange={(e) => setFormData({ ...formData, lineId: e.target.value })} />
                        <FormInput label="ชื่ออาจารย์ผู้แนะนำ" required type="text" value={formData.referringTeacher || ''} onChange={(e) => setFormData({ ...formData, referringTeacher: e.target.value })} />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormInput label="เลขที่ใบประกอบวิชาชีพ" required type="text" value={formData.licenseNumber || ''} onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })} />
                        <FormInput label="วันหมดอายุใบประกอบวิชาชีพ" required type="date" value={formData.licenseExpiry || ''} onChange={(e) => setFormData({ ...formData, licenseExpiry: e.target.value })} />
                      </div>
                    </>
                  )}

                  {formData.userType === 'general' && (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormInput label="ID Line" required type="text" value={formData.lineId || ''} onChange={(e) => setFormData({ ...formData, lineId: e.target.value })} />
                        <div />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormInput label="เลขที่ใบประกอบวิชาชีพ" required type="text" value={formData.licenseNumber || ''} onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })} />
                        <FormInput label="วันหมดอายุใบประกอบวิชาชีพ" required type="date" value={formData.licenseExpiry || ''} onChange={(e) => setFormData({ ...formData, licenseExpiry: e.target.value })} />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">อัปโหลดหลักฐานการชำระเงินใหม่ (ถ้าต้องการเปลี่ยน)</label>
                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed border-slate-200 rounded-2xl bg-white/50 hover:bg-brand-pink-soft/20 hover:border-brand-pink/30 transition-all">
                          <div className="space-y-2 text-center">
                            {!filePreview && <UploadCloud className="mx-auto h-12 w-12 text-slate-300" />}
                            {filePreview && <div className="mb-3"><img src={filePreview} alt="Slip preview" className="mx-auto h-44 object-contain rounded-xl shadow-md border border-slate-100" /></div>}
                            <div className="flex text-sm justify-center">
                              <label htmlFor="file-upload-edit" className="relative cursor-pointer rounded-xl font-semibold text-brand-pink hover:text-brand-pink-light px-4 py-2 bg-brand-pink-soft/50 hover:bg-brand-pink-soft transition-colors">
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
                <div className="pt-4 flex gap-3">
                  <button type="button" onClick={() => setStep('welcome')} className="w-1/3 flex items-center justify-center py-3 px-4 rounded-xl text-sm font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors">ยกเลิก</button>
                  <button type="submit" className="w-2/3 flex items-center justify-center py-3 px-4 rounded-xl text-sm font-semibold btn-gold">
                    <CheckCircle2 className="mr-1.5 w-4 h-4" /> บันทึกการแก้ไข
                  </button>
                </div>
              </motion.form>
            )}

            {/* ===== REVIEW ===== */}
            {step === 'review' && (
              <motion.div key="review" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-brand-navy">ตรวจสอบข้อมูลการลงทะเบียน</h2>
                  <div className="mt-4 bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start text-left">
                    <AlertCircle className="w-5 h-5 text-amber-500 mr-3 shrink-0 mt-0.5" />
                    <p className="text-sm text-amber-700">กรุณาตรวจสอบความถูกต้องของข้อมูล หากถูกต้องครบถ้วนแล้ว ให้กดปุ่ม "ยืนยันการลงทะเบียน"</p>
                  </div>
                </div>

                <div className="bg-slate-50/80 rounded-2xl p-6 border border-slate-100">
                  <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-5">
                    <div className="sm:col-span-2">
                      <dt className="text-xs font-medium text-slate-400 uppercase tracking-wider">ประเภทผู้สมัคร</dt>
                      <dd className="mt-1 text-base font-bold text-brand-navy">{formData.userType === 'general' ? 'บุคคลทั่วไป' : 'ศิษย์เก่า / พยาบาลพี่เลี้ยง'}</dd>
                    </div>
                    <ReviewItem label="ชื่อ-นามสกุล" value={formData.name} />
                    <ReviewItem label="เบอร์โทรศัพท์" value={formData.phone} />
                    <ReviewItem label="อีเมล" value={formData.email} />
                    <ReviewItem label="ID Line" value={formData.lineId} />
                    <ReviewItem label="เลขที่ใบประกอบวิชาชีพ" value={formData.licenseNumber} />
                    <ReviewItem label="วันหมดอายุใบประกอบวิชาชีพ" value={formData.licenseExpiry} />

                    {formData.userType === 'general' && formData.slipFile && (
                      <div className="sm:col-span-2 pt-4 border-t border-slate-200">
                        <dt className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">ไฟล์หลักฐานการชำระเงิน</dt>
                        <dd className="mt-1 flex items-center p-3 bg-white border border-slate-100 rounded-xl">
                          <FileText className="w-5 h-5 text-brand-pink mr-3" />
                          <span className="text-sm text-slate-700 truncate">{formData.slipFile.name}</span>
                        </dd>
                      </div>
                    )}

                    {formData.userType === 'alumni' && (
                      <div className="sm:col-span-2 pt-4 border-t border-slate-200">
                        <dt className="text-xs font-medium text-slate-400 uppercase tracking-wider">ชื่ออาจารย์ผู้แนะนำ</dt>
                        <dd className="mt-1 text-base font-semibold text-slate-800">{formData.referringTeacher}</dd>
                      </div>
                    )}
                  </dl>
                </div>

                <div className="flex gap-3">
                  <button onClick={() => setStep(formData.userType === 'general' ? 'form_general' : 'form_alumni')} className="w-1/3 flex items-center justify-center py-3 px-4 rounded-xl text-sm font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors">กลับไปแก้ไข</button>
                  <button onClick={handleSubmitData} className="w-2/3 flex items-center justify-center py-3.5 px-4 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-lg shadow-emerald-200 transition-all hover:shadow-emerald-300">
                    <CheckCircle2 className="mr-2 w-5 h-5" /> ยืนยันการลงทะเบียน
                  </button>
                </div>
              </motion.div>
            )}

            {/* ===== SUBMITTING ===== */}
            {step === 'submitting' && (
              <motion.div key="submitting" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center py-20 text-center">
                <div className="relative mb-8">
                  <div className="w-16 h-16 border-4 border-slate-100 rounded-full"></div>
                  <div className="w-16 h-16 border-4 border-brand-pink rounded-full border-t-transparent animate-spin absolute top-0 left-0"></div>
                </div>
                <h3 className="text-xl font-bold text-brand-navy">กำลังบันทึกข้อมูล...</h3>
                <p className="text-slate-400 text-sm mt-2">กรุณารอสักครู่</p>
              </motion.div>
            )}

            {/* ===== SUCCESS ===== */}
            {step === 'success' && (
              <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center text-center py-16">
                <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-6 animate-pulse-glow" style={{ animationDuration: '2s' }}>
                  <CheckCircle2 className="w-10 h-10 text-emerald-600" />
                </div>
                <h2 className="text-3xl font-bold text-brand-navy mb-2">ลงทะเบียนสำเร็จ!</h2>
                <p className="text-slate-500 mb-8 max-w-sm mx-auto text-sm">ระบบได้บันทึกข้อมูลของคุณเรียบร้อยแล้ว กรุณาตรวจสอบอีเมลยืนยัน</p>
                <button onClick={() => window.location.reload()} className="py-3 px-8 rounded-xl text-sm font-semibold btn-navy">
                  กลับหน้าหลัก
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

// ==================== Review Item ====================
function ReviewItem({ label, value }: { label: string; value?: string }) {
  return (
    <div>
      <dt className="text-xs font-medium text-slate-400 uppercase tracking-wider">{label}</dt>
      <dd className="mt-1 text-base font-semibold text-slate-800">{value || '-'}</dd>
    </div>
  );
}

// ==================== Dashboard ====================
interface DashboardData {
  total: number;
  general: number;
  alumni: number;
  revenue: number;
}

function Dashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);

  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    try {
      const response = await fetch('/api/admin-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const result = await response.json();
      if (result.success) {
        setIsAuthenticated(true);
        setLoginError(false);
        fetchDashboard();
      } else {
        setLoginError(true);
      }
    } catch {
      showToast('เกิดข้อผิดพลาดในการเชื่อมต่อ', 'error');
    } finally {
      setLoginLoading(false);
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
      <div className="max-w-md mx-auto mt-8">
        <div className="glass-card p-8 rounded-2xl">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-brand-pink/10 text-brand-pink rounded-2xl flex items-center justify-center mx-auto mb-4">
              <LayoutDashboard className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-brand-navy">เข้าสู่ระบบสำหรับผู้ดูแล</h2>
            <p className="text-slate-400 mt-2 text-sm">กรุณาเข้าสู่ระบบเพื่อดูข้อมูลแดชบอร์ด</p>
          </div>
          
          {loginError && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm flex items-start">
              <AlertCircle className="w-5 h-5 mr-2 shrink-0 mt-0.5" />
              <p>ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง</p>
            </motion.div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <FormInput label="ชื่อผู้ใช้ (Username)" required type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            <FormInput label="รหัสผ่าน (Password)" required type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="submit" disabled={loginLoading} className="w-full mt-4 py-3 px-4 rounded-xl text-sm font-semibold btn-primary disabled:opacity-50">
              {loginLoading ? <RefreshCw className="w-5 h-5 animate-spin mx-auto" /> : 'เข้าสู่ระบบ'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end mb-4">
        <div>
          <h2 className="text-2xl font-bold text-brand-navy">แดชบอร์ดสรุปผล</h2>
          <p className="text-slate-400 mt-1 text-sm">ภาพรวมการลงทะเบียน</p>
        </div>
        <button onClick={fetchDashboard} disabled={loading} className="flex items-center px-4 py-2.5 glass-card rounded-xl text-sm font-medium text-slate-600 hover:text-brand-navy disabled:opacity-50 transition-colors">
          <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} /> รีเฟรช
        </button>
      </div>

      {loading && !data ? (
        <div className="glass-card rounded-2xl p-16 flex justify-center">
          <div className="w-8 h-8 border-4 border-brand-pink rounded-full border-t-transparent animate-spin"></div>
        </div>
      ) : data ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="glass-card rounded-2xl p-6 flex flex-col items-center justify-center text-center relative overflow-hidden">
              <div className="absolute -top-4 -right-4 opacity-5"><Users className="w-28 h-28 text-brand-pink" /></div>
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 z-10">ผู้สมัครทั้งหมด</h3>
              <p className="text-5xl font-bold text-brand-pink z-10">{data.total}</p>
              <span className="text-xs text-slate-400 mt-1">คน</span>
            </div>
            <div className="glass-card rounded-2xl p-6 flex flex-col items-center justify-center text-center relative overflow-hidden">
              <div className="absolute -top-4 -right-4 opacity-5"><CreditCard className="w-28 h-28 text-emerald-600" /></div>
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 z-10">รายได้โดยประมาณ</h3>
              <p className="text-5xl font-bold text-emerald-600 z-10">฿{data.revenue.toLocaleString()}</p>
              <span className="text-xs text-slate-400 mt-1">บาท</span>
            </div>
          </div>
          <div className="glass-card rounded-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
              <h3 className="text-sm font-bold text-brand-navy">แบ่งตามประเภทผู้สมัคร</h3>
            </div>
            <div className="divide-y divide-slate-100">
              <div className="px-6 py-5 flex items-center justify-between">
                <div className="flex items-center"><div className="w-3 h-3 bg-brand-pink rounded-full mr-3"></div><span className="text-sm font-medium text-slate-700">บุคคลทั่วไป</span></div>
                <div className="flex items-baseline"><span className="text-2xl font-bold text-brand-navy">{data.general}</span><span className="ml-2 text-xs text-slate-400">คน</span></div>
              </div>
              <div className="px-6 py-5 flex items-center justify-between">
                <div className="flex items-center"><div className="w-3 h-3 bg-purple-500 rounded-full mr-3"></div><span className="text-sm font-medium text-slate-700">ศิษย์เก่า / พยาบาลพี่เลี้ยง</span></div>
                <div className="flex items-baseline"><span className="text-2xl font-bold text-brand-navy">{data.alumni}</span><span className="ml-2 text-xs text-slate-400">คน</span></div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}

// ==================== GAS Setup ====================
function GasSetup() {
  return (
    <div className="space-y-6">
      <div className="glass-card rounded-2xl p-6 sm:p-8">
        <h2 className="text-2xl font-bold text-brand-navy mb-2">คำแนะนำการติดตั้ง Google Apps Script</h2>
        <p className="text-slate-500 text-sm mb-8">หากต้องการนำระบบนี้ไปใช้งานจริงผ่าน Google Sheets ให้ทำตามขั้นตอนด้านล่างนี้</p>
        <div className="space-y-8">
          <StepItem num={1} title="เตรียมพื้นที่ใน Google Drive">
            <ul className="list-disc pl-5 space-y-2 text-slate-600 text-sm">
              <li>สร้าง Google Sheets ใหม่หนึ่งไฟล์</li>
              <li>สร้าง Folder ใหม่ใน Drive สำหรับเก็บภาพสลิป</li>
              <li>คัดลอก Folder ID จาก URL เตรียมไว้</li>
            </ul>
          </StepItem>
          <StepItem num={2} title="สร้างไฟล์ Script">
            <ul className="list-disc pl-5 space-y-2 text-slate-600 text-sm">
              <li>ในหน้า Google Sheets ไปที่ <strong>ส่วนขยาย</strong> &gt; <strong>Apps Script</strong></li>
              <li>คัดลอกโค้ด <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs">Code.gs</code> ด้านล่าง ไปวางทับ</li>
              <li>สร้างไฟล์ HTML ใหม่ตั้งชื่อ <strong>index</strong> และคัดลอกโค้ดไปวาง</li>
            </ul>
          </StepItem>
          <StepItem num={3} title="Deploy ระบบ">
            <ul className="list-disc pl-5 space-y-2 text-slate-600 text-sm">
              <li>เลือกฟังก์ชัน <strong>setupSheet</strong> แล้วกด <strong>Run</strong> 1 ครั้ง</li>
              <li>กด <strong>Deploy</strong> &gt; <strong>New deployment</strong></li>
              <li>เลือกประเภทเป็น <strong>Web app</strong> ให้ <strong>Anyone</strong> เข้าถึงได้</li>
            </ul>
          </StepItem>
        </div>
      </div>
      
      <CodeBlock title="Code.gs" code={gasCodeRaw} color="text-brand-pink" />
      <CodeBlock title="index.html" code={gasHtmlRaw} color="text-amber-600" />
    </div>
  );
}

// ==================== Helper Components ====================
function StepItem({ num, title, children }: { num: number; title: string; children: React.ReactNode }) {
  return (
    <div className="relative pl-10">
      <div className="absolute left-0 top-0.5 w-7 h-7 bg-gradient-to-br from-brand-pink to-brand-pink-light text-white rounded-lg flex items-center justify-center font-bold text-sm shadow-sm">{num}</div>
      <h3 className="text-base font-bold text-brand-navy mb-2">{title}</h3>
      {children}
    </div>
  );
}

function CodeBlock({ title, code, color }: { title: string; code: string; color: string }) {
  return (
    <div className="glass-card rounded-2xl overflow-hidden">
      <div className="bg-slate-50/80 px-6 py-4 border-b border-slate-100 flex justify-between items-center">
        <h3 className="font-bold text-brand-navy flex items-center text-sm"><Code className={`w-4 h-4 mr-2 ${color}`} /> ไฟล์: {title}</h3>
        <CopyButton text={code} />
      </div>
      <div className="p-0 max-h-96 overflow-y-auto"><pre className="p-6 text-xs font-mono text-slate-700 bg-slate-50/50 m-0">{code}</pre></div>
    </div>
  );
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    showToast('คัดลอกโค้ดแล้ว', 'success');
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button onClick={handleCopy} className="text-xs font-semibold px-3 py-1.5 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 flex items-center transition-colors">
      {copied ? <><CheckCircle2 className="w-3.5 h-3.5 mr-1.5 text-emerald-500" />คัดลอกแล้ว</> : <><Copy className="w-3.5 h-3.5 mr-1.5 text-slate-400" />คัดลอกโค้ด</>}
    </button>
  );
}
