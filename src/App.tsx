import { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { trackVisitor } from './lib/supabase';

import Header from './components/Header';
import Footer from './components/Footer';
import LoadingSpinner from './components/LoadingSpinner';
import ScrollProgress from './components/ScrollProgress';
import BackToTop from './components/BackToTop';
import SmoothScroll from './components/SmoothScroll';

const Hero = lazy(() => import('./components/Hero'));
const About = lazy(() => import('./components/About'));
const Experience = lazy(() => import('./components/Experience'));
const Projects = lazy(() => import('./components/Projects'));
const Certificates = lazy(() => import('./components/Certificates'));
const NotFound = lazy(() => import('./components/NotFound'));

function RouteTracker() {
  const { pathname } = useLocation();
  useEffect(() => {
    void trackVisitor();
  }, [pathname]);
  return null;
}

/** Single-page layout matching iqmal.dev */
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
      <SmoothScroll />
      <RouteTracker />
      <a href="#main" className="skip-link">
        Lompat ke konten utama
      </a>
      <ScrollProgress />
      <Header />
      <main id="main" className="relative z-20 bg-[#e8e8e5] shadow-[0_20px_50px_rgba(0,0,0,0.15)]">
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            {[
              '/',
              '/home',
              '/about',
              '/projects',
              '/skills',
              '/experience',
              '/education',
              '/certificates',
              '/contact',
            ].map((path) => (
              <Route key={path} path={path} element={<HomePage />} />
            ))}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <BackToTop />
    </Router>
  );
}

export default App;
