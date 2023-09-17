import React, { useState, useEffect } from "react";
import jwtDecode from "jwt-decode";
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import Preloader from "../src/components/Pre";
import Navv from "./components/navvv";
import HomePage from "./components/home";
import LoginForm from "./components/login";
import About from "./components/about";
import RegistrationForm from "./components/registe";
import DonatePage from "./components/donate";
import Admin from "./components/admin";
import HospitalAdmin from "./components/hospital";
import Availability from "./components/availability";
import ScrollToTop from "./components/ScrollToTop";
import Footer from "./components/Footer";
import ProfileCard from "./components/profile";
import Particle from "./components/Particle";
import Logo from './Assets/bgm.png';
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import "./App.css";

function App() {
  const [load, upadateLoad] = useState(true);
  const [userType, setUserType] = useState('user');
  const token = localStorage.getItem('token');
  const expiresIn = localStorage.getItem('expiresIn');
  
  const isTokenValid = () => {
    if (!token || !expiresIn) return false;
    return expiresIn - Date.now() > 0;
  };

  const [isLoggedIn, setisLoggedIn] = useState(isTokenValid());

  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token);
      setUserType(decodedToken.userType);
      localStorage.setItem('email',decodedToken.email)
    }
  }, [token]);

  useEffect(() => {
    const timer = setTimeout(() => {
      upadateLoad(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isTokenValid()) {
      setisLoggedIn(false);
    }
  }, [expiresIn]);

  return (
    <Router>
      <Preloader load={load} />
      <div className="App" id={load ? "no-scroll" : "scroll"}>
        <Navv isLoggedIn={isLoggedIn} setisLoggedIn={setisLoggedIn} userType={userType} setUserType={setUserType} />
        
        <Routes>
          <Route path="/" element={<HomePage isLoggedIn={isLoggedIn} setisLoggedIn={setisLoggedIn} />} />
          <Route path="/login" element={<LoginForm isLoggedIn={isLoggedIn} setisLoggedIn={setisLoggedIn} />} />
          <Route path="/about" element={<About />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/donate" element={<DonatePage />} />
          <Route path="/admin" element={<Admin />} />
          {userType === "hospital" ? (
            <Route path="/availability" element={<HospitalAdmin isLoggedIn={isLoggedIn} setisLoggedIn={setisLoggedIn} />} />
          ) : (
            <Route path="/availability" element={<Availability isLoggedIn={isLoggedIn} setisLoggedIn={setisLoggedIn} />} />
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
