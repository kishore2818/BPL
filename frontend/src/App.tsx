import { NavigationProvider, useNavigation } from './hooks/useNavigation';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { HospitalCharges } from './pages/HospitalCharges';
import { BedManagement } from './pages/BedManagement';
import { PrintTemplates } from './pages/PrintTemplates';
import { PaymentConfig } from './pages/PaymentConfig';
import { Appointments } from './pages/Appointments';

function AppContent() {
  const { currentPage } = useNavigation();

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'charges':
        return <HospitalCharges />;
      case 'beds':
        return <BedManagement />;
      case 'templates':
        return <PrintTemplates />;
      case 'payments':
        return <PaymentConfig />;
      case 'appointments':
        return <Appointments />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout>
      {renderPage()}
    </Layout>
  );
}

function App() {
  return (
    <NavigationProvider>
      <AppContent />
    </NavigationProvider>
  );
}

export default App;



