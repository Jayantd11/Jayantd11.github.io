import React from "react";
import Navbar from './sections/navbar.jsx';
import Hero from './sections/Hero.jsx';


const App = () => {
  return(
    <main className="max-w-10xl max-auto relative">
      <Navbar />
      <Hero />
      </main>
  );
};

export default App