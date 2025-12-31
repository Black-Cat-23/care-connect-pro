// Mock data for Hospital Information System Demo

export type UserRole = 'admin' | 'doctor' | 'patient';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
}

export interface Doctor {
  id: string;
  userId: string;
  name: string;
  email: string;
  specialization: string;
  department: string;
  phone: string;
  experience: number;
  rating: number;
  availability: string[];
  avatar?: string;
}

export interface Patient {
  id: string;
  userId: string;
  name: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  bloodGroup: string;
  address: string;
  emergencyContact: string;
  avatar?: string;
  isEmergency?: boolean;
}

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  department: string;
  date: string;
  time: string;
  status: 'pending' | 'approved' | 'completed' | 'cancelled';
  symptoms?: string;
  notes?: string;
}

export interface Prescription {
  id: string;
  patientId: string;
  doctorId: string;
  doctorName: string;
  date: string;
  diagnosis: string;
  medications: {
    name: string;
    dosage: string;
    frequency: string;
    duration: string;
  }[];
  notes?: string;
}

export interface MedicalRecord {
  id: string;
  patientId: string;
  type: 'prescription' | 'report' | 'diagnosis';
  title: string;
  date: string;
  doctorName: string;
  content: string;
  attachments?: string[];
}

// Demo Users
export const demoUsers: User[] = [
  { id: 'admin-1', email: 'admin@hospital.com', name: 'Dr. Sarah Admin', role: 'admin' },
  { id: 'doctor-1', email: 'dr.smith@hospital.com', name: 'Dr. John Smith', role: 'doctor' },
  { id: 'doctor-2', email: 'dr.patel@hospital.com', name: 'Dr. Priya Patel', role: 'doctor' },
  { id: 'patient-1', email: 'patient1@email.com', name: 'Michael Johnson', role: 'patient' },
  { id: 'patient-2', email: 'patient2@email.com', name: 'Emily Davis', role: 'patient' },
  { id: 'patient-3', email: 'patient3@email.com', name: 'Raj Kumar', role: 'patient' },
];

export const departments = [
  'Cardiology',
  'Neurology',
  'Orthopedics',
  'Pediatrics',
  'Dermatology',
  'Oncology',
  'Emergency',
  'General Medicine',
];

export const doctors: Doctor[] = [
  {
    id: 'doc-1',
    userId: 'doctor-1',
    name: 'Dr. John Smith',
    email: 'dr.smith@hospital.com',
    specialization: 'Cardiologist',
    department: 'Cardiology',
    phone: '+1-555-0101',
    experience: 15,
    rating: 4.8,
    availability: ['Monday', 'Wednesday', 'Friday'],
  },
  {
    id: 'doc-2',
    userId: 'doctor-2',
    name: 'Dr. Priya Patel',
    email: 'dr.patel@hospital.com',
    specialization: 'Neurologist',
    department: 'Neurology',
    phone: '+1-555-0102',
    experience: 12,
    rating: 4.9,
    availability: ['Tuesday', 'Thursday', 'Saturday'],
  },
  {
    id: 'doc-3',
    userId: 'doctor-3',
    name: 'Dr. James Wilson',
    email: 'dr.wilson@hospital.com',
    specialization: 'Orthopedic Surgeon',
    department: 'Orthopedics',
    phone: '+1-555-0103',
    experience: 20,
    rating: 4.7,
    availability: ['Monday', 'Tuesday', 'Thursday'],
  },
  {
    id: 'doc-4',
    userId: 'doctor-4',
    name: 'Dr. Lisa Chen',
    email: 'dr.chen@hospital.com',
    specialization: 'Pediatrician',
    department: 'Pediatrics',
    phone: '+1-555-0104',
    experience: 8,
    rating: 4.9,
    availability: ['Monday', 'Wednesday', 'Friday', 'Saturday'],
  },
  {
    id: 'doc-5',
    userId: 'doctor-5',
    name: 'Dr. Ahmed Hassan',
    email: 'dr.hassan@hospital.com',
    specialization: 'General Physician',
    department: 'General Medicine',
    phone: '+1-555-0105',
    experience: 10,
    rating: 4.6,
    availability: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
  },
];

export const patients: Patient[] = [
  {
    id: 'pat-1',
    userId: 'patient-1',
    name: 'Michael Johnson',
    email: 'patient1@email.com',
    phone: '+1-555-1001',
    dateOfBirth: '1985-03-15',
    gender: 'male',
    bloodGroup: 'O+',
    address: '123 Main St, New York, NY',
    emergencyContact: '+1-555-1002',
  },
  {
    id: 'pat-2',
    userId: 'patient-2',
    name: 'Emily Davis',
    email: 'patient2@email.com',
    phone: '+1-555-1003',
    dateOfBirth: '1990-07-22',
    gender: 'female',
    bloodGroup: 'A+',
    address: '456 Oak Ave, Los Angeles, CA',
    emergencyContact: '+1-555-1004',
  },
  {
    id: 'pat-3',
    userId: 'patient-3',
    name: 'Raj Kumar',
    email: 'patient3@email.com',
    phone: '+1-555-1005',
    dateOfBirth: '1978-11-08',
    gender: 'male',
    bloodGroup: 'B+',
    address: '789 Pine Rd, Chicago, IL',
    emergencyContact: '+1-555-1006',
    isEmergency: true,
  },
  {
    id: 'pat-4',
    userId: 'patient-4',
    name: 'Sarah Williams',
    email: 'patient4@email.com',
    phone: '+1-555-1007',
    dateOfBirth: '1995-01-30',
    gender: 'female',
    bloodGroup: 'AB-',
    address: '321 Elm St, Houston, TX',
    emergencyContact: '+1-555-1008',
  },
  {
    id: 'pat-5',
    userId: 'patient-5',
    name: 'David Brown',
    email: 'patient5@email.com',
    phone: '+1-555-1009',
    dateOfBirth: '1982-09-12',
    gender: 'male',
    bloodGroup: 'O-',
    address: '654 Maple Dr, Phoenix, AZ',
    emergencyContact: '+1-555-1010',
  },
];

