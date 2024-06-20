import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import AppLayout from './Components/Layouts/AppLayout';

import RepairsPage from './Components/Repairs/RepairsPage';
import CreateRepair from './Components/Repairs/CreateRepair';
import EditRepair from './Components/Repairs/EditRepair';

import OrdersPage from './Components/Orders/OrdersPage';
import ArchivePage from './Components/Orders/ArchivePage';

import StoragePage from './Components/Storage/StoragePage';
import CreateStorageItem from './Components/Storage/CreateStorageItem';
import EditStorageItem from './Components/Storage/EditStorageItem';

import ClientsPage from './Components/Clients/ClientsPage';
import CreateClient from './Components/Clients/CreateClient';
import EditClient from './Components/Clients/EditClient';

import SpecialistsPage from './Components/Specialists/SpecialistsPage';
import CreateSpecialist from './Components/Specialists/CreateSpecialist';
import EditSpecialist from './Components/Specialists/EditSpecialist';

import ServicesPage from './Components/Services/ServicesPage';
import CreateService from './Components/Services/CreateService';
import EditService from './Components/Services/EditService';


function App() {
  return (
    <div className="App">
      <Router>
        <AppLayout>
          <Routes>
            <Route path="/workshop" element={<RepairsPage />} />
            <Route path="/workshop/create" element={<CreateRepair />} />
            <Route path="/workshop/edit/:repairId" element={<EditRepair />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path='/archive' element={<ArchivePage />} />
            <Route path="/clients" element={<ClientsPage />} />
            <Route path='/clients/edit/:clientId' element={<EditClient />} />
            <Route path="/clients/create" element={<CreateClient />} />
            <Route path="/specialists" element={<SpecialistsPage />} />
            <Route path="/specialists/create" element={<CreateSpecialist />} />
            <Route path="/specialists/edit/:specialistId" element={<EditSpecialist />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/services/create" element={<CreateService />} />
            <Route path="/services/edit/:serviceId" element={<EditService />} />
            <Route path="/storage" element={<StoragePage />} />
            <Route path="/storage/create" element={<CreateStorageItem />} />
            <Route path='/storage/edit/:storageItemId' element={<EditStorageItem />} />
            <Route path="*" element={<Navigate to="/workshop" />} />
          </Routes>
        </AppLayout>
      </Router>
    </div>
  );
}

export default App;
