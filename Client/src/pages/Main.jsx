import React from 'react';
import OurCompany from '../Component/Ourcompany';
import Services from '../Component/Services';
import Navar from '../Component/Navar';
import Footer from '../Component/Footer';
// Import your video file
import BackgroundVideo from '../Video/hero-video2.mp4'; // Make sure to adjust the path to your video file

function Main() {
  return (
    <div>
      <Navar />
      <section className="hero">
        <div className="video-background">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              position: 'absolute',
              top: 0,
              left: 0,
              zIndex: -1,
            }}
          >
            <source src={BackgroundVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="container">
          <div className="row">
            <div className="hero__text">
              <h2>Revolutionize Your Finances with Digital Banking</h2>
              <p>24/7 access to all your financial needs – fast, safe, and reliable.</p>
              {/* <a href="#" className="primary-btn">Get Started</a>
              <a href="#" className="primary-btn how-it-btn">How It Works</a> */}
            </div>
          </div>
        </div>
      </section>
      
      <OurCompany />
      <Services />

      {/* Counter Section */}
      <div className="counter spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-3 col-sm-6">
              <div className="counter__item">
                <img src="img/counter/counter-1.png" alt="Successful Loan Approval" />
                <div className="counter__number">
                  <h2 className="counter-add">2100</h2>
                </div>
                <p>Successful Loan Approval</p>
              </div>
            </div>
            
            <div className="col-lg-3 col-md-3 col-sm-6">
              <div className="counter__item">
                <img src="img/counter/counter-2.png" alt="Customer Satisfaction" />
                <div className="counter__number">
                  <h2 className="counter-add">99</h2>
                  <span>%</span>
                </div>
                <p>Customer Satisfaction</p>
              </div>
            </div>
            
            <div className="col-lg-3 col-md-3 col-sm-6">
              <div className="counter__item">
                <img src="img/counter/counter-3.png" alt="Office National Partners" />
                <div className="counter__number">
                  <h2 className="counter-add">90</h2>
                  <span>+</span>
                </div>
                <p>Office National Partners</p>
              </div>
            </div>
            
            <div className="col-lg-3 col-md-3 col-sm-6">
              <div className="counter__item">
                <img src="img/counter/counter-4.png" alt="Award Certificate" />
                <div className="counter__number">
                  <h2 className="counter-add">70</h2>
                  <span>+</span>
                </div>
                <p>Award Certificate</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Main;
