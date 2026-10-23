/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { Sidebar, TabKey } from './components/Sidebar';
import { ExecutiveOverviewTab } from './components/ExecutiveOverviewTab';
import { LiveStockTab } from './components/LiveStockTab';
import { MealGeotagTab } from './components/MealGeotagTab';
import { DbtReimbursementTab } from './components/DbtReimbursementTab';
import { SetuShareTab } from './components/SetuShareTab';
import { BeneficiaryDistributionTab } from './components/BeneficiaryDistributionTab';
import { MprReportTab } from './components/MprReportTab';
import { CentreSelectModal } from './components/CentreSelectModal';
import { InwardStockModal } from './components/InwardStockModal';
import { DistributeBeneficiaryModal } from './components/DistributeBeneficiaryModal';
import { MealDetailModal } from './components/MealDetailModal';
import { LoginPage } from './components/LoginPage';
import {
  CENTRES,
  DashboardData,
  DEFAULT_STUDENTS,
  firebaseRtdb,
} from './services/firebaseRtdb';
import { AnganwadiCentre } from './types/poshan';
import { generatePoshanPdfReport } from './utils/pdfGenerator';
import { CheckCircle2, AlertTriangle, Info } from 'lucide-react';

interface SuperiorUser {
  username: string;
  name: string;
  designation: string;
}

