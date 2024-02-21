import logo from './logo.svg';
import './App.css';
import OrdersPage from './Components/OrdersPage/OrdersPage';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import AppLayout from './Components/Layouts/AppLayout';

function App() {
  return (
    <div className="App">
      <Router>
        {<AppLayout>
          <Routes>
            <Route path="*" element={<OrdersPage />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/storage" element={<OrdersPage />} />
          </Routes>
        </AppLayout>
        }
      </Router>
    </div>
  );
}

export default App;
