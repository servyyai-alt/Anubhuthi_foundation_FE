import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext.jsx';
import ProtectedRoute from './components/ProtectedRoute';
import ErrorBoundary from './components/ErrorBoundary';
import { ScrollToTop } from './components/ScrollUtils';

// Layout
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Public Pages
import HomePage from './pages/HomePage';
import ProgramsPage from './pages/ProgramsPage';
import ProgramDetailPage from './pages/ProgramDetailPage';
import RetreatsPage from './pages/RetreatsPage';
import ContactPage from './pages/ContactPage';
import DonatePage from './pages/DonatePage';
import CareersPage from './pages/CareersPage';
import VolunteerPage from './pages/VolunteerPage';
import EventsPage from './pages/EventsPage';
import TestimonialsPage from './pages/TestimonialsPage';
import MediaPage from './pages/MediaPage';
import { AboutPage, PhilosophyPage, DNIAcademyPage, TempleRestorationPage, LegalPage } from './pages/StaticPages';

// Admin
import AdminLogin from './pages/admin/AdminLogin';
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import {
  AdminPrograms, AdminEvents, AdminRetreats, AdminCareers,
  AdminVolunteers, AdminDonations, AdminTestimonials, AdminContacts, AdminMedia
} from './pages/admin/AdminSections';

// Public layout wrapper
function PublicLayout({ children }) {
  const location = useLocation();
  const isHome = location.pathname === '/';
  
  return (
    <div className={`flex flex-col min-h-screen ${isHome ? 'theme-earth' : ''}`}>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <BrowserRouter>
          <ScrollToTop />
          <ErrorBoundary>
          <Toaster
            position="top-right"
            toastOptions={{
              style: { background: '#fff', color: '#2d1f0f', borderRadius: '12px', boxShadow: '0 4px 20px rgba(139,94,60,0.15)' },
              success: { iconTheme: { primary: '#e8821a', secondary: '#fff' } },
            }}
          />
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<PublicLayout><HomePage /></PublicLayout>} />
            <Route path="/about" element={<PublicLayout><AboutPage /></PublicLayout>} />
            <Route path="/philosophy" element={<PublicLayout><PhilosophyPage /></PublicLayout>} />
            <Route path="/dni-academy" element={<PublicLayout><DNIAcademyPage /></PublicLayout>} />
            <Route path="/programs" element={<PublicLayout><ProgramsPage /></PublicLayout>} />
            <Route path="/programs/:id" element={<PublicLayout><ProgramDetailPage /></PublicLayout>} />
            <Route path="/retreats" element={<PublicLayout><RetreatsPage /></PublicLayout>} />
            <Route path="/temple-restoration" element={<PublicLayout><TempleRestorationPage /></PublicLayout>} />
            <Route path="/events" element={<PublicLayout><EventsPage /></PublicLayout>} />
            <Route path="/careers" element={<PublicLayout><CareersPage /></PublicLayout>} />
            <Route path="/volunteer" element={<PublicLayout><VolunteerPage /></PublicLayout>} />
            <Route path="/donate" element={<PublicLayout><DonatePage /></PublicLayout>} />
            <Route path="/testimonials" element={<PublicLayout><TestimonialsPage /></PublicLayout>} />
            <Route path="/media" element={<PublicLayout><MediaPage /></PublicLayout>} />
            <Route path="/contact" element={<PublicLayout><ContactPage /></PublicLayout>} />
            <Route path="/legal" element={<PublicLayout><LegalPage /></PublicLayout>} />

            {/* Admin routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
              <Route index element={<AdminDashboard />} />
              <Route path="programs" element={<AdminPrograms />} />
              <Route path="events" element={<AdminEvents />} />
              <Route path="retreats" element={<AdminRetreats />} />
              <Route path="careers" element={<AdminCareers />} />
              <Route path="volunteers" element={<AdminVolunteers />} />
              <Route path="donations" element={<AdminDonations />} />
              <Route path="testimonials" element={<AdminTestimonials />} />
              <Route path="contacts" element={<AdminContacts />} />
              <Route path="media" element={<AdminMedia />} />
            </Route>

            {/* 404 */}
            <Route path="*" element={
              <PublicLayout>
                <div className="flex items-center justify-center min-h-[60vh] text-center px-4">
                  <div>
                    <div className="text-8xl mb-6">⚠️</div>
                    <h1 className="font-serif text-5xl font-bold text-earth-800 mb-4">404</h1>
                    <p className="text-earth-500 mb-8">This path doesn't exist — but every path leads within.</p>
                    <a href="/" className="px-8 py-3 bg-saffron-500 text-white rounded-full font-semibold hover:bg-saffron-600 transition-colors">
                      Return Home
                    </a>
                  </div>
                </div>
              </PublicLayout>
            } />
          </Routes>
          </ErrorBoundary>
        </BrowserRouter>
      </AuthProvider>
    </HelmetProvider>
  );
}
