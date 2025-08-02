
export interface User {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'encarregado' | 'monitor';
  name: string;
  lastLogin?: Date;
}

export interface Employee {
  id: string;
  name: string;
  position: string;
  cpf: string;
  phone: string;
  photo?: string;
  isActive: boolean;
  hireDate: Date;
  zone?: string;
  supervisor?: string;
}

export interface DailyWage {
  id: string;
  employeeId: string;
  date: Date;
  amount: number;
  hoursWorked: number;
  overtime?: number;
  notes?: string;
  createdBy: string;
}

export interface Vacation {
  id: string;
  employeeId: string;
  startDate: Date;
  endDate: Date;
  status: 'pending' | 'approved' | 'rejected';
  requestedBy: string;
  approvedBy?: string;
  notes?: string;
}

export interface Attendance {
  id: string;
  employeeId: string;
  date: Date;
  status: 'present' | 'absent' | 'late';
  checkIn?: Date;
  checkOut?: Date;
  notes?: string;
  recordedBy: string;
}
