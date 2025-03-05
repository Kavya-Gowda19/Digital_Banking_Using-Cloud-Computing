import React, { useState, useEffect } from 'react';
import logo from '../Image/logo.png';
import './nav.css';
import { Logout, Login } from '@mui/icons-material'; // Import Material-UI icons
import { Link, useNavigate } from 'react-router-dom';

export default function Navar() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const userToken = localStorage.getItem('UserToken');
    if (userToken) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    navigate('/login');
  };

  const handleLogout = () => {
    localStorage.removeItem('UserToken');
    localStorage.removeItem('loggedUser');
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <div>
      <header className="header">
        <div className="header__top">
          <div className="container">
            <div className="row">
              <div className="col-lg-9">
                <ul className="header__top__widget">
                  <li><i className="fa fa-map-marker" /> 96 Ernser Vista Suite 437, NY, US</li>
                  <li><i className="fa fa-phone" /> (123) 456-78-910</li>
                  <li><i className="fa fa-envelope" /> Info@colorlib.com</li>
                </ul>
              </div>
              <div className="col-lg-3">
                {/* Additional content can go here */}
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              <div className="header__logo">
                <Link to={'/'}><img src={logo} alt="Logo" /></Link>
              </div>
            </div>
            <div className="col-lg-9">
              <div className="header__nav">
              <nav className="header__menu">
  <ul>
    <li className="active"><Link to={'/'}>Home</Link></li>
    <li><Link to={'/about'}>About</Link></li>
    {isLoggedIn && (<li><Link to={'/profile'}>Profile</Link></li>)} {/* Conditionally render Profile */}
    <li><Link to={'/services'}>Services</Link></li>
    <li><Link to={'/contactUs'}>Contact</Link></li>
  </ul>
</nav>

                <div className="header__search">
                  {/* Conditionally render Login or Logout based on isLoggedIn state */}
                  {isLoggedIn ? (
                    <button onClick={handleLogout} className="logout-btn">
                      <Logout /> {/* Material-UI Logout Icon */}
                      <span>Logout</span> {/* Optional text to accompany the icon */}
                    </button>
                  ) : (
                    <button onClick={handleLogin} className="login-btn">
                      <Login /> {/* Material-UI Login Icon */}
                      <span>Login</span> {/* Optional text to accompany the icon */}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="canvas__open">
            <span className="fa fa-bars" />
          </div>
        </div>
      </header>
    </div>
  );
}
