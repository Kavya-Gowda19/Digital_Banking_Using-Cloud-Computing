import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { Container, Box, IconButton, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function Electricity() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    RRR_no: '',
    date: '',
    Amount: '',
  });

  const [errors, setErrors] = useState({
    RRR_no: '',
    date: '',
    Amount: '',
  });

  // Handle back button click
  const handleBack = () => {
    navigate(-1);
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Simple validation logic
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: value ? '' : `${name} is required.`,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validate form fields
    const newErrors = {};
    if (!formData.RRR_no) newErrors.RRR_no = 'RRR No is required.';
    if (!formData.date) newErrors.date = 'Date is required.';
    if (!formData.Amount) newErrors.Amount = 'Amount is required.';
  
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
  
    try {
      const token = JSON.parse(localStorage.getItem('UserToken'));
      const response = await axios.post('http://localhost:8081/electricity/insert', formData, {
        headers: { 'auth-token': token },
      });
  
      // Display success message if the response is successful
      Swal.fire('Success', response.data.message || 'Electricity bill paid successfully!', 'success');
      navigate('/services'); // Redirect to confirmation page
    } catch (error) {
      // Handle errors based on the server's response
      if (error.response && error.response.data) {
        Swal.fire('Error', error.response.data.message || 'Failed to pay the bill. Please try again.', 'error');
      } else {
        Swal.fire('Error', 'An unexpected error occurred. Please try again.', 'error');
      }
    }
  };
  

  return (
    <Container maxWidth="sm" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <Box sx={styles.formContainer}>
        <IconButton onClick={handleBack} sx={{ position: 'absolute', left: 16, top: 16 }}>
          <ArrowBackIcon />
        </IconButton>

        <Typography variant="h4" gutterBottom align="center" sx={styles.heading}>
          Electricity Bill
        </Typography>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>
              RRR No <span style={styles.required}>*</span>
            </label>
            <input
              type="text"
              name="RRR_no"
              placeholder="RRR Number"
              value={formData.RRR_no}
              onChange={handleChange}
              style={styles.input}
            />
            {errors.RRR_no && <p style={styles.errorText}>{errors.RRR_no}</p>}
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>
              Date <span style={styles.required}>*</span>
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              style={styles.input}
            />
            {errors.date && <p style={styles.errorText}>{errors.date}</p>}
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>
              Amount <span style={styles.required}>*</span>
            </label>
            <input
              type="number"
              name="Amount"
              placeholder="Enter Amount"
              value={formData.Amount}
              onChange={handleChange}
              style={styles.input}
            />
            {errors.Amount && <p style={styles.errorText}>{errors.Amount}</p>}
          </div>

          <button type="submit" style={styles.button}>
            Submit
          </button>
        </form>
      </Box>
    </Container>
  );
}

const styles = {
  formContainer: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    maxWidth: '600px',
    width: '100%',
    position: 'relative',
  },
  heading: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#333',
  },
  form: {
    marginTop: '20px',
  },
  inputGroup: {
    marginBottom: '15px',
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    fontWeight: 'bold',
  },
  required: {
    color: 'red',
  },
  input: {
    width: '100%',
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    marginBottom: '10px',
  },
  button: {
    backgroundColor: '#007bff',
    color: '#fff',
    padding: '12px 20px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    width: '100%',
  },
  errorText: {
    color: 'red',
    fontSize: '12px',
    marginTop: '5px',
  },
};
