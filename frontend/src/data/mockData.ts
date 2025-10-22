import { HospitalCharge, Bed, PrintTemplate, PaymentMethod, Payment, Appointment, DashboardStats } from '../types';

export const mockCharges: HospitalCharge[] = [
  {
    id: '1',
    category: 'Consultation',
    serviceName: 'General Physician Consultation',
    code: 'CON-001',
    rate: 500,
    description: 'Initial consultation with general physician',
    active: true,
    effectiveDate: '2024-01-01',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    category: 'Consultation',
    serviceName: 'Specialist Consultation',
    code: 'CON-002',
    rate: 1000,
    description: 'Consultation with specialist doctor',
    active: true,
    effectiveDate: '2024-01-01',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '3',
    category: 'Laboratory',
    serviceName: 'Complete Blood Count',
    code: 'LAB-001',
    rate: 350,
    description: 'CBC test with differential count',
    active: true,
    effectiveDate: '2024-01-01',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '4',
    category: 'Laboratory',
    serviceName: 'Blood Sugar Test',
    code: 'LAB-002',
    rate: 150,
    description: 'Fasting and PP blood sugar',
    active: true,
    effectiveDate: '2024-01-01',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '5',
    category: 'Radiology',
    serviceName: 'X-Ray Chest',
    code: 'RAD-001',
    rate: 800,
    description: 'Chest X-ray PA view',
    active: true,
    effectiveDate: '2024-01-01',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '6',
    category: 'Radiology',
    serviceName: 'CT Scan',
    code: 'RAD-002',
    rate: 5000,
    description: 'CT scan with contrast',
    active: true,
    effectiveDate: '2024-01-01',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '7',
    category: 'Surgery',
    serviceName: 'Minor Surgery',
    code: 'SUR-001',
    rate: 15000,
    description: 'Minor surgical procedure',
    active: true,
    effectiveDate: '2024-01-01',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '8',
    category: 'Surgery',
    serviceName: 'Major Surgery',
    code: 'SUR-002',
    rate: 75000,
    description: 'Major surgical procedure',
    active: true,
    effectiveDate: '2024-01-01',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  }
];

export const mockBeds: Bed[] = [
  { id: '1', bedNumber: 'A101', ward: 'General Ward A', floor: 1, room: '101', bedType: 'Standard', status: 'occupied', patientId: 'P001', patientName: 'John Doe', admissionDate: '2024-10-05' },
  { id: '2', bedNumber: 'A102', ward: 'General Ward A', floor: 1, room: '101', bedType: 'Standard', status: 'available' },
  { id: '3', bedNumber: 'A103', ward: 'General Ward A', floor: 1, room: '102', bedType: 'Standard', status: 'occupied', patientId: 'P002', patientName: 'Jane Smith', admissionDate: '2024-10-07' },
  { id: '4', bedNumber: 'A104', ward: 'General Ward A', floor: 1, room: '102', bedType: 'Standard', status: 'cleaning', lastCleaned: '2024-10-09T10:30:00Z' },
  { id: '5', bedNumber: 'B201', ward: 'ICU', floor: 2, room: '201', bedType: 'ICU', status: 'occupied', patientId: 'P003', patientName: 'Robert Johnson', admissionDate: '2024-10-08' },
  { id: '6', bedNumber: 'B202', ward: 'ICU', floor: 2, room: '201', bedType: 'ICU', status: 'available' },
  { id: '7', bedNumber: 'B203', ward: 'ICU', floor: 2, room: '202', bedType: 'ICU', status: 'reserved' },
  { id: '8', bedNumber: 'C301', ward: 'Private Ward', floor: 3, room: '301', bedType: 'Private', status: 'occupied', patientId: 'P004', patientName: 'Emily Davis', admissionDate: '2024-10-06' },
  { id: '9', bedNumber: 'C302', ward: 'Private Ward', floor: 3, room: '302', bedType: 'Private', status: 'available' },
  { id: '10', bedNumber: 'C303', ward: 'Private Ward', floor: 3, room: '303', bedType: 'Private', status: 'available' },
  { id: '11', bedNumber: 'A105', ward: 'General Ward A', floor: 1, room: '103', bedType: 'Standard', status: 'occupied', patientId: 'P005', patientName: 'Michael Brown', admissionDate: '2024-10-04' },
  { id: '12', bedNumber: 'A106', ward: 'General Ward A', floor: 1, room: '103', bedType: 'Standard', status: 'available' }
];

