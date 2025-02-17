export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: 'full-time' | 'part-time' | 'contract';
  description: string;
  requirements: string[];
  posted: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  resume: File | null;
  skills: string[];
  experience: string[];
  savedJobs: string[];
}

export interface ApplicationStatus {
  jobId: string;
  status: 'applied' | 'interviewing' | 'offered' | 'rejected';
  date: string;
}