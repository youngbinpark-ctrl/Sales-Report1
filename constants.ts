
import { SalesStatus, SalesItem, SalesSummary } from './types';

export const INITIAL_DATA: SalesItem[] = [
  // ■ 성과 (1건)
  { 
    id: '1', 
    status: SalesStatus.PERFORMANCE, 
    name: '콘타이 이노88타워점', 
    details: '12일 가입 예정 (직영 매장 총 40개 이노타워점 선진입 예정)' 
  },

  // ■ 검토 中 (2건)
  { 
    id: '2', 
    status: SalesStatus.REVIEWING, 
    name: '드포레와인다이닝', 
    details: '긍정적, 재미팅 필요' 
  },
  { 
    id: '3', 
    status: SalesStatus.REVIEWING, 
    name: '유유자적', 
    details: '긍정적' 
  },

  // ■ 거절 (1건)
  { 
    id: '4', 
    status: SalesStatus.REJECTED, 
    name: '코바치', 
    details: '연령층 높음 이슈, KT테블릿오더 사용중' 
  },

  // ■ 특이사항
  { 
    id: '5', 
    status: SalesStatus.SPECIAL, 
    name: '팜팜발리', 
    details: '폐업 후 발리문 매장으로 새롭게 오픈 예정, 발리문으로 계약 예정, 계약 딜레이 (2월중 예상)' 
  },

  // ■ 미팅 예정 (총 11건)
  { id: '6', status: SalesStatus.MEETING, name: '육구공' },
  { id: '7', status: SalesStatus.MEETING, name: '비욘드강남' },
  { id: '8', status: SalesStatus.MEETING, name: '머무를정세로이무시', details: '총 3개 매장 운영' },
  { id: '9', status: SalesStatus.MEETING, name: '기후' },
  { id: '10', status: SalesStatus.MEETING, name: '피센시오', details: '가벼운 방문 개념' },
  { id: '11', status: SalesStatus.MEETING, name: '신사획', details: '쿠팡포스' },
  { id: '12', status: SalesStatus.MEETING, name: '불타는꼬꼬발 문래', details: '쿠팡포스' },
  { id: '13', status: SalesStatus.MEETING, name: '고도식', details: '총 2개 매장 운영' },
  { id: '14', status: SalesStatus.MEETING, name: '용가훠궈 본사', details: '미팅 일정 변경 가능성 있음' },
  { id: '15', status: SalesStatus.MEETING, name: '페이퍼파스타' },
  { id: '16', status: SalesStatus.MEETING, name: '르뵈프 잠실', details: '총 2개 매장 운영, 일정 변경 가능성 있음' },

  // ■ F/U 필요매장 (14건) - Categorized
  // Category: Contract Renewal Needed (Focus on sales closing/contracts)
  { id: '17', status: SalesStatus.FOLLOW_UP, category: 'Contract Renewal Needed', name: '중화요리연', details: '직영매장 6' },
  { id: '18', status: SalesStatus.FOLLOW_UP, category: 'Contract Renewal Needed', name: '발리문', details: '메뉴잇 해지 후 태그히어 가입 예정' },
  { id: '19', status: SalesStatus.FOLLOW_UP, category: 'Contract Renewal Needed', name: '진구곱창' },
  
  // Category: New Store Launch Support (New openings/pilots)
  { id: '20', status: SalesStatus.FOLLOW_UP, category: 'New Store Launch Support', name: '연도리', details: '파일럿매장 1' },
  { id: '21', status: SalesStatus.FOLLOW_UP, category: 'New Store Launch Support', name: '비캔드', details: '2월 매장 새롭게 오픈' },

  // Category: Technical Issue Follow-up (General check-ins usually imply support or tech)
  { id: '22', status: SalesStatus.FOLLOW_UP, category: 'Technical Issue Follow-up', name: '블루바이필레터' },
  { id: '23', status: SalesStatus.FOLLOW_UP, category: 'Technical Issue Follow-up', name: '오묘' },
  { id: '24', status: SalesStatus.FOLLOW_UP, category: 'Technical Issue Follow-up', name: '당스' },
  { id: '25', status: SalesStatus.FOLLOW_UP, category: 'Technical Issue Follow-up', name: '리타르단도', details: '당스 대표 운영 매장' },
];

export const STATUS_CONFIG: Record<SalesStatus, { color: string; bg: string; icon: string }> = {
  [SalesStatus.PERFORMANCE]: { color: '#059669', bg: 'bg-emerald-100', icon: '🏆' },
  [SalesStatus.REVIEWING]: { color: '#d97706', bg: 'bg-amber-100', icon: '⚖️' },
  [SalesStatus.REJECTED]: { color: '#dc2626', bg: 'bg-rose-100', icon: '🚫' },
  [SalesStatus.SPECIAL]: { color: '#7c3aed', bg: 'bg-violet-100', icon: '✨' },
  [SalesStatus.MEETING]: { color: '#2563eb', bg: 'bg-blue-100', icon: '📅' },
  [SalesStatus.FOLLOW_UP]: { color: '#475569', bg: 'bg-slate-200', icon: '🔄' },
};

export const CATEGORY_COLORS: Record<string, string> = {
  'Contract Renewal Needed': 'bg-blue-100 text-blue-700 border-blue-200',
  'New Store Launch Support': 'bg-green-100 text-green-700 border-green-200',
  'Technical Issue Follow-up': 'bg-orange-100 text-orange-700 border-orange-200',
  'Menu Update Required': 'bg-purple-100 text-purple-700 border-purple-200',
};
