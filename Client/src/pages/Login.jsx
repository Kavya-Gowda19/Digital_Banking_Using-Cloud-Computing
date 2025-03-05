import React, { useState } from 'react';
import '../css/login.css';
import * as mdb from 'mdb-ui-kit'; // lib
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const HandleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let isValid = true;
    let errors = {};

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!userInfo.email || !emailRegex.test(userInfo.email)) {
      errors.email = "Please enter a valid email address.";
      isValid = false;
    }

    // Password validation
    if (!userInfo.password) {
      errors.password = "Please enter your password.";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const HandleSubmit = async () => {
    if (validate()) {
      axios
        .post("http://localhost:8081/user/login", userInfo)
        .then(async (res) => {
          alert(res.data.message);
          if (res.data.success) {
            localStorage.setItem("loggedUser", JSON.stringify(res.data.loggedInUser));
            localStorage.setItem("UserToken", JSON.stringify(res.data.userToken));
            navigate('/');
          }
        })
        .catch((err) => {
          console.log(err);
          alert(err.message);
        });
    } else {
      alert("Please fill in all fields correctly.");
    }
  };

  return (
    <div>
      <section className="h-100 gradient-form" style={{ backgroundColor: '#eee' }}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-xl-10">
              <div className="card rounded-3 text-black">
                <div className="row g-0">
                  <div className="col-lg-6">
                    <div className="card-body p-md-5 mx-md-4">
                      <div className="text-center">
                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp" style={{ width: 185 }} alt="logo" />
                        <h4 className="mt-1 mb-5 pb-1">Login</h4>
                      </div>
                      <form>
                        <p>Please login to your account</p>
                        <div data-mdb-input-init className="form-outline mb-4">
                          <input
                            type="email"
                            id="form2Example11"
                            name="email"
                            className="form-control"
                            onChange={HandleChange}
                            placeholder="Email address"
                          />
                          <label className="form-label" htmlFor="form2Example11">Email</label>
                          {errors.email && <small className="text-danger">{errors.email}</small>}
                        </div>
                        <div data-mdb-input-init className="form-outline mb-4">
                          <input
                            type="password"
                            id="form2Example22"
                            name="password"
                            onChange={HandleChange}
                            className="form-control"
                          />
                          <label className="form-label" htmlFor="form2Example22">Password</label>
                          {errors.password && <small className="text-danger">{errors.password}</small>}
                        </div>
                        <div className="text-center pt-1 mb-5 pb-1">
                          <button
                            data-mdb-button-init
                            data-mdb-ripple-init
                            className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3"
                            onClick={HandleSubmit}
                            type="button"
                          >
                            Log in
                          </button>
                        </div>
                        <div className="d-flex align-items-center justify-content-center pb-4">
                          <p className="mb-0 me-2">Don't have an account?</p>
                          <Link to={'/register'}>
                            <button
                              type="button"
                              data-mdb-button-init
                              data-mdb-ripple-init
                              className="btn btn-outline-danger"
                            >
                              Create new
                            </button>
                          </Link>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
                  <div className="text-white px-3 py-4 p-md-5 mx-md-4">
  <h4 className="mb-4">Welcome Back to Your Secure Banking Experience</h4>
  <p className="small mb-0">Access your account safely and securely to manage your finances anytime, anywhere. We’re here to make banking easy and accessible, empowering you with total control over your financial journey.</p>
</div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
