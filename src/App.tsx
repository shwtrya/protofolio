import { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { trackVisitor } from './lib/supabase';

import Header from './components/Header';
import Footer from './components/Footer';
import LoadingSpinner from './components/LoadingSpinner';
import ScrollProgress from './components/ScrollProgress';
import BackToTop from './components/BackToTop';

const Hero = lazy(() => import('./components/Hero'));
const About = lazy(() => import('./components/About'));
const Projects = lazy(() => import('./components/Projects'));
const Skills = lazy(() => import('./components/Skills'));
const Experience = lazy(() => import('./components/Experience'));
const Education = lazy(() => import('./components/Education'));
const Certificates = lazy(() => import('./components/Certificates'));
const Contact = lazy(() => import('./components/Contact'));
const NotFound = lazy(() => import('./components/NotFound'));

function RouteTracker() {
  const { pathname } = useLocation();
  useEffect(() => {
    void trackVisitor();
  }, [pathname]);
  return null;
}

/** Deep routes render the single-page layout; the router only picks the anchor. */
function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Experience />
      <Education />
      <Certificates />
      <Contact />
    </>
  );
}

function App() {
  return (
    <Router>
      <RouteTracker />
      <a href="#main" className="skip-link">
        Lompat ke konten utama
      </a>
      <ScrollProgress />
      <Header />
      <main id="main">
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
