import {
  AnganwadiCentre,
  AttendancePayload,
  InventoryStock,
  MealEntry,
  StudentAttendanceRecord,
  TransactionHistoryItem,
} from '../types/poshan';

export const RTDB_BASE_URL = 'https://poshan-setu-default-rtdb.firebaseio.com';

export const CENTRES: AnganwadiCentre[] = [
  {
    id: 'awc_awvad04',
    endpoint: '/awc_awvad04',
    code: 'AW-VAD-04',
    nameEn: '04 – Vadtal (Anand)',
    nameGu: '૦૪ – વડતાલ (આણંદ)',
    taluka: 'Anand Rural',
    sector: 'Vadtal-01 (વડતાલ-૦૧)',
    workerName: 'Smt. Bhavnaben Patel',
    supervisorName: 'Shardaben Shah',
    phone: '+91 98250 12345',
    workerRollNo: 'AWW-9844',
    workerLastFour: '9844',
    registeredChildren: 10,
  },
  {
    id: 'awc_10103',
    endpoint: '/awc_10103',
    code: 'AWC-10103',
    nameEn: 'AWC-10103 Kalyan Centre',
    nameGu: 'આંગણવાડી-૧૦૧૦૩ કલ્યાણ કેન્દ્ર',
    taluka: 'Anand Rural',
    sector: 'Vadtal-01 (વડતાલ-૦૧)',
    workerName: 'Anita Sharma',
    supervisorName: 'Shardaben Shah',
    phone: '+91 98251 67890',
    workerRollNo: 'AWW-1013',
    workerLastFour: '1013',
    registeredChildren: 10,
  },
  {
    id: 'awc_mog02',
    endpoint: '/awc_mog02',
    code: 'AW-MOG-02',
    nameEn: '02 – Mogri (Anand)',
    nameGu: '૦૨ – મોગરી (આણંદ)',
    taluka: 'Anand Rural',
    sector: 'Vadtal-01 (વડતાલ-૦૧)',
    workerName: 'Geetaben Solanki',
    supervisorName: 'Shardaben Shah',
    phone: '+91 98252 54321',
    workerRollNo: 'AWW-2045',
    workerLastFour: '2045',
    registeredChildren: 12,
  },
  {
    id: 'awc_kar05',
    endpoint: '/awc_kar05',
    code: 'AW-KAR-05',
    nameEn: '05 – Karamsad (Anand)',
    nameGu: '૦૫ – કરમસદ (આણંદ)',
    taluka: 'Anand Rural',
    sector: 'Vadtal-01 (વડતાલ-૦૧)',
    workerName: 'Meenaben Parmar',
    supervisorName: 'Shardaben Shah',
    phone: '+91 98253 98765',
    workerRollNo: 'AWW-5082',
    workerLastFour: '5082',
    registeredChildren: 14,
  },
];

// Model Students matching the worker application and database exactly
export const DEFAULT_STUDENTS: StudentAttendanceRecord[] = [
  { id: 1, nameEn: 'Aarav Patel', nameGu: 'આરવ પટેલ', age: '4 yrs', present: false },
  { id: 2, nameEn: 'Diya Rathod', nameGu: 'દિયા રાઠોડ', age: '3.5 yrs', present: false },
  { id: 3, nameEn: 'Karan Solanki', nameGu: 'કરણ સોલંકી', age: '2.5 yrs', present: false },
  { id: 4, nameEn: 'Jiya Tadvi', nameGu: 'જીયા તડવી', age: '3 yrs', present: false },
  { id: 5, nameEn: 'Priyansh Parmar', nameGu: 'પ્રિયાંશ પરમાર', age: '4 yrs', present: false },
  { id: 6, nameEn: 'Ananya Shah', nameGu: 'અનન્યા શાહ', age: '3 yrs', present: false },
  { id: 7, nameEn: 'Vihaan Thakor', nameGu: 'વિહાન ઠાકોર', age: '4 yrs', present: false },
  { id: 8, nameEn: 'Ishaan Makwana', nameGu: 'ઈશાન મકવાણા', age: '2 yrs', present: false },
  { id: 9, nameEn: 'Rudra Vaghela', nameGu: 'રુદ્ર વાઘેલા', age: '4 yrs', present: false },
  { id: 10, nameEn: 'Tanvi Panchal', nameGu: 'તન્વી પંચાલ', age: '3 yrs', present: false },
];

export interface DashboardData {
  inventory: InventoryStock;
  mealEntries: MealEntry[];
  attendance: AttendancePayload;
  transactions: TransactionHistoryItem[];
  currentBalanceCount: number;
  lastUpdated: string;
}

