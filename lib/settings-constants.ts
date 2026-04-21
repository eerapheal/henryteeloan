export interface SystemSettings {
  interestRate: number; // Stored as a number representing percentage, e.g., 20
  maxLoanAmount: number;
  adminEmail: string;
  supportPhone1: string;
  supportPhone2: string;
}

export const defaultSettings: SystemSettings = {
  interestRate: 20,
  maxLoanAmount: 500000,
  adminEmail: 'support@henryteeloans.com',
  supportPhone1: '08034783848',
  supportPhone2: '07025251073',
};
