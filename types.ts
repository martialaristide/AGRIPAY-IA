
export type Page = 'dashboard' | 'assistant' | 'finance' | 'analytics' | 'planner';

export interface Transaction {
  id: string;
  type: 'Credit' | 'Debit';
  amount: number;
  description: string;
  date: string;
  status: 'Completed' | 'Pending' | 'Failed';
}

export interface Message {
  role: 'user' | 'model';
  parts: { text: string }[];
  image?: string;
}