export const mockTemplates: PrintTemplate[] = [
  {
    id: '1',
    name: 'Prescription Template',
    category: 'Clinical',
    description: 'Standard prescription format with hospital letterhead',
    content: '<html><body><h1>{{hospitalName}}</h1><p>Patient: {{patientName}}</p><p>Doctor: {{doctorName}}</p></body></html>',
    variables: ['hospitalName', 'patientName', 'doctorName', 'medications', 'date'],
    active: true,
    version: 1,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    name: 'Discharge Summary',
    category: 'Clinical',
    description: 'Patient discharge summary with diagnosis and treatment',
    content: '<html><body><h1>Discharge Summary</h1><p>Patient: {{patientName}}</p></body></html>',
    variables: ['patientName', 'admissionDate', 'dischargeDate', 'diagnosis', 'treatment'],
    active: true,
    version: 1,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '3',
    name: 'Invoice Template',
    category: 'Billing',
    description: 'Standard invoice with itemized charges',
    content: '<html><body><h1>Invoice</h1><p>Patient: {{patientName}}</p></body></html>',
    variables: ['patientName', 'invoiceNumber', 'date', 'items', 'total'],
    active: true,
    version: 1,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '4',
    name: 'Lab Report',
    category: 'Laboratory',
    description: 'Laboratory test results format',
    content: '<html><body><h1>Lab Report</h1><p>Patient: {{patientName}}</p></body></html>',
    variables: ['patientName', 'testName', 'results', 'date', 'labTechnician'],
    active: true,
    version: 1,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  }
];

export const mockPaymentMethods: PaymentMethod[] = [
  { id: '1', name: 'Cash', type: 'cash', icon: 'wallet', active: true, config: {} },
  { id: '2', name: 'Credit Card', type: 'card', icon: 'credit-card', active: true, config: { gateway: 'stripe' } },
  { id: '3', name: 'Debit Card', type: 'card', icon: 'credit-card', active: true, config: { gateway: 'stripe' } },
  { id: '4', name: 'Insurance', type: 'insurance', icon: 'shield', active: true, config: {} },
  { id: '5', name: 'UPI', type: 'online', icon: 'smartphone', active: true, config: {} }
];

export const mockPayments: Payment[] = [
  {
    id: '1',
    patientId: 'P001',
    patientName: 'John Doe',
    amount: 5000,
    method: 'Cash',
    status: 'completed',
    reference: 'PAY-001',
    date: '2024-10-09T09:00:00Z',
    description: 'Consultation and lab tests'
  },
  {
    id: '2',
    patientId: 'P002',
    patientName: 'Jane Smith',
    amount: 15000,
    method: 'Credit Card',
    status: 'completed',
    reference: 'PAY-002',
    date: '2024-10-09T10:30:00Z',
    description: 'Surgery charges'
  },
  {
    id: '3',
    patientId: 'P003',
    patientName: 'Robert Johnson',
    amount: 8500,
    method: 'Insurance',
    status: 'pending',
    reference: 'PAY-003',
    date: '2024-10-09T11:15:00Z',
    description: 'ICU charges'
  }
];

export const mockAppointments: Appointment[] = [
  {
    id: '1',
    patientId: 'P006',
    patientName: 'Sarah Wilson',
    doctorId: 'D001',
    doctorName: 'Dr. Smith',
    date: '2024-10-09',
    time: '09:00',
    duration: 30,
    status: 'completed',
    type: 'Consultation',
    queueNumber: 1
  },
  {
    id: '2',
    patientId: 'P007',
    patientName: 'David Martinez',
    doctorId: 'D001',
    doctorName: 'Dr. Smith',
    date: '2024-10-09',
    time: '09:30',
    duration: 30,
    status: 'in-progress',
    type: 'Follow-up',
    queueNumber: 2
  },
  {
    id: '3',
    patientId: 'P008',
    patientName: 'Lisa Anderson',
    doctorId: 'D001',
    doctorName: 'Dr. Smith',
    date: '2024-10-09',
    time: '10:00',
    duration: 30,
    status: 'confirmed',
    type: 'Consultation',
    queueNumber: 3
  },
  {
    id: '4',
    patientId: 'P009',
    patientName: 'James Taylor',
    doctorId: 'D002',
    doctorName: 'Dr. Johnson',
    date: '2024-10-09',
    time: '10:30',
    duration: 45,
    status: 'scheduled',
    type: 'Surgery Consultation',
    queueNumber: 1
  },
  {
    id: '5',
    patientId: 'P010',
    patientName: 'Maria Garcia',
    doctorId: 'D002',
    doctorName: 'Dr. Johnson',
    date: '2024-10-09',
    time: '11:15',
    duration: 30,
    status: 'scheduled',
    type: 'Follow-up',
    queueNumber: 2
  }
];

export const mockDashboardStats: DashboardStats = {
  totalBeds: 12,
  occupiedBeds: 5,
  availableBeds: 5,
  todayAppointments: 5,
  pendingPayments: 1,
  revenue: 28500
};
