import React from "react";
import Navbar from './sections/navbar.jsx';
import Hero from './sections/Hero.jsx';
import About from './sections/about.jsx';
import Projects from './sections/Projects.jsx';
import E from './sections/Experience.jsx';
import Contact from './sections/Contact.jsx';

const App = () => {
  return(
    <main className="max-w-10xl max-auto relative">
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <E />
      <Contact />
      </main>
  );
};

export default App