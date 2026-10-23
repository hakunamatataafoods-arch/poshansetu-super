export interface InventoryStock {
  atta: number;
  bal_shakti: number;
  dal: number;
  matru_shakti: number;
  oil: number;
  purna_shakti: number;
  rice: number;
  lastUpdated?: string;
  todayInward?: {
    atta?: number;
    bal_shakti?: number;
    dal?: number;
    matru_shakti?: number;
    oil?: number;
    purna_shakti?: number;
    rice?: number;
  };
  latestInwardSummary?: string;
}

export interface MealEntry {
  id?: string;
  confirmedBy?: string;
  mealType: 'breakfast' | 'lunch' | 'snack' | string;
  menuName: string;
  recordedAt?: string;
  studentsPresent: number;
  timestamp: string | number;
  totalGrams: number;
}

export interface StudentAttendanceRecord {
  id: number;
  nameEn: string;
  nameGu: string;
  age: string;
  present: boolean;
}

export interface AttendancePayload {
  date: string;
  present_count: number;
  absent_count: number;
  records: StudentAttendanceRecord[];
}

export interface TransactionHistoryItem {
  id?: string;
  balance: number;
  change: number;
  lastAction: string;
  timestamp: number;
  village: string;
  workerName?: string;
  note?: string;
  challanNo?: string;
  commodity?: string;
  expiryDate?: string;
  centerName?: string;
  // Beneficiary distribution details from workers app
  beneficiary?: string;
  beneficiaryCategory?: string;
  itemsDistributed?: Record<string, number | string>;
  itemsSummary?: string;
  photoAttached?: boolean;
}

export interface DistributionRecord {
  id: string;
  beneficiary: string;
  category?: string;
  items: Record<string, number | string>;
  recordedAt?: string;
  timestamp: string | number;
  photoAttached?: boolean;
  remainingStock?: number;
  totalPacketsDeducted?: number;
  centreId?: string;
}

export interface StockTransactionRecord {
  id?: string;
  actionGujarati?: string;
  centerId?: string;
  centerName?: string;
  challanNo?: string;
  commodity?: string;
  dateFormatted?: string;
  expiryDate?: string;
  quantity?: number;
  timestamp?: number;
  transactionType?: 'INWARD' | 'DISTRIBUTION' | 'OUTWARD' | string;
  workerName?: string;
}

export interface AnganwadiCentre {
  id: string;
  endpoint: string;
  code: string;
  nameEn: string;
  nameGu: string;
  taluka: string;
  sector: string;
  workerName: string;
  supervisorName: string;
  phone?: string;
  workerRollNo?: string;
  workerLastFour?: string;
  registeredChildren: number;
}
