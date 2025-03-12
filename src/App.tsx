import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../src/pages/auth/Login";
import Register from "../src/pages/auth/Register";
import PaymentSuccess from "../src/pages/payments/PaymentSuccess";
import EventRegistrationPage from "./pages/events/EventRegistation";
import EventCartPage from "./pages/events/EventCartPage";
import LandingPage from "./pages/LandingPage";
import EventsPage from "./pages/events/EventsPage";
import ForgotPassword from "./pages/auth/Forgetpassword";


const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/payment/registered" element={<PaymentSuccess />} />
        <Route path="/event-reg" element={<EventRegistrationPage />} />
        <Route path="/cart" element={<EventCartPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
      </Routes>
    </Router>
  );
};

export default App;
