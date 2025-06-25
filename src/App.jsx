import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
import FaceAuth from './components/FaceAuth/FaceAuth';
import Cookies from 'js-cookie';

function App() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const jwt = Cookies.get('jwt'); 
    setToken(jwt);
  }, []);

  return (
    <Router>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <Routes>
          <Route
            path="/"
            element={
              token ? <Navigate to="/home" /> : <FaceAuth onLogin={() => setToken(Cookies.get('jwt'))} />
            }
          />
          <Route
            path="/home"
            element={
              token ? <Home /> : <Navigate to="/" />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
