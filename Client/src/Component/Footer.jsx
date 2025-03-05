import React from 'react'

export default function Footer() {
  return (
    <div>
     <footer className="footer">
  <div className="container">
    <div className="row">
      <div className="col-lg-3 col-md-6 col-sm-6">
        <div className="footer__about">
          <div className="footer__logo">
            <a href="./index.html"><img src="img/footer-logo.png" alt /></a>
          </div>
          <p>Please remember though that how far you go is up to you. There is no substitute for your own
            work and effort in succeeding in this business.</p>
        </div>
      </div>
      <div className="col-lg-2 offset-lg-1 col-md-3 col-sm-6">
        <div className="footer__widget">
          <h5>Services</h5>
          <div className="footer__widget">
            <ul>
              <li><a href="#">Personal Loans</a></li>
              <li><a href="#">Business Loans</a></li>
              <li><a href="#">Online Cash Loans</a></li>
              <li><a href="#">Cash Advance</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="col-lg-2 col-md-3 col-sm-6">
        <div className="footer__widget">
          <h5>Socials</h5>
          <div className="footer__widget footer__widget--social">
            <ul>
              <li><a href="#"><i className="fa fa-facebook" /> Facebook</a></li>
              <li><a href="#"><i className="fa fa-instagram" /> Instagram</a></li>
              <li><a href="#"><i className="fa fa-twitter" /> Twitter</a></li>
              <li><a href="#"><i className="fa fa-skype" /> Skype</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="col-lg-3 offset-lg-1 col-md-6 col-sm-6">
        <div className="footer__widget footer__widget--address">
          <h5>Open Hours</h5>
          <p>We work all days a week, Please contact us for any inquiry.</p>
          <ul>
            <li>Monday - Friday: 11:00 am - 8:00 pm</li>
            <li>Saturday: 10:00 am - 6:00 pm</li>
            <li>Sunday: 11:00 am - 6:00 pm</li>
          </ul>
        </div>
      </div>
    </div>
    <div className="footer__copyright">
      <div className="row">
        <div className="col-lg-6 col-md-6">
          <ul className="footer__copyright__links">
            <li><a href="#">Terms of use</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Community</a></li>
          </ul>
        </div>
        <div className="col-lg-6 col-md-6">
          {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
          <div className="footer__copyright__text">
            <p>Copyright © All rights reserved | This template is made with <i className="fa fa-heart" aria-hidden="true" /> by <a href="https://colorlib.com" target="_blank">Colorlib</a></p>
          </div>
          {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
        </div>
      </div>
    </div>
  </div>
</footer>

    </div>
  )
}
