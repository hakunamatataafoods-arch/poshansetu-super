import jsPDF from 'jspdf';
import { AnganwadiCentre, AttendancePayload, InventoryStock, MealEntry, TransactionHistoryItem } from '../types/poshan';

export function generatePoshanPdfReport(params: {
  centre: AnganwadiCentre;
  inventory: InventoryStock;
  attendance: AttendancePayload;
  mealEntries: MealEntry[];
  transactions: TransactionHistoryItem[];
  istTimeString: string;
}) {
  const { centre, inventory, attendance, mealEntries, transactions, istTimeString } = params;
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  let y = 14;

  // Header Bar
  doc.setFillColor(15, 23, 42); // slate-900
  doc.rect(0, 0, pageWidth, 28, 'F');

  // Title
  doc.setTextColor(245, 158, 11); // Amber 500
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('GOVERNMENT OF GUJARAT • WCDD (ICDS ANAND)', 14, 9);

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(14);
  doc.text('PoshanSetu — Anganwadi Monitoring & Stock Audit Report', 14, 16);

  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(203, 213, 225); // Slate 300
  doc.text(`Official Inspection Dossier • Child Development Project Officer (CDPO) & Collectorate Office`, 14, 22);
  doc.text(`Generated: ${istTimeString}`, pageWidth - 14, 22, { align: 'right' });

  y = 35;

  // Centre Meta Box
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(14, y, pageWidth - 28, 24, 2, 2, 'FD');

  doc.setTextColor(15, 23, 42);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text(`Centre: ${centre.nameEn} (${centre.code})`, 18, y + 7);

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(71, 85, 105);
  doc.text(`District: Anand   |   Taluka: ${centre.taluka}   |   Sector: ${centre.sector}`, 18, y + 14);
  doc.text(`Supervisor: ${centre.supervisorName}   |   Anganwadi Worker (AWW): ${centre.workerName}`, 18, y + 20);

  y += 32;

  // Section 1: Pantry Inventory (Stock Ledger)
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text('1. Pantry Inventory (Stock Ledger Balance)', 14, y);

  y += 4;
  doc.setFillColor(241, 245, 249);
  doc.rect(14, y, pageWidth - 28, 7, 'F');
  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(51, 65, 85);
  doc.text('COMMODITY / RATION', 18, y + 5);
  doc.text('TYPE / PACKAGING', 80, y + 5);
  doc.text('CURRENT BALANCE', 130, y + 5);
  doc.text('STATUS', 170, y + 5);

  const inventoryItems = [
    { name: 'Bal Shakti (Balbhog)', type: '500g Packet (THR)', val: `${inventory.bal_shakti} Pkts`, isLow: inventory.bal_shakti < 15 },
    { name: 'Matru Shakti', type: '1kg Packet (THR)', val: `${inventory.matru_shakti} Pkts`, isLow: inventory.matru_shakti < 10 },
    { name: 'Purna Shakti', type: '1kg Packet (THR)', val: `${inventory.purna_shakti} Pkts`, isLow: inventory.purna_shakti < 10 },
    { name: 'Atta (Wheat Flour)', type: 'Raw Staple (Bulk)', val: `${inventory.atta} kg`, isLow: inventory.atta < 10 },
    { name: 'Rice (Grain)', type: 'Raw Staple (Bulk)', val: `${inventory.rice} kg`, isLow: inventory.rice < 10 },
    { name: 'Tuvar Dal', type: 'Pulses (Bulk)', val: `${inventory.dal} kg`, isLow: inventory.dal < 5 },
    { name: 'Edible Oil (Fortified)', type: 'Cooking Oil (Bulk)', val: `${inventory.oil} L`, isLow: inventory.oil < 5 },
  ];

  y += 7;
  inventoryItems.forEach((item) => {
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(30, 41, 59);
    doc.text(item.name, 18, y + 4.5);
    doc.text(item.type, 80, y + 4.5);
    
    doc.setFont('helvetica', 'bold');
    doc.text(item.val, 130, y + 4.5);

    if (item.isLow) {
      doc.setTextColor(220, 38, 38);
      doc.text('CRITICAL LOW', 170, y + 4.5);
    } else {
      doc.setTextColor(22, 163, 74);
      doc.text('ADEQUATE', 170, y + 4.5);
    }

    doc.setDrawColor(241, 245, 249);
    doc.line(14, y + 6.5, pageWidth - 14, y + 6.5);
    y += 6.5;
  });

  y += 6;

  // Section 2: Student Attendance Register
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text(`2. Today's Student Attendance (${attendance.present_count} Present / ${attendance.absent_count} Absent)`, 14, y);

  y += 4;
  doc.setFillColor(241, 245, 249);
  doc.rect(14, y, pageWidth - 28, 7, 'F');
  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(51, 65, 85);
  doc.text('ROLL #', 18, y + 5);
  doc.text('STUDENT NAME', 40, y + 5);
  doc.text('AGE', 110, y + 5);
  doc.text('ATTENDANCE STATUS', 150, y + 5);

  y += 7;
  attendance.records.forEach((s) => {
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(30, 41, 59);
    doc.text(String(s.id).padStart(2, '0'), 18, y + 4);
    doc.text(`${s.nameEn} (${s.nameGu})`, 40, y + 4);
    doc.text(s.age, 110, y + 4);

    doc.setFont('helvetica', 'bold');
    if (s.present) {
      doc.setTextColor(22, 163, 74);
      doc.text('PRESENT (હાજર)', 150, y + 4);
    } else {
      doc.setTextColor(220, 38, 38);
      doc.text('ABSENT (ગેરહાજર)', 150, y + 4);
    }

    doc.setDrawColor(241, 245, 249);
    doc.line(14, y + 5.5, pageWidth - 14, y + 5.5);
    y += 5.5;
  });

  y += 6;

  // Section 3: Meal Intelligence
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text('3. Meal Intelligence (Daily Meal Consumption Norms)', 14, y);

  y += 4;
  doc.setFillColor(241, 245, 249);
  doc.rect(14, y, pageWidth - 28, 7, 'F');
  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(51, 65, 85);
  doc.text('TIME', 18, y + 5);
  doc.text('MEAL TYPE', 50, y + 5);
  doc.text('MENU SERVED', 90, y + 5);
  doc.text('STUDENTS', 140, y + 5);
  doc.text('TOTAL GRAMS', 165, y + 5);

  y += 7;
  const recentMeals = mealEntries.slice(0, 4);
  if (recentMeals.length === 0) {
    doc.setFont('helvetica', 'italic');
    doc.setTextColor(148, 163, 184);
    doc.text('No meal entries logged yet for today.', 18, y + 4.5);
    y += 7;
  } else {
    recentMeals.forEach((m) => {
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(30, 41, 59);
      const timeStr = new Date(m.recordedAt || m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      doc.text(timeStr, 18, y + 4.5);
      doc.text(m.mealType.toUpperCase(), 50, y + 4.5);
      doc.text(m.menuName, 90, y + 4.5);
      doc.text(`${m.studentsPresent} Children`, 140, y + 4.5);
      doc.setFont('helvetica', 'bold');
      doc.text(`${m.totalGrams} gm`, 165, y + 4.5);

      doc.setDrawColor(241, 245, 249);
      doc.line(14, y + 6, pageWidth - 14, y + 6);
      y += 6;
    });
  }

  // Footer & Signatures
  y = 265;
  doc.setDrawColor(203, 213, 225);
  doc.line(14, y, 75, y);
  doc.line(pageWidth - 75, y, pageWidth - 14, y);

  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(71, 85, 105);
  doc.text('Signature of Supervisor', 24, y + 5);
  doc.text('Signature of CDPO / Inspector', pageWidth - 65, y + 5);

  doc.setFont('helvetica', 'italic');
  doc.setFontSize(7);
  doc.setTextColor(148, 163, 184);
  doc.text('Certified system-generated report via PoshanSetu RTDB Sync • WCDD Government of Gujarat', pageWidth / 2, 285, { align: 'center' });

  // Save PDF
  doc.save(`PoshanSetu_${centre.code}_Report_${Date.now()}.pdf`);
}
