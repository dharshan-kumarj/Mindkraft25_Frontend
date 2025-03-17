import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../src/pages/auth/Login";
import Register from "../src/pages/auth/Register";
import PaymentSuccess from "../src/pages/payments/PaymentSuccess";
import EventRegistrationPage from "./pages/events/EventRegistation";
import EventCartPage from "./pages/events/EventCartPage";
import LandingPage from "./pages/LandingPage";
import EventsPage from "./pages/events/EventsPage";
import ForgotPassword from "./pages/auth/Forgetpassword";
import Testd from "./pages/auth/Testd";
import MyEvents from "./pages/events/DisplayEvents";
import AdminPage from "./pages/admin/admin";


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
        <Route path="/test" element={<Testd />} />
        <Route path="/registered" element={<MyEvents />} />
        <Route path="/adminpanel" element={<AdminPage />} />
      </Routes>
    </Router>
  );
};

export default App;
