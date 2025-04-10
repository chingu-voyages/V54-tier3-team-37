import { Provider } from 'react-redux';
import {
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';

import About from './components/About';
import Auth from './components/Auth';
import AuthWrapper from './components/AuthWrapper';
import Dashboard from './components/Dashboard';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Nav from './components/Nav';
import PrivateRoute from './components/PrivateRoute';
import PromptHistory from './components/PromptHistory';
import PromptGenPage from './pages/PromptGenPage';
import { store } from './store';

function App() {
  return (
    <Provider store={store}>
      <AuthWrapper />
      <div className="flex h-screen w-screen flex-col items-center justify-start font-inter">
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
            path="/auth"
            element={<Auth />}
          />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          >
            <Route
              index
              element={<Navigate to="history" replace />}
            />
            <Route
              path="generate"
              element={<PromptGenPage />}
            />
            <Route
              path="history"
              element={<PromptHistory />}
            />
          </Route>
          {/* Optional: Add a 404 Not Found route */}
          {/* <Route path="*" element={<NotFoundPage />} /> */}
        </Routes>
        <Footer />
      </div>
    </Provider>
  );
}

export default App;