export const appointments: Appointment[] = [
  {
    id: 'apt-1',
    patientId: 'pat-1',
    patientName: 'Michael Johnson',
    doctorId: 'doc-1',
    doctorName: 'Dr. John Smith',
    department: 'Cardiology',
    date: '2024-12-31',
    time: '09:00',
    status: 'approved',
    symptoms: 'Chest pain, shortness of breath',
  },
  {
    id: 'apt-2',
    patientId: 'pat-2',
    patientName: 'Emily Davis',
    doctorId: 'doc-2',
    doctorName: 'Dr. Priya Patel',
    department: 'Neurology',
    date: '2024-12-31',
    time: '10:30',
    status: 'pending',
    symptoms: 'Recurring headaches, dizziness',
  },
  {
    id: 'apt-3',
    patientId: 'pat-3',
    patientName: 'Raj Kumar',
    doctorId: 'doc-3',
    doctorName: 'Dr. James Wilson',
    department: 'Orthopedics',
    date: '2024-12-31',
    time: '11:00',
    status: 'approved',
    symptoms: 'Lower back pain',
  },
  {
    id: 'apt-4',
    patientId: 'pat-4',
    patientName: 'Sarah Williams',
    doctorId: 'doc-4',
    doctorName: 'Dr. Lisa Chen',
    department: 'Pediatrics',
    date: '2024-12-31',
    time: '14:00',
    status: 'completed',
    symptoms: 'Fever, cold symptoms',
  },
  {
    id: 'apt-5',
    patientId: 'pat-1',
    patientName: 'Michael Johnson',
    doctorId: 'doc-5',
    doctorName: 'Dr. Ahmed Hassan',
    department: 'General Medicine',
    date: '2025-01-02',
    time: '09:30',
    status: 'pending',
    symptoms: 'Follow-up checkup',
  },
];

export const prescriptions: Prescription[] = [
  {
    id: 'presc-1',
    patientId: 'pat-1',
    doctorId: 'doc-1',
    doctorName: 'Dr. John Smith',
    date: '2024-12-28',
    diagnosis: 'Mild hypertension',
    medications: [
      { name: 'Amlodipine', dosage: '5mg', frequency: 'Once daily', duration: '30 days' },
      { name: 'Aspirin', dosage: '75mg', frequency: 'Once daily', duration: '30 days' },
    ],
    notes: 'Monitor blood pressure regularly. Follow low-sodium diet.',
  },
  {
    id: 'presc-2',
    patientId: 'pat-2',
    doctorId: 'doc-2',
    doctorName: 'Dr. Priya Patel',
    date: '2024-12-27',
    diagnosis: 'Tension headache',
    medications: [
      { name: 'Ibuprofen', dosage: '400mg', frequency: 'As needed', duration: '7 days' },
      { name: 'Paracetamol', dosage: '500mg', frequency: 'Every 6 hours', duration: '5 days' },
    ],
    notes: 'Rest advised. Avoid screen time for prolonged periods.',
  },
];

export const medicalRecords: MedicalRecord[] = [
  {
    id: 'rec-1',
    patientId: 'pat-1',
    type: 'diagnosis',
    title: 'Annual Health Checkup',
    date: '2024-12-01',
    doctorName: 'Dr. Ahmed Hassan',
    content: 'Patient is in good overall health. Blood pressure slightly elevated. Recommended lifestyle modifications.',
  },
  {
    id: 'rec-2',
    patientId: 'pat-1',
    type: 'report',
    title: 'ECG Report',
    date: '2024-12-15',
    doctorName: 'Dr. John Smith',
    content: 'ECG shows normal sinus rhythm. No significant abnormalities detected.',
  },
  {
    id: 'rec-3',
    patientId: 'pat-2',
    type: 'report',
    title: 'MRI Brain Scan',
    date: '2024-12-20',
    doctorName: 'Dr. Priya Patel',
    content: 'MRI findings within normal limits. No structural abnormalities.',
  },
];

// Stats for dashboard
export const dashboardStats = {
  totalPatients: 156,
  totalDoctors: 24,
  appointmentsToday: 42,
  emergencyCases: 3,
  averageWaitTime: 15,
  patientSatisfaction: 94,
};

export const departmentStats = [
  { name: 'Cardiology', doctors: 5, patients: 32 },
  { name: 'Neurology', doctors: 4, patients: 28 },
  { name: 'Orthopedics', doctors: 3, patients: 24 },
  { name: 'Pediatrics', doctors: 4, patients: 35 },
  { name: 'Dermatology', doctors: 2, patients: 18 },
  { name: 'General Medicine', doctors: 6, patients: 45 },
];

export const weeklyAppointments = [
  { day: 'Mon', count: 45 },
  { day: 'Tue', count: 52 },
  { day: 'Wed', count: 38 },
  { day: 'Thu', count: 48 },
  { day: 'Fri', count: 55 },
  { day: 'Sat', count: 32 },
  { day: 'Sun', count: 12 },
];
