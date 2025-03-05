import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { Container, Box, IconButton, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function BankTransfer() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    accountno: '',
    IFSC_code: '',
    name: '',
    amount: '',
  });
  const [errors, setErrors] = useState({
    accountno: '',
    IFSC_code: '',
    name: '',
    amount: '',
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Handle account number validation (14 digits)
    if (name === 'accountno' && value.length > 14) {
      setErrors((prev) => ({
        ...prev,
        accountno: 'Account Number must be exactly 14 digits',
      }));
    } else if (name === 'accountno') {
      setErrors((prev) => ({
        ...prev,
        accountno: value.length === 14 ? '' : 'Account Number must be exactly 14 digits',
      }));

    // Handle amount validation (should not exceed 50000)
    } else if (name === 'amount') {
      setErrors((prev) => ({
        ...prev,
        amount: value > 50000 ? 'Amount should not exceed 50,000' : '',
      }));
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation checks
    let formIsValid = true;
    const newErrors = {};

    // Account number validation
    if (formData.accountno.length !== 14) {
      newErrors.accountno = 'Account Number must be exactly 14 digits';
      formIsValid = false;
    }

    // IFSC code validation (should start with 'BAR')
    if (!/^BAR[A-Za-z0-9]{4,10}$/.test(formData.IFSC_code)) {
      newErrors.IFSC_code = 'IFSC Code must start with "BAR" and contain 4 to 10 alphanumeric characters';
      formIsValid = false;
    }

    // Name validation (should not be empty)
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      formIsValid = false;
    }

    // Amount validation (should not exceed 50,000)
    if (formData.amount > 50000) {
      newErrors.amount = 'Amount should not exceed 50,000';
      formIsValid = false;
    }

    // If any validation fails, set the error state and prevent form submission
    if (!formIsValid) {
      setErrors(newErrors);
      return;
    }

    try {
      const token = JSON.parse(localStorage.getItem('UserToken'));

      const response = await axios.post('http://localhost:8081/deposit/payment', formData, {
        headers: { 'auth-token': token },
      });

      if (response) {
        Swal.fire(response.data.message);
        navigate('/');
      }
    } catch (error) {
      console.error(error);
      Swal.fire('Error', 'There was an issue sending your message. Please try again later.', 'error');
    }
  };

  // Handle back button click
  const handleBack = () => {
    navigate(-1);
  };

  return (
    <Container maxWidth="sm" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <Box sx={styles.formContainer}>
        {/* Back Button */}
        <IconButton onClick={handleBack} sx={{ position: 'absolute', left: 16, top: 16 }}>
          <ArrowBackIcon />
        </IconButton>

        <Typography variant="h4" gutterBottom align="center" sx={styles.heading}>
          Balance Transfer
        </Typography>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>
              Account Number <span style={styles.required}>*</span>
            </label>
            <input
              type="text"
              name="accountno"
              placeholder="Account Number"
              value={formData.accountno}
              onChange={handleChange}
              style={styles.input}
              required
            />
            {errors.accountno && <p style={styles.errorText}>{errors.accountno}</p>}
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>
              IFSC Code <span >*</span>
            </label>
            <input
              type="text"
              name="IFSC_code"
              placeholder="IFSC Code"
              value={formData.IFSC_code}
              onChange={handleChange}
              style={styles.input}
              required
            />
            {errors.IFSC_code && <p style={styles.errorText}>{errors.IFSC_code}</p>}
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>
              Account Holder Name <span style={styles.required}>*</span>
            </label>
            <input
              type="text"
              name="name"
              placeholder="Account Holder Name"
              value={formData.name}
              onChange={handleChange}
              style={styles.input}
              required
            />
            {errors.name && <p style={styles.errorText}>{errors.name}</p>}
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>
              Amount <span style={styles.required}>*</span>
            </label>
            <input
              type="number"
              name="amount"
              placeholder="Enter Amount"
              value={formData.amount}
              onChange={handleChange}
              style={styles.input}
              required
            />
            {errors.amount && <p style={styles.errorText}>{errors.amount}</p>}
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
