export type UserType = 'general' | 'alumni' | null;

export interface RegistrationFormData {
  userType: UserType;
  name: string;
  phone: string;
  email: string;
  slipFile: File | null;
  secretCode?: string;
  referringTeacher?: string;
  lineId?: string;
  licenseNumber?: string;
  licenseExpiry?: string;
}

export interface RegistrationRecord {
  id: string;
  timestamp: string;
  name: string;
  phone: string;
  email: string;
  userType: UserType;
  amount: number;
  slipUrl: string;
  emailSent: boolean;
  referringTeacher?: string;
  lineId?: string;
  licenseNumber?: string;
  licenseExpiry?: string;
}

export const PRICING = {
  general: 1500,
  alumni: 0,
};
