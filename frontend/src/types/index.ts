export type BedStatus = 'available' | 'occupied' | 'cleaning' | 'reserved';
export type AppointmentStatus = 'scheduled' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled';
export type PaymentStatus = 'pending' | 'completed' | 'failed' | 'refunded';
export type UserRole = 'admin' | 'doctor' | 'nurse' | 'receptionist' | 'accountant';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface HospitalCharge {
  id: string;
  category: string;
  serviceName: string;
  code: string;
  rate: number;
  description: string;
  active: boolean;
  effectiveDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface Bed {
  id: string;
  bedNumber: string;
  ward: string;
  floor: number;
  room: string;
  bedType: string;
  status: BedStatus;
  patientId?: string;
  patientName?: string;
  admissionDate?: string;
  lastCleaned?: string;
}

export interface PrintTemplate {
  id: string;
  name: string;
  category: string;
  description: string;
  content: string;
  variables: string[];
  active: boolean;
  version: number;
  thumbnail?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaymentMethod {
  id: string;
  name: string;
  type: 'cash' | 'card' | 'insurance' | 'online';
  icon: string;
  active: boolean;
  config: Record<string, any>;
}

export interface Payment {
  id: string;
  patientId: string;
  patientName: string;
  amount: number;
  method: string;
  status: PaymentStatus;
  reference: string;
  date: string;
  description: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  date: string;
  time: string;
  duration: number;
  status: AppointmentStatus;
  type: string;
  notes?: string;
  queueNumber?: number;
}

export interface DashboardStats {
  totalBeds: number;
  occupiedBeds: number;
  availableBeds: number;
  todayAppointments: number;
  pendingPayments: number;
  revenue: number;
}
