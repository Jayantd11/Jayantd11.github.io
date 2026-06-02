import Loader from './components/Loader'
import Cursor from './components/Cursor'
import ResumeModal from './components/ResumeModal'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import About from './components/About'
import Stats from './components/Stats'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Education from './components/Education'
import Contact from './components/Contact'
import Footer from './components/Footer'
import { useLenis } from './hooks/useLenis'

export default function App() {
  useLenis()

  return (
    <>
      <Loader />
      <Cursor />
      <ResumeModal />
      <Navbar />

      {/* Hero is pinned; the content sheet below scrolls up and over it. */}
      <div className="panel">
        <Hero />
      </div>

      {/* Content sheet — slides over the pinned hero with a rounded seam. */}
      <div className="panel--seam relative z-10 -mt-10 bg-ink">
        <main>
          <Marquee
            items={['Systems', 'Automation', 'Distributed', 'Backend']}
            parallax={-0.04}
          />
          <About />
          <Stats />
          <Experience />
          <Projects />
          <Marquee
            items={['Jayant Dulani', 'Software Engineer', 'Full-Stack']}
            speed="marquee-slow"
            reverse
            parallax={-0.04}
          />
          <Skills />
          <Education />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  )
}
