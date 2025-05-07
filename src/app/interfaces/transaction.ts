export interface Transaction {
  _id: string;
  type: string;
  amount: number;
  from: string;
  to: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface TransactionData {
  // id: string;
  type: string;
  amount: number;
  from: string;
  to: string;
  createdAt: Date;
  // updatedAt: Date;
}
