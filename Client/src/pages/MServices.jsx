import React from 'react';
import Services from '../Component/Services';
import { Link } from 'react-router-dom';
import Image from '../Image/breadcrumb-bg.jpg';
import Navar from '../Component/Navar';
import Footer from '../Component/Footer';

export default function MServices() {
  return (
    <div>
        <Navar/>
      <div className="breadcrumb-option set-bg" style={{ backgroundImage: `url(${Image})` }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <div className="breadcrumb__text">
                <h2>Main Loan Services</h2>
                <div className="breadcrumb__links">
                  <Link to="/">Home</Link>
                  <span>Services</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Services />
      <Footer/>
    </div>
  );
}
