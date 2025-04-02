export interface Tenant {
  email: string | null;
  id: string;
  last_name: string;
  debt_amount: number;
  thread_id: string;
  assistant_id: string;
  first_name: string;
  phone_number: string;
  created_at: string;
  debt_date: string;
}

export interface ApiError {
  message: string;
  status?: number;
} 