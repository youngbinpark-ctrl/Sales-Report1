
export enum SalesStatus {
  PERFORMANCE = '성과',
  REVIEWING = '검토 中',
  REJECTED = '거절',
  SPECIAL = '특이사항',
  MEETING = '미팅 예정',
  FOLLOW_UP = 'F/U 필요'
}

export interface SalesItem {
  id: string;
  name: string;
  status: SalesStatus;
  category?: string; // New field for sub-categorization (e.g., Contract Renewal, New Store)
  details?: string;
  subCount?: number;
}

export interface SalesSummary {
  status: SalesStatus;
  count: number;
  color: string;
  icon: string;
}

export interface AIInsight {
  title: string;
  content: string;
  type: 'urgent' | 'opportunity' | 'warning' | 'info';
}
