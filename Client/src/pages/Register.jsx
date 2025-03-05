import React, { useState } from 'react';
import '../css/login.css';
import * as mdb from 'mdb-ui-kit';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Register() {
  const navigate = useNavigate();

  const [reg, setReg] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});

  const HandleChange = (e) => {
    setReg({ ...reg, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let tempErrors = {};
    let isValid = true;

    // Name validation
    if (!reg.name.trim()) {
      tempErrors.name = "Name is required";
      isValid = false;
    }

    // Email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (!reg.email.trim()) {
      tempErrors.email = "Email is required";
      isValid = false;
    } else if (!emailRegex.test(reg.email)) {
      tempErrors.email = "Please enter a valid Gmail address";
      isValid = false;
    }

    // Phone validation
    const phoneRegex = /^\d{10}$/;
    if (!reg.phone.trim()) {
      tempErrors.phone = "Phone number is required";
      isValid = false;
    } else if (!phoneRegex.test(reg.phone)) {
      tempErrors.phone = "Phone number must be exactly 10 digits";
      isValid = false;
    }

    // Password validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!reg.password.trim()) {
      tempErrors.password = "Password is required";
      isValid = false;
    } else if (!passwordRegex.test(reg.password)) {
      tempErrors.password = "Password must be at least 8 characters long, contain one uppercase letter, one lowercase letter, one number, and one special character";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const HandleSubmit = () => {
    if (validate()) {
      axios
        .post("http://localhost:8081/user/reg", reg)
        .then((res) => {
          alert(res.data.message);
          if (res.data.success) {
            navigate('/login');
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
                        <h4 className="mt-1 mb-5 pb-1">Register</h4>
                      </div>
                      <form>
                        <p>Please Register to your account</p>
                        <div data-mdb-input-init className="form-outline mb-4">
                          <input type="text" id="form2Example11" onChange={HandleChange} className="form-control" name='name' placeholder="Enter user name" />
                          <label className="form-label" htmlFor="form2Example11">Username</label>
                          {errors.name && <small className="text-danger">{errors.name}</small>}
                        </div>
                        <div data-mdb-input-init className="form-outline mb-4">
                          <input type="email" id="form2Example11" onChange={HandleChange} className="form-control" name='email' placeholder="Enter Email" />
                          <label className="form-label" htmlFor="form2Example11">Email</label>
                          {errors.email && <small className="text-danger">{errors.email}</small>}
                        </div>
                        <div data-mdb-input-init className="form-outline mb-4">
                          <input type="tel" id="form2Example11" onChange={HandleChange} name='phone' className="form-control" placeholder="Enter contact number" />
                          <label className="form-label" htmlFor="form2Example11">Contact Number</label>
                          {errors.phone && <small className="text-danger">{errors.phone}</small>}
                        </div>
                        <div data-mdb-input-init className="form-outline mb-4">
                          <input type="password" id="form2Example22" onChange={HandleChange} name='password' className="form-control" />
                          <label className="form-label" htmlFor="form2Example22">Password</label>
                          {errors.password && <small className="text-danger">{errors.password}</small>}
                        </div>

                        <div data-mdb-input-init className="form-outline mb-4">
                          <input type="text" id="form2Example22" onChange={HandleChange} name='accountno' className="form-control" />
                          <label className="form-label" htmlFor="form2Example22"> If you have  Account Enter your Account Number</label>      
                        </div>

                        <div data-mdb-input-init className="form-outline mb-4">
                          <input type="text" id="form2Example22" onChange={HandleChange} name='IFSC_code' className="form-control" />
                          <label className="form-label" htmlFor="form2Example22"> IFSC Code</label>
                        
                        </div>


                        <div className="text-center pt-1 mb-5 pb-1">
                          <button data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3" onClick={HandleSubmit} type="button">Register</button>
                        </div>
                        <div className="d-flex align-items-center justify-content-center pb-4">
                          <p className="mb-0 me-2">Already have an account?</p>
                          <Link to={'/login'}><button type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-outline-danger">Please Login</button></Link>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
                  <div className="text-white px-3 py-4 p-md-5 mx-md-4">
  <h4 className="mb-4">Join Us and Experience Hassle-Free Digital Banking</h4>
  <p className="small mb-0">Sign up today to enjoy a seamless, secure, and modern banking experience. With instant access, 24/7 availability, and robust security, managing your finances has never been easier. Take the first step towards smart, efficient banking.</p>
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
