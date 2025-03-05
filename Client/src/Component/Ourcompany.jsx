import React from 'react'
import OurC from '../Image/ourC.png'
import { Link } from 'react-router-dom'

export default function Ourcompany() {
  return (
    <div>
       <section className="home-about spad" style={{marginTop:'-250px'}}>
  <div className="container">
    <div className="row">
      <div className="col-lg-6">
        <div className="home__about__text">
          <div className="section-title">
            <h2>Thousands Of Customers Trust Our Company</h2>
            <p>Trusted by Thousands for Safe, Reliable Digital Banking</p>
          </div>
          <div className="row">
            <div className="col-lg-6 col-md-6">
              <div className="home__about__item">
                <h4>Our Company</h4>
                <p>Our digital banking solutions are designed for those who seek flexibility and efficiency. With cutting-edge technology and a commitment to security, we ensure our customers enjoy an experience that is both seamless and secure.</p>
              </div>
            </div>
            <div className="col-lg-6 col-md-6">
              <div className="home__about__item">
                <h4>Our Vision</h4>
                <p>Our vision is to empower every individual with the tools they need to manage their finances anytime, anywhere. We’re committed to revolutionizing banking, offering intuitive, safe, and innovative digital solutions that put you in control.</p>
              </div>
            </div>
          </div>
          <Link to={'/about'} className="primary-btn">learn More</Link>
        </div>
      </div>
      <div className="col-lg-5 offset-lg-1">
        <div className="home__about__img">
          <img src={OurC} alt />
        </div>
      </div>
    </div>
  </div>
</section>

    </div>
  )
}
