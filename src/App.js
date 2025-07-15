// Import necessary libraries and components
import React, { Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

// Import all components
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Menu from './components/Menu';
import Services from './components/Services';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import Footer from './components/Footer';
import LoadingSpinner from './components/LoadingSpinner';

// Register GSAP plugins for animations
gsap.registerPlugin(ScrollTrigger, TextPlugin, ScrollToPlugin);

function App() {
  // useEffect hook to handle side effects
  useEffect(() => {
    // Initialize GSAP animations on component mount
    gsap.set('body', { opacity: 1 }); // Set body opacity to 1 to prevent flash of unstyled content
    
    // Configure GSAP for smooth scrolling
    gsap.config({
      nullTargetWarn: false,
      trialWarn: false
    });

    // Create scroll-triggered animations for elements with the class 'animate-on-scroll'
    ScrollTrigger.batch('.animate-on-scroll', {
      onEnter: (elements) => {
        // Animate elements into view
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
        // Animate elements out of view
        gsap.to(elements, {
          opacity: 0.3,
          scale: 0.95,
          duration: 0.5
        });
      },
      onEnterBack: (elements) => {
        // Animate elements back into view when scrolling up
        gsap.to(elements, {
          opacity: 1,
          scale: 1,
          duration: 0.5
        });
      }
    });

    // Cleanup function to kill all ScrollTrigger instances on component unmount
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []); // Empty dependency array ensures this effect runs only once on mount

  return (
    // Router for handling navigation
    <Router>
      <div className="App font-quicksand">
        {/* Suspense for handling lazy loading of components */}
        <Suspense fallback={<LoadingSpinner />}>
          {/* Routes for defining different pages */}
          <Routes>
            {/* Route for the homepage */}
            <Route path="/" element={
              <>
                {/* Navbar component */}
                <Navbar />
                {/* Main content */}
                <main>
                  {/* Hero section */}
                  <Hero />
                  {/* About section */}
                  <About />
                  {/* Menu section */}
                  <Menu />
                  {/* Services section */}
                  <Services />
                  {/* Gallery section */}
                  <Gallery />
                  {/* Contact section */}
                  <Contact />
                </main>
                {/* Footer component */}
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