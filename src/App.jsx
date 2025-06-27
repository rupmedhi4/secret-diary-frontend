import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
import FaceAuth from './components/FaceAuth/FaceAuth';
import Cookies from 'js-cookie';
import { useDiary } from './Context/DiaryContext';
import SingleEntries from './components/SingleEntries';

function App() {
  const { token, setToken } = useDiary()
  console.log(token);

  useEffect(() => {

    const jwt = Cookies.get('jwt');
    console.log("jwt", jwt);

    setToken(jwt);
  }, []);

  return (
    <>
      <Router>
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
          <Routes>
            <Route
              path="/"
              element={
                token ? <Navigate to="/home" /> : <FaceAuth />
              }
            />
            <Route
              path="/home"
              element={
                token ? <Home /> : <Navigate to="/" />
              }
            />
            <Route
              path="/home/entries/:id"
              element={
                token ? <SingleEntries /> : <Navigate to="/" />
              }
            />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
