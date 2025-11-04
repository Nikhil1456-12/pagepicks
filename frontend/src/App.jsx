import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import './App.css';

// Lazy load components for better performance
const Home = lazy(() => import('./pages/Home.jsx'));
const Browse = lazy(() => import('./pages/Browse.jsx'));
const Login = lazy(() => import('./pages/Login.jsx'));
const Signup = lazy(() => import('./pages/Signup.jsx'));
const MyLibrary = lazy(() => import('./pages/MyLibrary.jsx'));
const GenrePage = lazy(() => import('./pages/GenrePage.jsx'));
const StartWriting = lazy(() => import('./pages/StartWriting.jsx'));
const WriteNow = lazy(() => import('./pages/WriteNow.jsx'));
const WhyChooseUs = lazy(() => import('./pages/WhyChooseUs.jsx'));
const AllBooks = lazy(() => import('./pages/AllBooks.jsx'));
const ResetPassword = lazy(() => import('./pages/ResetPassword.jsx'));

// Loading component
const LoadingSpinner = () => (
  <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '200px' }}>
    <div className="spinner-border text-primary" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Navbar />
        <main style={{ minHeight: 'calc(100vh - 160px)' }}>
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/browse" element={<Browse />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/mylibrary" element={<MyLibrary />} />
              <Route path="/genre/:genre" element={<GenrePage />} />
              <Route path="/startwriting" element={<StartWriting />} />
              <Route path="/writenow" element={<WriteNow />} />
              <Route path="/whychooseus" element={<WhyChooseUs />} />
              <Route path="/allbooks" element={<AllBooks />} />
              <Route path="/reset-password/:token" element={<ResetPassword />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;