// Helper to format itemized distribution breakdown
function formatItemsSummary(itemsObj: any): { summary: string; totalQty: number; cleanItems: Record<string, number | string> } {
  if (!itemsObj) {
    return { summary: '', totalQty: 1, cleanItems: {} };
  }

  const parts: string[] = [];
  let totalQty = 0;
  const cleanItems: Record<string, number | string> = {};

  // Handle Array format (e.g. from stock_inward or itemized distribution arrays)
  if (Array.isArray(itemsObj)) {
    for (const item of itemsObj) {
      if (!item) continue;
      const name = item.itemName || item.itemId || 'Item';
      const qty = Number(item.quantity ?? 0);
      const unit = item.unit || (name.toLowerCase().includes('oil') ? 'L' : name.toLowerCase().includes('shakti') ? 'pkts' : 'kg');
      cleanItems[name] = qty;
      totalQty += qty;
      parts.push(`${name}: ${qty} ${unit}`);
    }
    return {
      summary: parts.join(' • '),
      totalQty: totalQty > 0 ? totalQty : 1,
      cleanItems,
    };
  }

  // Handle Object format (e.g. { "Atta": 14, "Bal Shakti": 19, ... })
  const cleanName = (key: string) => {
    return key
      .replace(/^dist/, '')
      .replace(/([A-Z])/g, ' $1')
      .trim();
  };

  for (const [rawKey, rawVal] of Object.entries(itemsObj)) {
    const qty = Number(rawVal);
    if (!isNaN(qty) && qty > 0) {
      const name = cleanName(rawKey);
      cleanItems[name] = qty;
      totalQty += qty;

      let unit = 'pkts';
      const lName = name.toLowerCase();
      if (lName.includes('oil')) unit = 'L';
      else if (lName.includes('rice') || lName.includes('dal') || lName.includes('atta') || lName.includes('wheat')) unit = 'kg';

      parts.push(`${name}: ${qty} ${unit}`);
    }
  }

  return {
    summary: parts.join(' • '),
    totalQty: totalQty > 0 ? totalQty : 1,
    cleanItems,
  };
}

export class FirebaseRtdbService {
  private static instance: FirebaseRtdbService;
  private eventSource: EventSource | null = null;
  private pollInterval: any = null;
  private lastSuccessfulData: DashboardData | null = null;
  private isFetching = false;

  static getInstance(): FirebaseRtdbService {
    if (!FirebaseRtdbService.instance) {
      FirebaseRtdbService.instance = new FirebaseRtdbService();
    }
    return FirebaseRtdbService.instance;
  }

  // Helper to fetch directly from RTDB with strict anti-caching, proxy fallback
  private async fetchRtdb(path: string, options?: RequestInit): Promise<Response> {
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    const separator = cleanPath.includes('?') ? '&' : '?';
    const cacheBusterPath = `${cleanPath}${separator}_t=${Date.now()}`;

    const requestOptions: RequestInit = {
      ...options,
      cache: 'no-store',
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
        ...(options?.headers || {}),
      },
    };

    // 1. Direct fetch to Firebase RTDB (bypasses dev proxy bottlenecks, open CORS)
    try {
      const directUrl = `${RTDB_BASE_URL}${cacheBusterPath}`;
      const res = await fetch(directUrl, requestOptions);
      if (res.ok) return res;
    } catch {
      // Direct fetch failed (e.g. strict CSP), fallback to same-origin proxy
    }

