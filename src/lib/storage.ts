export interface Submission {
  id: string;
  date: string;
  dailyMessages: number;
  dailyOrders: number;
  respondents: number;
  returns: number;
  lostCustomers: number;
  lostMoney: number;
  lossPercentage: number;
}

const STORAGE_KEY = 'ghost_submissions';

export function saveSubmission(sub: Submission) {
  const existing = getSubmissions();
  existing.unshift(sub);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
}

export function getSubmissions(): Submission[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
}

export function clearSubmissions() {
  localStorage.removeItem(STORAGE_KEY);
}
