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
      <SmoothScroll />
      <RouteTracker />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:rounded-full focus:bg-[#111114] focus:px-5 focus:py-2.5 focus:font-mono focus:text-xs focus:text-white focus:shadow-xl"
      >
        Lompat ke konten utama
      </a>
      <ScrollProgress />
      <Header />
      <main id="main" className="relative z-20 bg-[#deded9] shadow-[0_20px_50px_rgba(0,0,0,0.15)]">
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
          <Route
            path="*"
            element={
              <Suspense fallback={<LoadingSpinner />}>
                <NotFound />
              </Suspense>
            }
          />
        </Routes>
      </main>
      <Footer />
      <BackToTop />
    </Router>
  );
}

export default App;
