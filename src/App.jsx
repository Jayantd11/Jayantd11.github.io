import React from "react";
import Navbar from './sections/navbar.jsx';
import Hero from './sections/Hero.jsx';
import About from './sections/about.jsx';


const App = () => {
  return(
    <main className="max-w-10xl max-auto relative">
      <Navbar />
      <Hero />
      <About />
      </main>
  );
};

export default App