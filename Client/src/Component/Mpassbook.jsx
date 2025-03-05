import React, { useState } from 'react';
import axios from 'axios';
import './exm.css';
import {Link} from 'react-router-dom' 

export default function Mpassbook() {
  const [image, setImage] = useState({
    aadharcardid: '',
    pancardid: '',
    signeid: '',
    userimg: ''
  });

  const [imagen, setImageN] = useState({
    nominee: {
      nominee_signeid: ''
    }
  });

  const [account, setAccount] = useState({
    type: '',
    OpBalance: '',
    name: '',
    phone: '',
    aadharcardno: '',
    email: '',
    pancardno: '',
    address: '',
    age: ''
  });

  const [Naccount, setNAccount] = useState({
    nominee: {
      nominee_name: '',
      nominee_email: '',
      nominee_contactNumber: '',
      nominee_relationship: '',
      nominee_address: ''
    }
  });

  const [open, setOpen] = useState(false);

  const handleChange = (e) => {
    setAccount({ ...account, [e.target.name]: e.target.value });
  };

  const handleChangeN = (e) => {
    setNAccount((prev) => ({
      nominee: {
        ...prev.nominee,
        [e.target.name]: e.target.value
      }
    }));
  };

  const handleImage = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage((prev) => ({
        ...prev,
        [e.target.name]: e.target.files[0]
      }));
    }
  };

  const handleImageN = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImageN((prev) => ({
        ...prev,
        nominee: {
          ...prev.nominee,
          [e.target.name]: e.target.files[0]
        }
      }));
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
  
    if (!account.type) {
      alert('Please select an account type');
      return;
    }
  
    const formData = new FormData();
    formData.append('type', account.type);
    formData.append('OpBalance', account.OpBalance);
    formData.append('name', account.name);
    formData.append('phone', account.phone);
    formData.append('aadharcardno', account.aadharcardno);
    formData.append('email', account.email);
    formData.append('age', account.age);
    formData.append('address', account.address);
    formData.append('pancardid', image.pancardid || '');
    formData.append('signeid', image.signeid || '');
    formData.append('aadharcardid', image.aadharcardid || '');
    formData.append('userimg', image.userimg || '');
  
    // Nominee details
    formData.append('nominee_name', Naccount.nominee.nominee_name);
    formData.append('nominee_email', Naccount.nominee.nominee_email);
    formData.append('nominee_contactNumber', Naccount.nominee.nominee_contactNumber);
    formData.append('nominee_relationship', Naccount.nominee.nominee_relationship);
    formData.append('nominee_address', Naccount.nominee.nominee_address);
    formData.append('nominee_signeid', imagen.nominee.nominee_signeid || '');
  
    axios
      .post('http://localhost:8081/user/userinsert', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      .then((res) => {
        // Handle success response
        alert(res.data.message || 'Account created successfully!');
        console.log(res.data, "Success Data");
      })
      .catch((err) => {
        // Handle error response
        if (err.response && err.response.data && err.response.data.message) {
          alert(`Error: ${err.response.data.message}`);
        } else {
          alert('An unexpected error occurred. Please try again.');
        }
        console.error(err);
      });
  };
  

  return (
    <div>
      <div className="form-container">
     <Link to="/">   <button className="back-button">&#8592; Back</button> </Link>
        <h2>Apply for passbook</h2><br />
        <form onSubmit={onSubmit}>
          <table>
            <tbody>
              <tr>
                <td>Full Name:</td>
                <td colSpan="3">
                  <input
                    type="text"
                    name="name"
                    placeholder="name"
                    onChange={handleChange}
                    required
                  />
                </td>
              </tr>

              <tr>
                <td>Contact Number:</td>
                <td colSpan="3">
                  <input
                    type="tel"
                    name="phone"
                    placeholder="contact number"
                    onChange={handleChange}
                    required
                  />
                </td>
              </tr>

              <tr>
                <td>Email:</td>
                <td colSpan="3">
                  <input
                    type="email"
                    name="email"
                    placeholder="email"
                    onChange={handleChange}
                    required
                  />
                </td>
              </tr>

              <tr>
                <td>Account Type:</td>
                <td colSpan="3">
                  <select
                    name="type"
                    value={account.type}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>Select Account Type</option>
                    <option value="Saving">Savings</option>
                    <option value="Current">Current</option>
                    <option value="Business">Business</option>
                  </select>
                </td>
              </tr>

              <tr>
                <td>AadharCard No:</td>
                <td colSpan="3">
                  <input
                    type="text"
                    name="aadharcardno"
                    placeholder="aadharcard number"
                    onChange={handleChange}
                    required
                  />
                </td>
              </tr>

              <tr>
                <td>AadharCard Id:</td>
                <td colSpan="3">
                  <input
                    type="file"
                    name="aadharcardid"
                    onChange={handleImage}
                    required
                  />
                </td>
              </tr>

              <tr>
                <td>PanCard No:</td>
                <td colSpan="3">
                  <input
                    type="text"
                    name="pancardno"
                    placeholder="pancard number"
                    onChange={handleChange}
                    required
                  />
                </td>
              </tr>

              <tr>
                <td>Pancard Id:</td>
                <td colSpan="3">
                  <input
                    type="file"
                    name="pancardid"
                    onChange={handleImage}
                    required
                  />
                </td>
              </tr>

              <tr>
                <td>User Image:</td>
                <td colSpan="3">
                  <input
                    type="file"
                    name="userimg"
                    onChange={handleImage}
                    required
                  />
                </td>
              </tr>

              <tr>
                <td>Signeid:</td>
                <td colSpan="3">
                  <input
                    type="file"
                    name="signeid"
                    onChange={handleImage}
                    required
                  />
                </td>
              </tr>

              <tr>
                <td>Age:</td>
                <td colSpan="3">
                  <input
                    type="number"
                    name="age"
                    placeholder="age"
                    onChange={handleChange}
                    required
                  />
                </td>
              </tr>

              <tr>
                <td>Full Address:</td>
                <td colSpan="3">
                  <input
                    type="text"
                    name="address"
                    placeholder="address"
                    onChange={handleChange}
                    required
                  />
                </td>
              </tr>

              <tr>
                <td>Nominee Details:</td>
              </tr>

              <tr>
                <td>Nominee Name:</td>
                <td colSpan="3">
                  <input
                    type="text"
                    name="nominee_name"
                    placeholder="name"
                    onChange={handleChangeN}
                    required
                  />
                </td>
              </tr>

              <tr>
                <td>Email:</td>
                <td colSpan="3">
                  <input
                    type="email"
                    name="nominee_email"
                    placeholder="email"
                    onChange={handleChangeN}
                    required
                  />
                </td>
              </tr>

              <tr>
                <td>Contact Number:</td>
                <td colSpan="3">
                  <input
                    type="text"
                    name="nominee_contactNumber"
                    placeholder="contact number"
                    onChange={handleChangeN}
                  />
                </td>
              </tr>

              <tr>
                <td>Relationship:</td>
                <td>
                  <input
                    type="text"
                    name="nominee_relationship"
                    placeholder="relationship"
                    onChange={handleChangeN}
                  />
                </td>

                <td>Nominee Signeid:</td>
                <td>
                  <input
                    type="file"
                    name="nominee_signeid"
                    onChange={handleImageN}
                  />
                </td>
              </tr>

              <tr>
                <td>Nominee Address:</td>
                <td colSpan="3">
                  <input
                    type="text"
                    name="nominee_address"
                    placeholder="nominee address"
                    onChange={handleChangeN}
                  />
                </td>
              </tr>

              <tr>
                <td colSpan="4">
                  <button type="submit">Submit</button>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    </div>
  );
}
