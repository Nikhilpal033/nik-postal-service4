import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Dashboard from "./Dashboard";
import ParcelBooking from "./ParcelBooking";
import ParcelTracking from "./ParcelTracking";
import ContactForm from "./ContactForm";
import AdminParcelList from "./AdminParcelList";
import AdminMessages from "./AdminMessages";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/booking" element={<ParcelBooking />} />
        <Route path="/tracking" element={<ParcelTracking />} />
        <Route path="/contact" element={<ContactForm />} />
        <Route path="/admin" element={<AdminParcelList />} />
        <Route path="/admin/messages" element={<AdminMessages />} />
      </Routes>
    </Router>
  );
}

export default App;
