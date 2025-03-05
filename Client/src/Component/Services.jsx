import React from 'react';
import { Link } from 'react-router-dom';
import passbook from '../Image/passbook1.png';
import ContactUs from '../Image/ContactUs.png';
import banktransfer from '../Image/banktransfer.png';
import check_balance from '../Image/check balance.png';
import transactionH from '../Image/transactionH.png';
import electricity from '../Image/electricity.png'
import internet from '../Image/internet.png'
import { QRCodeCanvas } from 'qrcode.react';  // Correct import for QR code

export default function Services() {
  // Retrieve user data from local storage with a safety check
  let loggedUser = null;
  try {
    const storedUser = localStorage.getItem('loggedUser');
    if (storedUser) {
      loggedUser = JSON.parse(storedUser);
    }
  } catch (error) {
    console.error('Failed to parse loggedUser from localStorage:', error);
  }

  const userStatus = loggedUser ? loggedUser.status : null;
  const isAccountVerified = userStatus === "Account Verified";
  const isLoggedIn = loggedUser !== null;

  // Get username from logged-in user
  const username = loggedUser ? loggedUser.name : '';

  console.log(username, "loggedUser.name")

  return (
    <div>
      <section className="choose spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title">
                <h2>Our Services</h2>
                <p>Looking for Easy, Fast, and Secure Banking? Discover Our Services Below!</p>
              </div>
            </div>
          </div>
          <div className="row">
            {/* Always visible services */}
            <div className="col-lg-4 col-md-4 col-sm-6">
              <div className="choose__item">
                <Link to={'/mpassbook'}>
                  <img src={passbook} alt="mPassbook" />
                  <h5>mPassbook</h5>
                  <p>Keep track of your transactions...</p>
                </Link>
              </div>
            </div>

            <div className="col-lg-4 col-md-4 col-sm-6">
              <div className="choose__item">
                <Link to={'/ContactUs'}>
                  <img src={ContactUs} alt="Contact Us" />
                  <h5>Contact Us</h5>
                  <p>Have questions or need assistance...</p>
                </Link>
              </div>
            </div>

            {/* Conditionally render services based on login status */}
            {isLoggedIn && isAccountVerified && (
              <>
               

                {/* Other services */}
                <div className="col-lg-4 col-md-4 col-sm-6">
                  <Link to={'/mtransfer'}>
                    <div className="choose__item">
                      <img src={banktransfer} alt="Bank Transfer" />
                      <h5>Bank Transfer</h5>
                      <p>Make credit card payments anytime...</p>
                    </div>
                  </Link>
                </div>

                <div className="col-lg-4 col-md-4 col-sm-6">
                  <Link to={'/formforCB'}>
                    <div className="choose__item">
                      <img src={check_balance} alt="Check Balance" />
                      <h5>Check Balance</h5>
                      <p>Check your balance anytime...</p>
                    </div>
                  </Link>
                </div>

                <div className="col-lg-4 col-md-4 col-sm-6">
                  <Link to={'/transactionhistory'}>
                    <div className="choose__item">
                      <img src={transactionH} alt="Transaction History" />
                      <h5>Transaction History</h5>
                      <p>Review your past transactions...</p>
                    </div>
                  </Link>
                </div>

                <div className="col-lg-4 col-md-4 col-sm-6">
                  <Link to={'/recharge'}>
                    <div className="choose__item">
                      <img src={internet} alt="Transaction History" />
                      <h5> Mobile Recharge</h5>
                      <p></p>
                    </div>
                  </Link>
                </div>

                 {/* Display QR Code with username */}
                 <div className="col-lg-4 col-md-4 col-sm-6">
                  <div className="choose__item">
                    <h5>Scan & Pay</h5>
                    <p>Make payments Scan this QR code</p>
                    <div>
                      <QRCodeCanvas value={username} size={128} level="H" includeMargin={true} />
                    </div>
                  </div>
                </div>

                 <div className="col-lg-4 col-md-4 col-sm-6">
                  <Link to={'/electricity'}>
                    <div className="choose__item">
                      <img src={electricity} alt="Transaction History" />
                      <h5>Electricity Bill Payment</h5>
                      <p></p>
                    </div>
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
