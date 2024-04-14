import logo from './logo.svg';
import './App.css';
import OrdersPage from './Components/Orders/OrdersPage';
import CreateOrder from './Components/Orders/CreateOrder';
import RepairsPage from './Components/Repairs/RepairsPage';
import CreateRepair from './Components/Repairs/CreateRepair';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import AppLayout from './Components/Layouts/AppLayout';
import ClientsPage from './Components/Clients/ClientsPage';
import StoragePage from './Components/Storage/StoragePage';

function App() {
  return (
    <div className="App">
      <Router>
        <AppLayout>
          <Routes>
            <Route path="/workshop" element={<RepairsPage />} />
            <Route path="/workshop/create" element={<CreateRepair />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/orders/create" element={<CreateOrder />} />
            <Route path="/clients" element={<ClientsPage />} />
            <Route path="/storage" element={<StoragePage />} />
            <Route path="*" element={<Navigate to="/workshop" />} />
          </Routes>
        </AppLayout>
      </Router>
    </div>
  );
}

export default App;