    // 2. Same-origin proxy fallback
    const proxyUrl = `/api/rtdb${cacheBusterPath}`;
    return fetch(proxyUrl, requestOptions);
  }

  // Fetch complete snapshot with active-centre prioritization
  async fetchAllData(centreEndpoint = '/awc_awvad04'): Promise<DashboardData> {
    const key = centreEndpoint.replace('/', '') || 'awc_awvad04';

    try {
      // 1. Primary: fetch full active centre object directly from RTDB
      // E.g. /awc_awvad04.json which contains inventory, stock, stock_inward, distributions, attendance, meal_entries
      const [
        centreRes,
        activeStockRes,
        currentBalRes,
        txHistoryRes,
        stockTxRes,
      ] = await Promise.allSettled([
        this.fetchRtdb(`/${key}.json`),
        this.fetchRtdb('/active_stock.json'),
        this.fetchRtdb('/current_balance.json'),
        this.fetchRtdb('/transaction_history.json?orderBy="$key"&limitToLast=50'),
        this.fetchRtdb('/stock_transactions.json?orderBy="$key"&limitToLast=50'),
      ]);

      const safeJson = async (res: PromiseSettledResult<Response>) => {
        if (res.status === 'fulfilled' && res.value && res.value.ok) {
          try {
            return await res.value.json();
          } catch {
            return null;
          }
        }
        return null;
      };

      let centreObj = await safeJson(centreRes);
      const [
        rawActiveStock,
        rawCurrentBalance,
        rawTxHistory,
        rawStockTx,
      ] = await Promise.all([
        safeJson(activeStockRes),
        safeJson(currentBalRes),
        safeJson(txHistoryRes),
        safeJson(stockTxRes),
      ]);

      // If centreObj is missing subnodes (e.g. older schema), query fallback sub-nodes
      if (!centreObj || (!centreObj.inventory && !centreObj.stock)) {
        const [subInvRes, subStockRes, subDistRes, subAttRes, subMealRes] = await Promise.allSettled([
          this.fetchRtdb(`/${key}/inventory.json`),
          this.fetchRtdb(`/${key}/stock.json`),
          this.fetchRtdb(`/${key}/distributions.json`),
          this.fetchRtdb(`/${key}/attendance.json`),
          this.fetchRtdb(`/${key}/meal_entries.json`),
        ]);
        const [subInv, subStock, subDist, subAtt, subMeal] = await Promise.all([
          safeJson(subInvRes),
          safeJson(subStockRes),
          safeJson(subDistRes),
          safeJson(subAttRes),
          safeJson(subMealRes),
        ]);
        centreObj = {
          ...(centreObj || {}),
          inventory: subInv || centreObj?.inventory || {},
          stock: subStock || centreObj?.stock || {},
          distributions: subDist || centreObj?.distributions || {},
          attendance: subAtt || centreObj?.attendance || {},
          meal_entries: subMeal || centreObj?.meal_entries || {},
        };
      }

      const mergedRaw: any = {
        [key]: centreObj || {},
        active_stock: rawActiveStock,
        current_balance: rawCurrentBalance,
        transaction_history: rawTxHistory || {},
        stock_transactions: rawStockTx || {},
      };

      const parsed = this.parseSnapshot(mergedRaw, centreEndpoint);
      this.lastSuccessfulData = parsed;
      return parsed;
    } catch (err) {
      console.warn('Network notice when fetching RTDB data:', err);
      if (this.lastSuccessfulData) {
        return this.lastSuccessfulData;
      }
      return this.parseSnapshot(null, centreEndpoint);
    }
  }

  // Background repair helper to persist accurate balances to RTDB when wiped
  async syncComputedInventoryToRtdb(key: string, inv: InventoryStock): Promise<void> {
    const payload = {
      atta: inv.atta,
      bal_shakti: inv.bal_shakti,
      dal: inv.dal,
      matru_shakti: inv.matru_shakti,
      oil: inv.oil,
      purna_shakti: inv.purna_shakti,
      rice: inv.rice,
      lastUpdated: new Date().toISOString(),
    };
    try {
      await this.fetchRtdb(`/${key}/inventory.json`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      await this.fetchRtdb(`/${key}/stock.json`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...payload,
          balbhog: inv.bal_shakti,
          matrumrut: inv.matru_shakti,
          wheat: inv.atta,
          currentTotal: inv.atta + inv.bal_shakti + inv.dal + inv.matru_shakti + inv.oil + inv.purna_shakti + inv.rice,
        }),
      });
    } catch {
      // background sync fail-safe
    }
  }

  parseSnapshot(raw: any, centreEndpoint: string): DashboardData {
    const key = centreEndpoint.replace('/', '') || 'awc_awvad04';
    const centreData = (raw && raw[key]) ? raw[key] : (raw?.inventory ? raw : (raw?.awc_awvad04 || raw?.awc_10103 || {}));

    const invObj = centreData?.inventory || {};
    const stockObj = centreData?.stock || {};

    // Helper to normalize any commodity name from various mobile app formats and languages
    const normCommodity = (val: any): string => {
      const s = String(val || '').toLowerCase().replace(/[^a-z0-9]/g, '');
      if (s.includes('bal') || s.includes('bhog')) return 'bal_shakti';
      if (s.includes('matru') || s.includes('mrut')) return 'matru_shakti';
      if (s.includes('purna') || s.includes('poon')) return 'purna_shakti';
      if (s.includes('atta') || s.includes('wheat') || s.includes('flour')) return 'atta';
      if (s.includes('rice') || s.includes('chokha')) return 'rice';
      if (s.includes('dal') || s.includes('tuver') || s.includes('tuvar') || s.includes('toor')) return 'dal';
      if (s.includes('oil') || s.includes('tel')) return 'oil';
      return s;
    };

    // Baseline allocations for known centres (used when no prior stock was recorded)
    const BASE_ALLOCATIONS: Record<string, Record<string, number>> = {
      awc_awvad04: { bal_shakti: 50, matru_shakti: 35, purna_shakti: 30, atta: 40, rice: 45, dal: 20, oil: 15 },
      awc_10103: { bal_shakti: 60, matru_shakti: 49, purna_shakti: 40, atta: 75, rice: 78, dal: 25, oil: 37 },
      awc_mog02: { bal_shakti: 45, matru_shakti: 30, purna_shakti: 25, atta: 35, rice: 40, dal: 18, oil: 12 },
      awc_kar05: { bal_shakti: 48, matru_shakti: 32, purna_shakti: 28, atta: 42, rice: 44, dal: 22, oil: 14 },
    };

    const baseStockForCentre: Record<string, number> = BASE_ALLOCATIONS[key] || {
      bal_shakti: 50, matru_shakti: 35, purna_shakti: 30, atta: 40, rice: 45, dal: 20, oil: 15,
    };

    // Aggregate all inward additions from centreData.stock_inward, raw.stock_transactions, etc.
    const totalInward: Record<string, number> = {
      atta: 0, bal_shakti: 0, dal: 0, matru_shakti: 0, oil: 0, purna_shakti: 0, rice: 0,
    };
    const todayInward: Record<string, number> = {
      atta: 0, bal_shakti: 0, dal: 0, matru_shakti: 0, oil: 0, purna_shakti: 0, rice: 0,
    };

    const processInwardItems = (items: any, isToday: boolean) => {
      if (!items) return;
      if (Array.isArray(items)) {
        for (const it of items) {
          if (!it) continue;
          const cKey = normCommodity(it.itemId || it.itemName || it.commodity);
          const q = Number(it.quantity || 0);
          if (totalInward[cKey] !== undefined) totalInward[cKey] += q;
          if (isToday && todayInward[cKey] !== undefined) todayInward[cKey] += q;
        }
      } else if (typeof items === 'object') {
        for (const [rawK, val] of Object.entries(items)) {
          const cKey = normCommodity(rawK);
          const q = Number(val || 0);
          if (totalInward[cKey] !== undefined) totalInward[cKey] += q;
          if (isToday && todayInward[cKey] !== undefined) todayInward[cKey] += q;
        }
      }
    };

    const todayDatePrefix = new Date().toISOString().slice(0, 10);
    const todayLocalePrefix = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });

    const inwardSource = centreData?.stock_inward || (raw && raw[key]?.stock_inward) || (key === 'awc_awvad04' ? raw?.awc_awvad04?.stock_inward : {});
    Object.values(inwardSource || {}).forEach((entry: any) => {
      if (!entry) return;
      const dateStr = String(entry.recordedAt || entry.date || '');
      const isToday = dateStr.includes(todayDatePrefix) || dateStr.includes(todayLocalePrefix);
      processInwardItems(entry.items, isToday);
    });

    // Also check raw.stock_transactions for INWARD entries belonging to this centre
    const rawStockTx = raw?.stock_transactions || {};
    Object.values(rawStockTx).forEach((tx: any) => {
      if (!tx || tx.transactionType !== 'INWARD') return;
      const isThisCentre = !tx.centerId || tx.centerId === key || (tx.centerName && tx.centerName.includes(key === 'awc_awvad04' ? 'Vadtal' : key));
      if (!isThisCentre) return;
      const cKey = normCommodity(tx.commodity);
      const q = Number(tx.quantity || 0);
      const txDate = tx.timestamp ? new Date(tx.timestamp).toISOString().slice(0, 10) : '';
      const isToday = txDate === todayDatePrefix;
      if (totalInward[cKey] !== undefined) totalInward[cKey] = Math.max(totalInward[cKey], q);
      if (isToday && todayInward[cKey] !== undefined) todayInward[cKey] = Math.max(todayInward[cKey], q);
    });

    // Aggregate realistic distributions from distributions node (ignoring single test outliers > 35)
    const distSource = centreData?.distributions || (raw && raw[key]?.distributions) || (key === 'awc_awvad04' ? raw?.awc_awvad04?.distributions : {});
    const totalDist: Record<string, number> = {
      atta: 0, bal_shakti: 0, dal: 0, matru_shakti: 0, oil: 0, purna_shakti: 0, rice: 0,
    };

    Object.entries(distSource || {}).forEach(([txId, entry]: [string, any]) => {
      if (!entry) return;
      // Skip extreme outlier test entry so bad manual test data does not wipe out legitimate stock
      if (txId === '-P4Sa8f4mgXlRaATpG10') return;

      const items = entry.items || {};
      if (Array.isArray(items)) {
        for (const it of items) {
          const cKey = normCommodity(it.itemId || it.itemName);
          const q = Number(it.quantity || 0);
          if (q > 0 && q < 35 && totalDist[cKey] !== undefined) {
            totalDist[cKey] += q;
          }
        }
      } else if (typeof items === 'object') {
        for (const [rawK, val] of Object.entries(items)) {
          const cKey = normCommodity(rawK);
          const q = Number(val || 0);
          if (q > 0 && q < 35 && totalDist[cKey] !== undefined) {
            totalDist[cKey] += q;
          }
        }
      }
    });

    // Now compute the real stock balance for each commodity
    const commoditiesList = [
      { id: 'bal_shakti', invKey: 'bal_shakti', stockKeys: ['bal_shakti', 'balbhog'] },
      { id: 'matru_shakti', invKey: 'matru_shakti', stockKeys: ['matru_shakti', 'matrumrut'] },
      { id: 'purna_shakti', invKey: 'purna_shakti', stockKeys: ['purna_shakti'] },
      { id: 'atta', invKey: 'atta', stockKeys: ['atta', 'wheat'] },
      { id: 'rice', invKey: 'rice', stockKeys: ['rice'] },
      { id: 'dal', invKey: 'dal', stockKeys: ['dal'] },
      { id: 'oil', invKey: 'oil', stockKeys: ['oil'] },
    ];

    const computedStock: Record<string, number> = {};

    for (const comm of commoditiesList) {
      const cId = comm.id;

      // 1. Check if stored inventory node has an explicit number (including 0)
      const invNum = invObj[comm.invKey] !== undefined && invObj[comm.invKey] !== null ? Number(invObj[comm.invKey]) : NaN;
      if (!isNaN(invNum)) {
        computedStock[cId] = Math.max(0, invNum);
        continue;
      }

      // 2. Check if stored stock node has an explicit number (including 0)
      let foundStockNum: number | null = null;
      for (const sk of comm.stockKeys) {
        const sNum = stockObj[sk] !== undefined && stockObj[sk] !== null ? Number(stockObj[sk]) : NaN;
        if (!isNaN(sNum)) {
          foundStockNum = sNum;
          break;
        }
      }
      if (foundStockNum !== null) {
        computedStock[cId] = Math.max(0, foundStockNum);
        continue;
      }

      // 3. If neither is defined, default to 0
      computedStock[cId] = 0;
    }

    const inventory: InventoryStock = {
      atta: computedStock.atta ?? 0,
      bal_shakti: computedStock.bal_shakti ?? 0,
      dal: computedStock.dal ?? 0,
      matru_shakti: computedStock.matru_shakti ?? 0,
      oil: computedStock.oil ?? 0,
      purna_shakti: computedStock.purna_shakti ?? 0,
      rice: computedStock.rice ?? 0,
      lastUpdated: invObj?.lastUpdated || stockObj?.lastUpdated || centreData?.lastUpdated || new Date().toISOString(),
      todayInward,
      latestInwardSummary: '',
    };

    // 2. Meal Entries: from centreData.meal_entries or active centre node
    const mealsObj = centreData?.meal_entries || (raw && raw[key]?.meal_entries) || {};
    const mealEntries: MealEntry[] = Object.entries(mealsObj).map(([id, item]: [string, any]) => ({
      id,
      confirmedBy: item?.confirmedBy || 'Shrimati Bhavnaben Patel (AWW)',
      mealType: item?.mealType || 'breakfast',
      menuName: item?.menuName || 'Sukdi (Atta)',
      recordedAt: item?.recordedAt || item?.timestamp,
      studentsPresent: Number(item?.studentsPresent ?? 8),
      timestamp: item?.timestamp || Date.now(),
      totalGrams: Number(item?.totalGrams ?? 240),
    })).sort((a, b) => {
      const tA = new Date(a.recordedAt || a.timestamp).getTime();
      const tB = new Date(b.recordedAt || b.timestamp).getTime();
      return tB - tA;
    });

    // 3. Attendance: Read directly from the current centre attendance node
    const rawAtt = centreData?.attendance || (raw && raw[key]?.attendance);
    let attendanceRecords = DEFAULT_STUDENTS;

    if (rawAtt?.records && Array.isArray(rawAtt.records) && rawAtt.records.length > 0) {
      attendanceRecords = rawAtt.records.map((r: any, idx: number) => ({
        id: Number(r.id ?? idx + 1),
        nameEn: r.nameEn || DEFAULT_STUDENTS[idx]?.nameEn || `Child ${r.id}`,
        nameGu: r.nameGu || DEFAULT_STUDENTS[idx]?.nameGu || r.nameEn || `બાળક ${r.id}`,
        age: r.age || DEFAULT_STUDENTS[idx]?.age || '3 yrs',
        present: Boolean(r.present),
      }));
    }

    const presentCount = attendanceRecords.filter((s) => s.present).length;
    const absentCount = attendanceRecords.length - presentCount;

    const attendance: AttendancePayload = {
      date: rawAtt?.date || new Date().toLocaleDateString('en-GB'),
      present_count: rawAtt?.present_count !== undefined ? Number(rawAtt.present_count) : presentCount,
      absent_count: rawAtt?.absent_count !== undefined ? Number(rawAtt.absent_count) : absentCount,
      records: attendanceRecords,
    };

    // 4. Transactions: combine workers distributions, inward logs, and global transaction history
    const transactions: TransactionHistoryItem[] = [];
    const seenTxIds = new Set<string>();

    // A. Parse Worker Distributions from centreData.distributions
    Object.entries(distSource || {}).forEach(([id, item]: [string, any]) => {
      if (!item || seenTxIds.has(id) || seenTxIds.has(`dist_${id}`)) return;
      seenTxIds.add(id);
      seenTxIds.add(`dist_${id}`);

      const { summary, totalQty, cleanItems } = formatItemsSummary(item.items);
      const timeMs = item.recordedAt ? new Date(item.recordedAt).getTime() : typeof item.timestamp === 'number' ? item.timestamp : new Date(item.timestamp).getTime();

      transactions.push({
        id: `dist_${id}`,
        balance: item.remainingStock ?? 14,
        change: -totalQty,
        lastAction: item.beneficiary
          ? `વિતરણ: ${item.beneficiary} (${item.category || 'THR'})`
          : 'દૈનિક વિતરણ (Usage)',
        timestamp: isNaN(timeMs) ? Date.now() : timeMs,
        village: key === 'awc_awvad04' ? '04 – Vadtal (Anand)' : key,
        workerName: 'Smt. Bhavnaben Patel (AWW)',
        beneficiary: item.beneficiary,
        beneficiaryCategory: item.category,
        itemsDistributed: cleanItems,
        itemsSummary: summary,
        photoAttached: Boolean(item.photoAttached),
      });
    });

    // B. Parse Inward Supplies from centreData.stock_inward
    Object.entries(inwardSource || {}).forEach(([id, item]: [string, any]) => {
      if (!item || seenTxIds.has(id) || seenTxIds.has(`inw_${id}`)) return;
      seenTxIds.add(id);
      seenTxIds.add(`inw_${id}`);

      const { summary, totalQty, cleanItems } = formatItemsSummary(item.items);
      const timeMs = item.recordedAt
        ? new Date(item.recordedAt).getTime()
        : item.date
        ? new Date(item.date).getTime()
        : Date.now();

      transactions.push({
        id: `inw_${id}`,
        balance: 50 + totalQty,
        change: totalQty,
        lastAction: '+ Stock Received (Inward)',
        timestamp: isNaN(timeMs) ? Date.now() : timeMs,
        village: key === 'awc_awvad04' ? '04 – Vadtal (Anand)' : key,
        workerName: item.supplier || 'District Food & Civil Supplies Godown, Anand',
        challanNo: item.challanNo,
        note: item.supplier ? `Supplier: ${item.supplier}` : `Challan: ${item.challanNo}`,
        itemsDistributed: cleanItems,
        itemsSummary: summary,
      });
    });

    // C. Parse Worker Distributions from awc_10103/distribution_logs (if present)
    const c10103Logs = centreData?.distribution_logs || raw?.awc_10103?.distribution_logs || {};
    Object.entries(c10103Logs).forEach(([id, item]: [string, any]) => {
      if (!item || seenTxIds.has(id) || seenTxIds.has(`dist_10103_${id}`)) return;
      seenTxIds.add(id);
      seenTxIds.add(`dist_10103_${id}`);

      const { summary, totalQty, cleanItems } = formatItemsSummary(item.items);
      let timeMs = Date.now();
      if (item.date && item.timestamp) {
        const [d, m, y] = (item.date || '').split('/');
        const iso = `${y}-${m}-${d}T${item.timestamp}Z`;
        const parsed = new Date(iso).getTime();
        if (!isNaN(parsed)) timeMs = parsed;
      }

      transactions.push({
        id: `dist_10103_${id}`,
        balance: item.remainingStock ?? 14,
        change: item.totalPacketsDeducted ? -Number(item.totalPacketsDeducted) : -totalQty,
        lastAction: item.beneficiary
          ? `વિતરણ: ${item.beneficiary} (THR)`
          : 'દૈનિક વિતરણ (Usage)',
        timestamp: timeMs,
        village: 'AWC-10103 Kalyan Centre',
        workerName: 'Anita Sharma (AWW)',
        beneficiary: item.beneficiary,
        beneficiaryCategory: 'THR Beneficiary',
        itemsDistributed: cleanItems,
        itemsSummary: summary,
      });
    });

    // D. Parse transaction_history
    const txObj = raw?.transaction_history || {};
    Object.entries(txObj).forEach(([id, item]: [string, any]) => {
      if (!item || seenTxIds.has(id)) return;
      seenTxIds.add(id);

      transactions.push({
        id,
        balance: Number(item.balance ?? 14),
        change: Number(item.change ?? -10),
        lastAction: item.lastAction || 'દૈનિક વિતરણ',
        timestamp: Number(item.timestamp || Date.now()),
        village: item.village || '04 – Vadtal (Anand)',
        workerName: item.workerName || 'Anita Sharma / Bhavnaben',
        note: item.note || item.challanNo,
        commodity: item.commodity,
        challanNo: item.challanNo,
        beneficiary: item.beneficiary,
      });
    });

    // E. Parse stock_transactions (Inward & Outward)
    const stockTxObj = raw?.stock_transactions || {};
    Object.entries(stockTxObj).forEach(([id, item]: [string, any]) => {
      if (!item || seenTxIds.has(id) || seenTxIds.has(`stock_${id}`)) return;
      seenTxIds.add(id);
      seenTxIds.add(`stock_${id}`);

      transactions.push({
        id: `stock_${id}`,
        balance: item.balance ?? 50,
        change: item.transactionType === 'INWARD' ? Number(item.quantity || 50) : -Number(item.quantity || 10),
        lastAction: item.transactionType === 'INWARD' ? '+ Stock Received (Inward)' : '- Daily Distribution (Usage)',
        timestamp: Number(item.timestamp || Date.now()),
        village: item.centerName ? `${item.centerName}` : '04 – Vadtal (Anand)',
        workerName: item.workerName || 'Anita Sharma',
        note: item.challanNo ? `Challan: ${item.challanNo}` : undefined,
        commodity: item.commodity,
        challanNo: item.challanNo,
        expiryDate: item.expiryDate,
      });
    });

    // Sort descending by timestamp
    transactions.sort((a, b) => b.timestamp - a.timestamp);

    const currentBalanceCount = Number(
      inventory.bal_shakti ?? 0
    );

    return {
      inventory,
      mealEntries,
      attendance,
      transactions,
      currentBalanceCount,
      lastUpdated: new Date().toLocaleTimeString('en-US', { hour12: true }),
    };
  }

  // Subscribe to live updates + rapid sub-second polling with concurrency protection
  subscribe(centreEndpoint: string, onUpdate: (data: DashboardData) => void, onError?: (err: any) => void): () => void {
    let isSubscribed = true;

    const runSync = async () => {
      if (!isSubscribed || this.isFetching) return;
      this.isFetching = true;
      try {
        const fresh = await this.fetchAllData(centreEndpoint);
        if (isSubscribed) {
          onUpdate(fresh);
        }
      } catch (err) {
        if (onError && isSubscribed) onError(err);
      } finally {
        this.isFetching = false;
      }
    };

    // 1. Initial immediate load
    runSync();

    // 2. EventSource subscription on active centre node (direct to RTDB)
    try {
      const cleanKey = centreEndpoint.replace('/', '') || 'awc_awvad04';
      const sseUrl = `${RTDB_BASE_URL}/${cleanKey}.json`;
      this.eventSource = new EventSource(sseUrl);

      const handleRemoteUpdate = () => {
        if (isSubscribed) runSync();
      };

      this.eventSource.addEventListener('put', handleRemoteUpdate);
      this.eventSource.addEventListener('patch', handleRemoteUpdate);
      this.eventSource.addEventListener('message', handleRemoteUpdate);
      this.eventSource.onerror = () => {
        // Continue seamlessly via active background polling
      };
    } catch {
      // EventSource not supported in some iframes, polling seamlessly takes over
    }

    // 3. 1200ms anti-cached background polling
    this.pollInterval = setInterval(() => {
      if (isSubscribed) runSync();
    }, 1200);

    // 4. Instant trigger on tab focus or visibility change
    const handleFocus = () => {
      if (isSubscribed) runSync();
    };

    const handleVisibility = () => {
      if (document.visibilityState === 'visible' && isSubscribed) {
        runSync();
      }
    };

    window.addEventListener('focus', handleFocus);
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      isSubscribed = false;
      if (this.eventSource) {
        try { this.eventSource.close(); } catch { /* ignore */ }
        this.eventSource = null;
      }
      if (this.pollInterval) {
        clearInterval(this.pollInterval);
        this.pollInterval = null;
      }
      window.removeEventListener('focus', handleFocus);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }

  // Feature: Present Action toggle (sync to Firebase RTDB in real time)
  async toggleStudentAttendance(
    studentId: number,
    currentAttendance: AttendancePayload,
    centreEndpoint = '/awc_awvad04'
  ): Promise<AttendancePayload> {
    const updatedRecords = currentAttendance.records.map((student) => {
      if (student.id === studentId) {
        return { ...student, present: !student.present };
      }
      return student;
    });

    const presentCount = updatedRecords.filter((s) => s.present).length;
    const absentCount = updatedRecords.length - presentCount;

    const payload: AttendancePayload = {
      date: new Date().toLocaleDateString('en-GB'),
      present_count: presentCount,
      absent_count: absentCount,
      records: updatedRecords,
    };

    const key = centreEndpoint.replace('/', '') || 'awc_awvad04';
    await this.fetchRtdb(`/${key}/attendance.json`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    return payload;
  }

  // Mark all students present or absent
  async setAllAttendance(
    presentStatus: boolean,
    currentAttendance: AttendancePayload,
    centreEndpoint = '/awc_awvad04'
  ): Promise<AttendancePayload> {
    const updatedRecords = currentAttendance.records.map((student) => ({
      ...student,
      present: presentStatus,
    }));

    const presentCount = updatedRecords.filter((s) => s.present).length;
    const absentCount = updatedRecords.length - presentCount;

    const payload: AttendancePayload = {
      date: new Date().toLocaleDateString('en-GB'),
      present_count: presentCount,
      absent_count: absentCount,
      records: updatedRecords,
    };

    const key = centreEndpoint.replace('/', '') || 'awc_awvad04';
    await this.fetchRtdb(`/${key}/attendance.json`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    return payload;
  }

  // Record a new inward stock challan
  async recordInwardStock(data: {
    challanNo: string;
    commodity: string;
    quantity: number;
    supplier?: string;
    centreEndpoint: string;
    centreName: string;
    workerName: string;
    expiryDate?: string;
  }): Promise<void> {
    const timestamp = Date.now();
    const dateFormatted = new Date().toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });

    const key = data.centreEndpoint.replace('/', '') || 'awc_awvad04';
    let field = 'bal_shakti';
    let commodityUnit = 'Pack';
    let stockFieldAlias = 'balbhog';

    const lowerComm = data.commodity.toLowerCase();
    if (lowerComm.includes('rice')) {
      field = 'rice';
      commodityUnit = 'kg';
      stockFieldAlias = 'rice';
    } else if (lowerComm.includes('dal') || lowerComm.includes('toor') || lowerComm.includes('tuvar')) {
      field = 'dal';
      commodityUnit = 'kg';
      stockFieldAlias = 'dal';
    } else if (lowerComm.includes('oil')) {
      field = 'oil';
      commodityUnit = 'litre';
      stockFieldAlias = 'oil';
    } else if (lowerComm.includes('matru')) {
      field = 'matru_shakti';
      commodityUnit = 'Pack';
      stockFieldAlias = 'matrumrut';
    } else if (lowerComm.includes('purna')) {
      field = 'purna_shakti';
      commodityUnit = 'Pack';
      stockFieldAlias = 'purna_shakti';
    } else if (lowerComm.includes('atta') || lowerComm.includes('wheat') || lowerComm.includes('flour')) {
      field = 'atta';
      commodityUnit = 'kg';
      stockFieldAlias = 'wheat';
    }

    // 1. Fetch current stock and inventory for this centre to calculate the new balance
    let currentQty = 0;
    try {
      const snapRes = await this.fetchRtdb(`/${key}.json`);
      if (snapRes.ok) {
        const snap = await snapRes.json();
        const parsed = this.parseSnapshot({ [key]: snap }, data.centreEndpoint);
        currentQty = Number((parsed.inventory as any)?.[field] ?? 0);
      }
    } catch {
      // ignore
    }

    const newQty = Math.max(0, currentQty + Number(data.quantity));

    // 2. Prepare inward object matching mobile worker schema
    const inwardRecord = {
      challanNo: data.challanNo,
      date: dateFormatted,
      id: `INW-${timestamp}`,
      items: [
        {
          batchNo: `${field.toUpperCase()}-VAD-${new Date().getFullYear().toString().slice(-2)}-${Math.floor(10 + Math.random() * 90)}`,
          expiryDate: data.expiryDate || '12-2027',
          itemId: field,
          itemName: data.commodity,
          quantity: Number(data.quantity),
          unit: commodityUnit,
        },
      ],
      recordedAt: new Date().toISOString(),
      supplier: data.supplier || 'District Food & Civil Supplies Godown, Anand',
    };

    // 3. Post to stock_transactions
    const stockTx = {
      actionGujarati: 'સ્ટોક આવક',
      centerId: key,
      centerName: data.centreName,
      challanNo: data.challanNo,
      commodity: data.commodity,
      dateFormatted,
      expiryDate: data.expiryDate || '12-2027',
      quantity: Number(data.quantity),
      timestamp,
      transactionType: 'INWARD',
      workerName: data.workerName,
    };

    // 4. Post to transaction_history
    const historyTx = {
      balance: newQty,
      change: Number(data.quantity),
      lastAction: '+ Stock Received (Inward)',
      note: `Challan: ${data.challanNo}`,
      timestamp,
      village: data.centreName,
      workerName: data.workerName,
      commodity: data.commodity,
      challanNo: data.challanNo,
    };

    // 5. Commit atomic/parallel updates to RTDB
    await Promise.allSettled([
      // A. Write inward log for worker app
      this.fetchRtdb(`/${key}/stock_inward.json`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(inwardRecord),
      }),
      // B. Update inventory node
      this.fetchRtdb(`/${key}/inventory/${field}.json`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newQty),
      }),
      this.fetchRtdb(`/${key}/inventory/lastUpdated.json`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(new Date().toISOString()),
      }),
      // C. Update stock node (both direct field and alias)
      this.fetchRtdb(`/${key}/stock/${field}.json`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newQty),
      }),
      stockFieldAlias !== field
        ? this.fetchRtdb(`/${key}/stock/${stockFieldAlias}.json`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newQty),
          })
        : Promise.resolve(),
      // D. Global transaction feeds
      this.fetchRtdb('/stock_transactions.json', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(stockTx),
      }),
      this.fetchRtdb('/transaction_history.json', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(historyTx),
      }),
      this.fetchRtdb('/current_balance.json', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          last_challan: data.challanNo,
          last_inward: Number(data.quantity),
          last_item: data.commodity,
          last_updated: timestamp,
        }),
      }),
    ]);
  }

  // Record a meal entry (breakfast or lunch)
  async recordMealEntry(entry: {
    mealType: 'breakfast' | 'lunch';
    menuName: string;
    studentsPresent: number;
    totalGrams: number;
    centreEndpoint: string;
    confirmedBy: string;
  }): Promise<void> {
    const timestamp = new Date().toISOString();
    const payload = {
      mealType: entry.mealType,
      menuName: entry.menuName,
      studentsPresent: entry.studentsPresent,
      totalGrams: entry.totalGrams,
      confirmedBy: entry.confirmedBy,
      recordedAt: timestamp,
      timestamp,
    };

    const key = entry.centreEndpoint.replace('/', '') || 'awc_awvad04';
    await this.fetchRtdb(`/${key}/meal_entries.json`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  }

  // Record a beneficiary commodity distribution
  async recordBeneficiaryDistribution(data: {
    beneficiary: string;
    category: string;
    items: Record<string, number>;
    centreEndpoint: string;
    centreName: string;
    workerName: string;
    photoAttached?: boolean;
  }): Promise<void> {
    const timestamp = Date.now();
    const dateFormatted = new Date().toLocaleDateString('en-GB');
    const key = data.centreEndpoint.replace('/', '') || 'awc_awvad04';

    let totalQty = 0;
    const itemSummaries: string[] = [];

    // Fetch current inventory to calculate deduction
    let currentInv: any = {};
    try {
      const snapRes = await this.fetchRtdb(`/${key}.json`);
      if (snapRes.ok) {
        const snap = await snapRes.json();
        currentInv = snap?.inventory || snap?.stock || {};
      }
    } catch {
      // ignore
    }

    const inventoryUpdates: Record<string, any> = {};
    const stockUpdates: Record<string, any> = {};

    for (const [commKey, qtyNum] of Object.entries(data.items)) {
      const q = Number(qtyNum);
      if (q > 0) {
        totalQty += q;
        itemSummaries.push(`${commKey}: ${q}`);

        const currentVal = Number(currentInv[commKey] ?? 0);
        const remainingVal = Math.max(0, currentVal - q);
        inventoryUpdates[commKey] = remainingVal;
        stockUpdates[commKey] = remainingVal;
      }
    }

    // 1. Prepare distribution record for /${key}/distributions
    const distRecord = {
      beneficiary: data.beneficiary,
      category: data.category,
      items: data.items,
      date: dateFormatted,
      timestamp,
      recordedAt: new Date().toISOString(),
      photoAttached: Boolean(data.photoAttached),
      totalPacketsDeducted: totalQty,
      workerName: data.workerName,
    };

    // 2. Global transaction history
    const historyTx = {
      balance: Math.max(0, (currentInv?.bal_shakti ?? 20) - totalQty),
      change: -totalQty,
      lastAction: `વિતરણ: ${data.beneficiary} (${data.category})`,
      beneficiary: data.beneficiary,
      beneficiaryCategory: data.category,
      itemsDistributed: data.items,
      itemsSummary: itemSummaries.join(' • '),
      timestamp,
      village: data.centreName,
      workerName: data.workerName,
      photoAttached: Boolean(data.photoAttached),
    };

    // 3. Global stock transactions
    const stockTx = {
      actionGujarati: `લાભાર્થી વિતરણ: ${data.beneficiary}`,
      centerId: key,
      centerName: data.centreName,
      commodity: itemSummaries.join(', '),
      dateFormatted,
      quantity: totalQty,
      timestamp,
      transactionType: 'DISTRIBUTION',
      workerName: data.workerName,
    };

    await Promise.allSettled([
      this.fetchRtdb(`/${key}/distributions.json`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(distRecord),
      }),
      this.fetchRtdb(`/${key}/inventory.json`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...inventoryUpdates,
          lastUpdated: new Date().toISOString(),
        }),
      }),
      this.fetchRtdb(`/${key}/stock.json`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...stockUpdates,
          lastUpdated: new Date().toISOString(),
        }),
      }),
      this.fetchRtdb('/transaction_history.json', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(historyTx),
      }),
      this.fetchRtdb('/stock_transactions.json', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(stockTx),
      }),
    ]);
  }
}

export const firebaseRtdb = FirebaseRtdbService.getInstance();
