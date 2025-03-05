import React, { useState } from 'react';
import ContactBread from '../Image/breadcrumb-bg.jpg';
import Footer from '../Component/Footer';
import Navar from '../Component/Navar';
import axios from 'axios'; 
import Swal from 'sweetalert2'; 

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [errors, setErrors] = useState({});

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  // Form validation logic
  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required.';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
      newErrors.email = 'Enter a valid email address.';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required.';
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Enter a valid 10-digit phone number.';
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required.';
    }
    return newErrors;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      Swal.fire('Error', 'Please fix the form errors.', 'error');
      return;
    }
    
    try {
      const response = await axios.post('http://localhost:8081/contact/insert', formData); 
      console.log(response);

      Swal.fire('Success', 'Your message has been sent!', 'success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: ''
      });
      setErrors({});
    } catch (error) {
      console.error(error);
      Swal.fire('Error', 'There was an issue sending your message. Please try again later.', 'error');
    }
  };

  return (
    <div>
      <Navar />
      <div className="breadcrumb-option contact-breadcrumb set-bg" style={{ backgroundImage: `url(${ContactBread})` }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <div className="breadcrumb__text">
                <h2>Contact Us</h2>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="contact spad">
        <div className="container">
          <div className="contact__form">
            <div className="row">
              <div className="col-lg-12">
                <div className="contact__form__text">
                  <div className="contact__form__title">
                    <h2>Get In Touch</h2>
                    <p>Please contact us or send us an email or go to our forum.</p>
                  </div>
                  <form onSubmit={handleSubmit}>
                    <div className="input-list">
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your Name"
                      />
                      {errors.name && <p className="error-text">{errors.name}</p>}
                      
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Your Email"
                      />
                      {errors.email && <p className="error-text">{errors.email}</p>}

                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Your Contact Number"
                      />
                      {errors.phone && <p className="error-text">{errors.phone}</p>}
                    </div>
                    
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Your Message"
                    />
                    {errors.message && <p className="error-text">{errors.message}</p>}

                    <button type="submit" className="site-btn">Send Message</button>
                  </form>
                </div>
              </div>
            </div>
          </div>

          {/* Contact information section */}
          <div className="row">
            <div className="col-lg-4 col-md-4 col-sm-6">
              <div className="contact__address__item">
                <h4>New York Office</h4>
                <ul>
                  <li><i className="fa fa-map-marker" /> 917 Atlantic Lane, Strongsville, <br />NY, United States</li>
                  <li><i className="fa fa-phone" /> (+12) 345-678-910</li>
                  <li><i className="fa fa-envelope" /> newyork.info@colorlib.com</li>
                </ul>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6">
              <div className="contact__address__item">
                <h4>New Jersey Office</h4>
                <ul>
                  <li><i className="fa fa-map-marker" /> 171 Logan Lane, Union City <br />NJ, United States</li>
                  <li><i className="fa fa-phone" /> (+12) 345-678-910</li>
                  <li><i className="fa fa-envelope" /> newjersey.info@colorlib.com</li>
                </ul>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6">
              <div className="contact__address__item">
                <h4>Washington Office</h4>
                <ul>
                  <li><i className="fa fa-map-marker" /> 9 East Bear Hill St. Great Falls <br />Washington, United States</li>
                  <li><i className="fa fa-phone" /> (+12) 345-678-910</li>
                  <li><i className="fa fa-envelope" /> washington.info@colorlib.com</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
