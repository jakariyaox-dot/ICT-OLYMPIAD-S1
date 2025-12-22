
export interface Student {
  registrationId: string;
  rollNumber: string;
  name: string;
  bnName: string;
  school: string;
  class: string;
  district: string;
  phone: string;
  email: string;
  photoUrl: string;
  category: string;
  rank?: string;
  score?: string;
  status: 'Selected' | 'Pending' | 'Rejected';
  selectionStatus: 'Passed' | 'Pending' | 'Not Started';
  semiStatus: 'Passed' | 'Pending' | 'Not Started';
  finalStatus: 'Passed' | 'Pending' | 'Not Started';
  certificateUrl?: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: Student | null;
}
