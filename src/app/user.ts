export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  website: string;
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  notes: string;
  type: 'small-business' | 'enterprise' | 'entrepreneur';
  category: 'clothes' | 'toys' | 'groceries' | 'electronics' | 'digital' | null;
  comissionPercentage: number;
  activeFrom: Date;
  logo: File | null;
  criticalAccount: boolean;
  paymentOptions: 'Cash On Delivery' | 'UPI' | 'Card Payment';
  logoUrl: string;
  fileName: string;
  createdBy: string;
}

export interface PaymentOptions {
  'cash-on-delivery': boolean;
  upi: boolean;
  'card-payment': boolean;
}

export class User {
  constructor(
    public id: string,
    public name: string,
    public email: string,
    public phone: string,
    public website: string,
    public contactName: string,
    public contactPhone: string,
    public contactEmail: string,
    public notes: string,
    public type: 'small-business' | 'enterprise' | 'entrepreneur',
    public category:
      | 'clothes'
      | 'toys'
      | 'groceries'
      | 'electronics'
      | 'digital'
      | null,
    public comissionPercentage: number,
    public activeFrom: Date,
    public logo: File | null,
    public criticalAccount: boolean,
    paymentOptions: 'Cash On Delivery' | 'UPI' | 'Card Payment',
    public logoUrl: string,
    public fileName: string,
    public createdBy: string
  ) {}
}
