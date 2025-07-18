import React, { Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

// Components
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Menu from './components/Menu';
import Services from './components/Services';
import BudgetCalculator from './components/BudgetCalculator';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import Footer from './components/Footer';
import LoadingSpinner from './components/LoadingSpinner';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, TextPlugin, ScrollToPlugin);

function App() {
  useEffect(() => {
    // Initialize GSAP animations
    gsap.set('body', { opacity: 1 });
    
    // Smooth scrolling setup
    gsap.config({
      nullTargetWarn: false,
      trialWarn: false
    });

    // Create scroll-triggered animations
    ScrollTrigger.batch('.animate-on-scroll', {
      onEnter: (elements) => {
        gsap.fromTo(elements, 
          { 
            opacity: 0, 
            y: 100,
            scale: 0.8
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            stagger: 0.2,
            ease: 'power3.out'
          }
        );
      },
      onLeave: (elements) => {
        gsap.to(elements, {
          opacity: 0.3,
          scale: 0.95,
          duration: 0.5
        });
      },
      onEnterBack: (elements) => {
        gsap.to(elements, {
          opacity: 1,
          scale: 1,
          duration: 0.5
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <Router>
      <div className="App font-quicksand">
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={
              <>
                <Navbar />
                <main>
                  <Hero />
                  <About />
                  <Menu />
                  <Services />
                  <BudgetCalculator />
                  <Gallery />
                  <Contact />
                </main>
                <Footer />
              </>
            } />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;