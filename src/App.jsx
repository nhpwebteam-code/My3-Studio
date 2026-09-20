import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import About from './pages/About';
import Contact from './pages/Contact';

import BookingModal from './components/BookingModal';

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = React.useState(false);

  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-white text-charcoal selection:bg-coral selection:text-white">
        <Navbar onOpenBooking={() => setIsBookingOpen(true)} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/portfolio" element={<Navigate to="/gallery" replace />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            {/* Fallback route back to home */}
            <Route path="*" element={<Home />} />
          </Routes>
        </main>
        <Footer />
        <BookingModal
          isOpen={isBookingOpen}
          onClose={() => setIsBookingOpen(false)}
        />
      </div>
    </Router>
  );
}
