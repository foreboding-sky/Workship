import logo from './logo.svg';
import './App.css';
import OrdersPage from './Components/OrdersPage/OrdersPage';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        {
          <Routes>
            <Route path="*" element={<OrdersPage />} />
          </Routes>
        }
      </Router>
    </div>
  );
}

export default App;
