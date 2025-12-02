import './App.css';
import RegisterPage from './components/Register'
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Turfs from './pages/Find_a_Turf';
import Sports from './pages/Sports';
import Trainers from './pages/Trainers';
import NewsBlog from './pages/News';
import Tournaments from './pages/Tournaments';
import AdminDashboard from './pages/AdminDashboard';
import SingleTurfBooking from './pages/SingleTurfBooking';
import ContactUs from './pages/ContactUs';
import AnalyticsDashboard from './pages/SuperAdminDashboard';
import TurfManagement from './pages/TurfManagement';
import UserManagement from './pages/UserManagement';
import MyBookings from './pages/MyBookings';
import ManualSlotManagement from './pages/manualSlotManagement';
import AboutUs from './pages/AboutUs';
import TermsConditions from './pages/Terms&Conditions';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Refund from './pages/Refund';
import Disclaimer from './pages/DisclaimerPolicy';
import Copyrights from './pages/Copyrights';
import Cookie from './pages/Cookie';
import Faq from './pages/Faq';
import ProfilePage from './components/ProfilePage';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/aboutUs" element={<AboutUs />} />
        <Route path="/turfs" element={<Turfs />} />
        <Route path="/sports" element={<Sports />} />
        <Route path="/trainers" element={<Trainers />} />
        <Route path="/tournaments" element={<Tournaments />} />
        <Route path="/news" element={<NewsBlog />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/superAdmin" element={<AnalyticsDashboard />} />
        <Route path="/singleTurfBooking/:id" element={<SingleTurfBooking />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/turfManagement" element={<TurfManagement />} />
        <Route path="/userManagement" element={<UserManagement />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/manual-slots" element={<ManualSlotManagement />} />
        <Route path="/terms&conditions" element={<TermsConditions />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/refund" element={<Refund />} />
        <Route path="/disclaimer" element={<Disclaimer />} />
        <Route path="/copyrights" element={<Copyrights />} />
        <Route path="/cookie" element={<Cookie />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App