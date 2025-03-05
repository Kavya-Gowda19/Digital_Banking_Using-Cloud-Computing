
import React, { useState, useEffect } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import { Insert_Account } from '../../global';
import axios from 'axios';
  import { useParams,useNavigate } from 'react-router-dom';

import {
  Box,
  Button,
  TextField,
  FormControl,
  Typography,
  Select,
  MenuItem,
  InputLabel
} from '@mui/material';
export default function UpdateAccount() {

    const host = "http://localhost:8081";
    const { id } = useParams();
    const navigate = useNavigate();
  
    // State to handle form data
    const [account, setAccount] = useState({
      type: '',
      OpBalance: '',
      name: '',
      phone: '',
      aadharcardno: '',
      email: '',
      pancardno: '',
      address: '',
      age: '',
    });
  
    const [Naccount, setNAccount] = useState({
      nominee: {
        nominee_name: '',
        nominee_email: '',
        nominee_contactNumber: '',
        nominee_relationship: '',
        nominee_address: '',
      }
    });
  
    const [image, setImage] = useState({
      aadharcardid: '',
      pancardid: '',
      signeid: '',
      userimg: '',
    });
  
    const [imagen, setImageN] = useState({
      nominee: {
        nominee_signeid: '',
      }
    });
  
    const [errors, setErrors] = useState({});
  
    // Fetch existing data and populate the form
    useEffect(() => {
      axios.get(`${host}/account/singleView/${id}`)
        .then((res) => {
          const data = res.data.data;
          setAccount({
            type: data.type,
            OpBalance: data.OpBalance,
            name: data.name,
            phone: data.phone,
            aadharcardno: data.aadharcardno,
            email: data.email,
            pancardno: data.pancardno,
            address: data.address,
            age: data.age,
          });
          setNAccount({
            nominee: {
              nominee_name: data.nominee?.nominee_name,
              nominee_email: data.nominee?.nominee_email,
              nominee_contactNumber: data.nominee?.nominee_contactNumber,
              nominee_relationship: data.nominee?.nominee_relationship,
              nominee_address: data.nominee?.nominee_address,
            }
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }, [id, host]);
  
    // Validation Function
    const validate = () => {
      const newErrors = {};
  
      // Validation for type and OpBalance
      if (!account.type) newErrors.type = 'Transaction type is required';
      if (!account.OpBalance || isNaN(account.OpBalance) || account.OpBalance <= 500) {
        newErrors.OpBalance = 'Opening balance must be a valid number and at least 500';
      }
  
      // Basic validation for other fields
      if (!account.name) newErrors.name = 'Name is required';
      if (!account.phone || !/^\d{10}$/.test(account.phone)) {
        newErrors.phone = 'Phone number must be 10 digits';
      }
      if (!account.aadharcardno || !/^\d{12}$/.test(account.aadharcardno)) {
        newErrors.aadharcardno = 'Aadhar card number must be 12 digits';
      }
      if (!account.email || !/\S+@\S+\.\S+/.test(account.email)) {
        newErrors.email = 'Email is not valid';
      }
      if (!account.age || isNaN(account.age) || account.age <= 0) {
        newErrors.age = 'Age must be a positive number';
      }
      if (!account.address) newErrors.address = 'Address is required';
  
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };
  
    // Form input handlers
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
  
    // Submit handler for update
    const onSubmit = (e) => {
      e.preventDefault();
  
      if (!validate()) {
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
  
      // Append nominee data
      formData.append('nominee_name', Naccount.nominee.nominee_name || '');
      formData.append('nominee_email', Naccount.nominee.nominee_email || '');
      formData.append('nominee_contactNumber', Naccount.nominee.nominee_contactNumber || '');
      formData.append('nominee_relationship', Naccount.nominee.nominee_relationship || '');
      formData.append('nominee_address', Naccount.nominee.nominee_address || '');
      formData.append('nominee_signeid', imagen.nominee.nominee_signeid || '');
  
      axios
        .put(`${host}/account/update/${id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        })
        .then((res) => {
          if (res.data) {
            console.log(res.data, "data updated");
            // Navigate to another page if needed
            navigate('/maccount/view-account');
          } else {
            console.log("Some error occurred during update");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }; 

    console.log(account,"aaaaaa")

  return (
    <div>
       <MainCard title="Add Account Details">
        <FormControl>
          <Box
            sx={{
              '& .MuiTextField-root': { m: 1, width: '50ch' }
            }}
          >
            {/* Type Dropdown */}
            <FormControl sx={{ m: 1, width: '50ch' }}>
              <InputLabel>Type</InputLabel>
              <Select
                value={account.type}
                name="type"
                onChange={handleChange}
                error={!!errors.type}
              >
                <MenuItem value="Saving">Saving</MenuItem>
                <MenuItem value="Current">Current</MenuItem>
                <MenuItem value="Business">Business</MenuItem>
              </Select>
              {errors.type && (
                <Typography color="error" variant="caption">
                  {errors.type}
                </Typography>
              )}
            </FormControl>

            {/* Opening Balance */}
            <TextField
              type="number"
              onChange={handleChange}
              label="Opening Balance"
              name="OpBalance"
              variant="outlined"
              value={account?.OpBalance}
              error={!!errors.OpBalance}
              helperText={errors.OpBalance}
            />

            {/* Existing fields */}
            <TextField
              type="text"
              onChange={handleChange}
              label="Name"
              name="name"
              value={account?.name}
              variant="outlined"
              error={!!errors.name}
              helperText={errors.name}
            />
            <TextField
              type="tel"
              onChange={handleChange}
              label="Phone"
              value={account?.phone}
              name="phone"
              variant="outlined"
              error={!!errors.phone}
              helperText={errors.phone}
            />
             <TextField
              type="file"
              onChange={handleImage}
              label="User Image"
              name="userimg"
              variant="outlined"
            />
            <TextField
              type="tel"
              onChange={handleChange}
              label="Aadhar Card No"
              value={account?.aadharcardno}
              name="aadharcardno"
              variant="outlined"
              error={!!errors.aadharcardno}
              helperText={errors.aadharcardno}
            />
            <TextField
              type="file"
              onChange={handleImage}
              label="Aadhar Card ID"
              name="aadharcardid"
              variant="outlined"
            />
                      {/* Email Field */}
                      <TextField
              type="email"
              onChange={handleChange}
              label="Email"
              name="email"
              value={account?.email}
              variant="outlined"
              error={!!errors.email}
              helperText={errors.email}
            />

            {/* Age Field */}
            <TextField
              type="number"
              onChange={handleChange}
              label="Age"
              name="age"
              value={account?.age}
              variant="outlined"
              error={!!errors.age}
              helperText={errors.age}
            />

            {/* Address Field */}
            <TextField
              type="text"
              onChange={handleChange}
              label="Address"
              name="address"
              value={account?.address}
              variant="outlined"
              error={!!errors.address}
              helperText={errors.address}
            />

            {/* PAN Card No Field */}
            <TextField
              type="text"
              onChange={handleChange}
              label="PAN Card No"
              value={account?.pancardno}
              name="pancardno"
              variant="outlined"
            />

            {/* PAN Card ID File Upload */}
            <TextField
              type="file"
              onChange={handleImage}
              label="PAN Card ID"
              name="pancardid"
              variant="outlined"
            />

            {/* Signature ID File Upload */}
            <TextField
              type="file"
              onChange={handleImage}
              label="Signature ID"
              name="signeid"
              variant="outlined"
            />
          </Box>
        </FormControl>

        {/* Nominee Details */}
        <MainCard title="Nominee Details">
          <FormControl>
            <Box
              sx={{
                '& .MuiTextField-root': { m: 1, width: '50ch' }
              }}
            >
              {/* Nominee Name Field */}
              <TextField
                type="text"
                onChange={handleChangeN}
                label="Nominee Name"
                name="nominee_name"
                value={Naccount?.nominee?.nominee_name}
                variant="outlined"
              />

              {/* Nominee Email Field */}
              <TextField
                type="email"
                onChange={handleChangeN}
                label="Nominee Email"
                name="nominee_email"
                value={Naccount?.nominee?.nominee_email}
                variant="outlined"
              />

              {/* Nominee Contact Number */}
              <TextField
                type="tel"
                onChange={handleChangeN}
                label="Nominee Contact Number"
                name="nominee_contactNumber"
                value={Naccount?.nominee?.nominee_contactNumber}
                variant="outlined"
              />

              {/* Nominee Relationship */}
              <TextField
                type="text"
                onChange={handleChangeN}
                label="Nominee Relationship"
                value={Naccount?.nominee?.nominee_relationship}
                name="nominee_relationship"
                variant="outlined"
              />

              {/* Nominee Address */}
              <TextField
                type="text"
                onChange={handleChangeN}
                label="Nominee Address"
                value={Naccount?.nominee?.nominee_address}

                name="nominee_address"
                variant="outlined"
              />

              {/* Nominee Signature ID File Upload */}
              <TextField
                type="file"
                onChange={handleImageN}
                label="Nominee Signature ID"
                name="nominee_signeid"
                variant="outlined"
              />
            </Box>
          </FormControl>
        </MainCard>

        {/* Submit Button */}
        <Box sx={{ mt: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={onSubmit}
          >
            Submit
          </Button>
        </Box>
      </MainCard>
    </div>
  )
}
