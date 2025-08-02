
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Login } from '@/components/Login';
import { Header } from '@/components/Layout/Header';
import { Sidebar } from '@/components/Layout/Sidebar';
import { Footer } from '@/components/Layout/Footer';
import { DashboardOverview } from '@/components/Dashboard/DashboardOverview';
import { EmployeesTab } from '@/components/Employees/EmployeesTab';
import { WagesTab } from '@/components/Wages/WagesTab';
import { VacationsTab } from '@/components/Vacations/VacationsTab';
import { AttendanceTab } from '@/components/Attendance/AttendanceTab';
import { ReportsTab } from '@/components/Reports/ReportsTab';
import { SettingsTab } from '@/components/Settings/SettingsTab';

const Index = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');

  if (!user) {
    return <Login />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardOverview />;
      case 'employees':
        return <EmployeesTab />;
      case 'wages':
        return <WagesTab />;
      case 'vacations':
        return <VacationsTab />;
      case 'attendance':
        return <AttendanceTab />;
      case 'reports':
        return <ReportsTab />;
      case 'settings':
        return <SettingsTab />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
        <main className="flex-1 p-6">
          {renderContent()}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Index;
