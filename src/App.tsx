import { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { trackVisitor } from './lib/supabase';

import Header from './components/Header';
import Footer from './components/Footer';
import ScrollProgress from './components/ScrollProgress';
import BackToTop from './components/BackToTop';
import SmoothScroll from './components/SmoothScroll';
import LoadingSpinner from './components/LoadingSpinner';

import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Certificates from './components/Certificates';

const Admin = lazy(() => import('./components/Admin'));
const NotFound = lazy(() => import('./components/NotFound'));

function RouteTracker() {
  const { pathname } = useLocation();
  useEffect(() => {
    void trackVisitor();
  }, [pathname]);
  return null;
}

/** Single-page editorial layout matching iqmal.dev */
function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Certificates />
    </>
  );
}

function App() {
  return (
    <Router>
      <RouteTracker />
      <SmoothScroll />
      <ScrollProgress />
      <a href="#main-content" className="skip-link">
        Lewati ke Konten Utama
      </a>
      <div className="flex min-h-screen flex-col bg-[#e8e8e5] text-[#111114] selection:bg-[#111114] selection:text-white overflow-x-hidden max-w-full">
        <Header />
        <main id="main-content" className="flex-grow overflow-x-hidden max-w-full">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/admin"
              element={
                <Suspense
                  fallback={
                    <div className="flex min-h-[60vh] items-center justify-center">
                      <LoadingSpinner />
                    </div>
                  }
                >
                  <Admin />
                </Suspense>
              }
            />
            <Route
              path="*"
              element={
                <Suspense
                  fallback={
                    <div className="flex min-h-[60vh] items-center justify-center">
                      <LoadingSpinner />
                    </div>
                  }
                >
                  <NotFound />
                </Suspense>
              }
            />
          </Routes>
        </main>
        <Footer />
        <BackToTop />
      </div>
    </Router>
  );
}

export default App;
