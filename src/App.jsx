import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import About from './pages/About';
import Contact from './pages/Contact';
import Pricing from './pages/Pricing';
import Services from './pages/Services';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';

import BookingModal from './components/BookingModal';
import { StudioDataProvider } from './context/StudioDataContext';

function AppContent() {
  const [isBookingOpen, setIsBookingOpen] = React.useState(false);
  const location = useLocation();

  // Do not show public Navbar or Footer on Admin or Login routes
  const isDashboardOrAuth =
    location.pathname.startsWith('/admin') ||
    location.pathname === '/login' ||
    location.pathname === '/dashboard';

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-charcoal selection:bg-coral selection:text-white">
      {!isDashboardOrAuth && <Navbar onOpenBooking={() => setIsBookingOpen(true)} />}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/services" element={<Services />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/portfolio" element={<Navigate to="/gallery" replace />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/dashboard" element={<Navigate to="/admin" replace />} />
          {/* Fallback route back to home */}
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      {!isDashboardOrAuth && <Footer />}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <StudioDataProvider>
      <Router>
        <ScrollToTop />
        <AppContent />
      </Router>
    </StudioDataProvider>
  );
}
