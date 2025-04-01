import { Provider } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import About from './components/About';
import AboutPage from './components/AboutPage';
import Auth from './components/Auth';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Nav from './components/Nav';
import PromptGenPage from './pages/PromptGenPage';
import PrivateRoute from './components/PrivateRoute';
import AuthWrapper from './components/AuthWrapper';

import { store } from './store';

function App() {
  return (
    <Provider store={store}>
      <AuthWrapper />
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
          <Route
            path="/generate"
            element={
              <PrivateRoute>
                <PromptGenPage />
              </PrivateRoute>
            }
          />
        </Routes>
        <Footer />
      </div>
    </Provider>
  );
}

export default App;
