<<<<<<< HEAD
import { Routes, Route } from 'react-router-dom';
=======
import { Provider } from 'react-redux';
import {
  Route,
  Routes,
} from 'react-router-dom';

>>>>>>> 84784c98258d97c6b01c3a30924fb3ed6d12cbd6
import About from './components/About';
import AboutPage from './components/AboutPage';
import Auth from './components/Auth';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Nav from './components/Nav';
<<<<<<< HEAD
import Auth from './components/Auth';
import AboutPage from './components/AboutPage';
=======
import { store } from './store';

>>>>>>> 84784c98258d97c6b01c3a30924fb3ed6d12cbd6
// import PromptGenMockup from './components/PromptGenMockup';

function App() {
  // let user;

  return (
<<<<<<< HEAD
    <div className="flex h-screen w-screen flex-col items-center justify-start">
      <header className="w-full">
        <Nav />
      </header>
=======
    <Provider store={store}>
      <div className="flex h-screen w-screen flex-col items-center justify-start">
        <header className="w-full">
          <Nav />
        </header>
>>>>>>> 84784c98258d97c6b01c3a30924fb3ed6d12cbd6
      <Routes>
        <Route
          path="/"
          element={
            <>
<<<<<<< HEAD
              <Hero />
              {/* {user ? (
=======
                <Hero />
                {/* {user ? (
>>>>>>> 84784c98258d97c6b01c3a30924fb3ed6d12cbd6
        <PromptGenMockup />
      ) : (
        <div className="bg-muted w-full p-16">
          <p className="text-center max-w-xl mx-auto">
            💫 Oh no you're not logged in ahhh you can't see the prompt creator hurry up and log in you know you want to get this show on the road yeah? 🐕
          </p>
        </div>
      )} */}
<<<<<<< HEAD
              <About />
=======
                <About />
>>>>>>> 84784c98258d97c6b01c3a30924fb3ed6d12cbd6
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

<<<<<<< HEAD
      <Footer />
    </div>
=======
        <Footer />
      </div>
    </Provider>
>>>>>>> 84784c98258d97c6b01c3a30924fb3ed6d12cbd6
  );
}

export default App;
