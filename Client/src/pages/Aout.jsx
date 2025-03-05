import React from 'react';
import breadcrumbImage from '../Image/breadcrumb-bg.jpg'; // Adjust the path as needed
import aboutImage from '../Image/about.jpg';
import playButtonImage from '../Image/video-play.png';
import Navar from '../Component/Navar';
import Footer from '../Component/Footer';

export default function About() {
  return (
    <div>
        <Navar/>
      {/* Breadcrumb Section */}
      <div
        className="breadcrumb-option set-bg"
        style={{ backgroundImage: `url(${breadcrumbImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <div className="breadcrumb__text">
                <h2>About Us</h2>
                <div className="breadcrumb__links">
                  <a href="./index.html">Home</a>
                  <span>About</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <section className="about spad">
        <div className="container">
          <div className="about__content">
            <div className="row">
              <div className="col-lg-5">
                <div className="about__img">
                  <img src={aboutImage} alt="About" />
                  <a href="https://www.youtube.com/watch?v=RpvAmG1NNN0" className="play-btn video-popup">
                    <img src={playButtonImage} alt="Play Video" />
                  </a>
                </div>
              </div>
              <div className="col-lg-6 offset-lg-1">
                <div className="about__text">
                  <h2>Welcome to Loanday – The Future of Digital Banking.</h2>
                  <h4>However, there is much more to branding than</h4>
                  <p className="first_para">At Loanday, we understand that the world is changing rapidly, and banking needs to keep up. That's why we’ve created a seamless, secure, and innovative digital banking experience designed to empower individuals and businesses alike. Our services bring banking to your fingertips – accessible anytime, anywhere – with the utmost focus on security and simplicity..</p>
                  {/* <p className="last_para">Unfortunately, many graphic design firms who position themselves as advertising agencies believe that branding your corporate identity is all about developing great looking visual solutions.</p> */}
                  <a href="#" className="primary-btn">Contact Us</a>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-4 col-md-4">
              <div className="about__item">
                <h4>Our Vision</h4>
                <p>Our vision is to transform banking by making financial services more accessible, secure, and efficient. We aim to provide customers with a banking experience that is as intuitive and flexible as the world around us. We believe that digital banking should not just meet your needs but anticipate them, helping you take control of your financial future with ease.</p>
              </div>
            </div>
            <div className="col-lg-4 col-md-4">
              <div className="about__item">
                <h4>Our Mission</h4>
                <p>In today’s fast-paced world, people need access to their finances at a moment’s notice. Our mission is to provide fast, reliable, and secure banking solutions that allow you to manage your finances on your terms. We are committed to delivering prompt and accurate financial information, making banking simpler and more efficient for our customers, whenever and wherever they need it.</p>
              </div>
            </div>
            <div className="col-lg-4 col-md-4">
              <div className="about__item">
                <h4>Our Value</h4>
                <p>We believe in offering more than just a service – we strive to build trust, reliability, and transparency with every customer interaction.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer/>
    </div>
  );
}
