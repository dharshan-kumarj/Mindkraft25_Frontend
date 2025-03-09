import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../src/pages/auth/Login";
import Register from "../src/pages/auth/Register";
import PaymentSuccess from "../src/pages/payments/PaymentSuccess";


const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/paymentsuccess" element={<PaymentSuccess/>} />
      </Routes>
    </Router>
  );
};

export default App;