export default function App() {
  const [currentUser, setCurrentUser] = useState<SuperiorUser | null>(() => {
    try {
      const saved = localStorage.getItem('poshan_superior_auth');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return {
      username: 'superior',
      name: 'Smt. Shardaben Shah',
      designation: 'Supervisor · Sector 04',
    };
  });

  const [activeTab, setActiveTab] = useState<TabKey>('overview');
  const [language, setLanguage] = useState<'gu' | 'en'>('en');
  const [currentCentre, setCurrentCentre] = useState<AnganwadiCentre>(CENTRES[0]);
  const [isRtdbLive, setIsRtdbLive] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isSelectModalOpen, setIsSelectModalOpen] = useState(false);
  const [isInwardModalOpen, setIsInwardModalOpen] = useState(false);
  const [isDistributeModalOpen, setIsDistributeModalOpen] = useState(false);
  const [inspectedMeal, setInspectedMeal] = useState<any | null>(null);
  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'success' | 'info' | 'warn' } | null>(null);

  const [dashboardData, setDashboardData] = useState<DashboardData>({
    inventory: {
      atta: 5,
      bal_shakti: 50,
      dal: 3.7,
      matru_shakti: 5,
      oil: 5,
      purna_shakti: 5,
      rice: 14.86,
      lastUpdated: new Date().toISOString(),
    },
    mealEntries: [
      {
        id: 'init-meal-1',
        mealType: 'lunch',
        menuName: 'Paushtik Vegetable Khichdi & Tuver Dal',
        studentsPresent: 39,
        timestamp: Date.now() - 3600000 * 2,
        totalGrams: 3200,
        confirmedBy: 'Smt. BhavnaBen Patel',
      },
      {
        id: 'init-meal-2',
        mealType: 'breakfast',
        menuName: 'Wheat Halwa / Fortified Sheera with Dry Fruits',
        studentsPresent: 38,
        timestamp: Date.now() - 3600000 * 5,
        totalGrams: 2700,
        confirmedBy: 'Smt. BhavnaBen Patel',
      },
    ],
    attendance: {
      date: new Date().toLocaleDateString('en-GB'),
      present_count: 41,
      absent_count: 7,
      records: DEFAULT_STUDENTS,
    },
    transactions: [],
    currentBalanceCount: 50,
    lastUpdated: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }),
  });

  const showToast = useCallback((text: string, type: 'success' | 'info' | 'warn' = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => {
      setToastMessage((prev) => (prev?.text === text ? null : prev));
    }, 4000);
  }, []);

  // Subscribe to real-time updates from Firebase RTDB
  useEffect(() => {
    setIsRtdbLive(true);
    const unsubscribe = firebaseRtdb.subscribe(
      currentCentre.endpoint,
      (freshData) => {
        setDashboardData((prev) => {
          // If fresh meal arrived or transaction count increased, notify user
          if (freshData.mealEntries.length > prev.mealEntries.length && prev.mealEntries.length > 0) {
            showToast('New midday meal entry verified from Worker app!', 'success');
          } else if (freshData.transactions.length > prev.transactions.length && prev.transactions.length > 0) {
            showToast('New transaction received from Worker mobile app!', 'info');
          }
          return freshData;
        });
        setIsRtdbLive(true);
      },
      (err) => {
        console.warn('Realtime sync warning:', err);
        setIsRtdbLive(false);
      }
    );

    return () => {
      unsubscribe();
    };
  }, [currentCentre, showToast]);

  // Force manual refresh
  const handleManualRefresh = async () => {
    try {
      setIsRefreshing(true);
      const fresh = await firebaseRtdb.fetchAllData(currentCentre.endpoint);
      setDashboardData(fresh);
      setIsRtdbLive(true);
      showToast(language === 'gu' ? 'ડેટા સફળતાપૂર્વક અપડેટ થયો!' : 'Dashboard synced with Firebase RTDB!', 'success');
    } catch {
      showToast('Could not refresh from cloud', 'warn');
    } finally {
      setIsRefreshing(false);
    }
  };

  // Inward stock submission
  const handleSubmitInward = async (data: {
    challanNo: string;
    commodity: string;
    quantity: number;
    supplier: string;
    expiryDate: string;
  }) => {
    try {
      await firebaseRtdb.recordInwardStock({
        challanNo: data.challanNo,
        commodity: data.commodity,
        quantity: data.quantity,
        supplier: data.supplier,
        centreEndpoint: currentCentre.endpoint,
        centreName: currentCentre.nameEn,
        workerName: currentCentre.workerName,
        expiryDate: data.expiryDate,
      });

      // Refresh
      const fresh = await firebaseRtdb.fetchAllData(currentCentre.endpoint);
      setDashboardData(fresh);

      showToast(
        language === 'gu'
          ? `ચલાન ${data.challanNo} સાથે +${data.quantity} સ્ટોક આવક નોંધાઈ`
          : `Stock inward of +${data.quantity} recorded for ${data.commodity}!`,
        'success'
      );
    } catch (err) {
      console.error(err);
      showToast('Failed to save inward stock to RTDB', 'warn');
    }
  };

  // Beneficiary distribution submission (addresses user requirement)
  const handleSubmitDistribution = async (data: {
    beneficiary: string;
    category: string;
    items: Record<string, number>;
  }) => {
    try {
      await firebaseRtdb.recordBeneficiaryDistribution({
        beneficiary: data.beneficiary,
        category: data.category,
        items: data.items,
        centreEndpoint: currentCentre.endpoint,
        centreName: currentCentre.nameEn,
        workerName: currentCentre.workerName,
        photoAttached: true,
      });

      // Refresh
      const fresh = await firebaseRtdb.fetchAllData(currentCentre.endpoint);
      setDashboardData(fresh);

      showToast(
        language === 'gu'
          ? `${data.beneficiary} ને સામગ્રીનું વિતરણ સફળતાપૂર્વક નોંધાયું!`
          : `Distributed commodities to ${data.beneficiary} successfully recorded!`,
        'success'
      );
    } catch (err) {
      console.error(err);
      showToast('Failed to record distribution to cloud', 'warn');
    }
  };

  // Meal entry submission
  const handleAddMeal = async (meal: {
    mealType: 'breakfast' | 'lunch';
    menuName: string;
    studentsPresent: number;
    totalGrams: number;
  }) => {
    try {
      await firebaseRtdb.recordMealEntry({
        mealType: meal.mealType,
        menuName: meal.menuName,
        studentsPresent: meal.studentsPresent,
        totalGrams: meal.totalGrams,
        centreEndpoint: currentCentre.endpoint,
        confirmedBy: `${currentCentre.workerName} (Supervisor Verified)`,
      });

      // Refresh
      const fresh = await firebaseRtdb.fetchAllData(currentCentre.endpoint);
      setDashboardData(fresh);

      showToast(
        language === 'gu'
          ? `${meal.menuName} ભોજન એન્ટ્રી રેકોર્ડ થઈ`
          : `Recorded ${meal.menuName} in meal verification ledger!`,
        'success'
      );
    } catch (err) {
      console.error(err);
      showToast('Failed to record meal entry to RTDB', 'warn');
    }
  };

  // PDF report download
  const handleDownloadPdf = () => {
    const istTimeStr = new Intl.DateTimeFormat('en-US', {
      timeZone: 'Asia/Kolkata',
      dateStyle: 'medium',
      timeStyle: 'medium',
    }).format(new Date());

    generatePoshanPdfReport({
      centre: currentCentre,
      inventory: dashboardData.inventory,
      attendance: dashboardData.attendance,
      mealEntries: dashboardData.mealEntries,
      transactions: dashboardData.transactions,
      istTimeString: istTimeStr,
    });

    showToast('Official PDF Inspection Dossier downloaded successfully!', 'success');
  };

  const handleLoginSuccess = (user: SuperiorUser) => {
    setCurrentUser(user);
    try {
      localStorage.setItem('poshan_superior_auth', JSON.stringify(user));
    } catch {
      // ignore
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    try {
      localStorage.removeItem('poshan_superior_auth');
    } catch {
      // ignore
    }
  };

  if (!currentUser) {
    return <LoginPage onLoginSuccess={handleLoginSuccess} language={language} />;
  }

  return (
    <div className="min-h-screen bg-[#F8FAF8] flex flex-col text-slate-800 antialiased selection:bg-[#F27A1A] selection:text-white font-sans">
      {/* 1. Header matching Screenshots */}
      <Header
        language={language}
        onToggleLanguage={() => setLanguage((l) => (l === 'en' ? 'gu' : 'en'))}
        isRtdbLive={isRtdbLive}
        onRefresh={handleManualRefresh}
        isRefreshing={isRefreshing}
        onDownloadPdf={handleDownloadPdf}
        currentUser={currentUser}
        onLogout={handleLogout}
        currentCentre={currentCentre}
        onOpenCentreModal={() => setIsSelectModalOpen(true)}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50">
          <div
            className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl shadow-xl text-xs font-bold border ${
              toastMessage.type === 'success'
                ? 'bg-[#0B6E4F] text-white border-[#74BF44]'
                : toastMessage.type === 'warn'
                ? 'bg-[#F27A1A] text-white border-orange-400'
                : 'bg-slate-900 text-slate-100 border-slate-700'
            }`}
          >
            {toastMessage.type === 'success' && <CheckCircle2 className="w-4 h-4 text-[#74BF44] shrink-0" />}
            {toastMessage.type === 'warn' && <AlertTriangle className="w-4 h-4 text-white shrink-0" />}
            {toastMessage.type === 'info' && <Info className="w-4 h-4 text-emerald-200 shrink-0" />}
            <span>{toastMessage.text}</span>
          </div>
        </div>
      )}

      {/* Main Workspace: Left Sidebar + Main Content Split Layout */}
      <div className="flex-1 flex flex-col lg:flex-row max-w-[1800px] w-full mx-auto">
        {/* Left Sidebar matching screenshots */}
        <Sidebar
          activeTab={activeTab}
          onSelectTab={(tab) => setActiveTab(tab)}
          stockAlertCount={9}
          mealCount={2}
          pendingDbtCount={1}
          language={language}
        />

        {/* Dynamic Main Workspace Content */}
        <main className="flex-1 p-4 sm:p-6 overflow-y-auto">
          {activeTab === 'overview' && (
            <ExecutiveOverviewTab
              currentCentre={currentCentre}
              dashboardData={dashboardData}
              onNavigateTab={(tabKey) => setActiveTab(tabKey as TabKey)}
              onSelectCentre={(c) => setCurrentCentre(c)}
              onInspectMeal={(meal) => setInspectedMeal(meal)}
              language={language}
            />
          )}

          {activeTab === 'stock' && (
            <LiveStockTab
              currentCentre={currentCentre}
              inventory={dashboardData.inventory}
              onOpenInwardModal={() => setIsInwardModalOpen(true)}
              language={language}
            />
          )}

          {activeTab === 'meal' && (
            <MealGeotagTab
              currentCentre={currentCentre}
              mealEntries={dashboardData.mealEntries}
              onAddMeal={handleAddMeal}
              onInspectMeal={(meal) => setInspectedMeal(meal)}
              language={language}
            />
          )}

          {activeTab === 'dbt' && (
            <DbtReimbursementTab
              currentCentre={currentCentre}
              language={language}
            />
          )}

          {activeTab === 'transfers' && (
            <SetuShareTab
              currentCentre={currentCentre}
              language={language}
            />
          )}

          {activeTab === 'distribution' && (
            <BeneficiaryDistributionTab
              currentCentre={currentCentre}
              transactions={dashboardData.transactions}
              onOpenDistributeModal={() => setIsDistributeModalOpen(true)}
              language={language}
            />
          )}

          {activeTab === 'mpr' && (
            <MprReportTab
              currentCentre={currentCentre}
              dashboardData={dashboardData}
              onDownloadPdf={handleDownloadPdf}
              language={language}
            />
          )}
        </main>
      </div>

      {/* Modals */}
      <CentreSelectModal
        isOpen={isSelectModalOpen}
        onClose={() => setIsSelectModalOpen(false)}
        currentCentre={currentCentre}
        onSelectCentre={(c) => setCurrentCentre(c)}
        language={language}
      />

      <InwardStockModal
        isOpen={isInwardModalOpen}
        onClose={() => setIsInwardModalOpen(false)}
        centre={currentCentre}
        onSubmitInward={handleSubmitInward}
        language={language}
      />

      <DistributeBeneficiaryModal
        isOpen={isDistributeModalOpen}
        onClose={() => setIsDistributeModalOpen(false)}
        centre={currentCentre}
        onSubmitDistribution={handleSubmitDistribution}
        language={language}
      />

      <MealDetailModal
        isOpen={Boolean(inspectedMeal)}
        onClose={() => setInspectedMeal(null)}
        meal={inspectedMeal}
        language={language}
      />
    </div>
  );
}
