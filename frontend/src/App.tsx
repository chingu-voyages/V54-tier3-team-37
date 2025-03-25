import { Routes, Route } from 'react-router-dom';
import About from './components/About';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Nav from './components/Nav';
import Auth from './components/Auth';
import AboutPage from './components/AboutPage';
// import PromptGenMockup from './components/PromptGenMockup';

function App() {
  // let user;

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-start">
      <header className="w-full">
        <Nav />
      </header>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              {/* {user ? (
        <PromptGenMockup />
      ) : (
        <div className="bg-muted w-full p-16">
          <p className="text-center max-w-xl mx-auto">
            💫 Oh no you're not logged in ahhh you can't see the prompt creator hurry up and log in you know you want to get this show on the road yeah? 🐕
          </p>
        </div>
      )} */}
              <About />
            </>
          }
        />
        <Route
          path="/about"
          element={<AboutPage />}
        />
        <Route
          path="/auth"
          element={<Auth />}
        />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
