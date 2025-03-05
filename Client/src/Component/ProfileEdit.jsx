import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function ProfileEdit() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    accountno: '',
    IFSC_code: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    accountno: '',
    IFSC_code: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setErrors((prevState) => ({
      ...prevState,
      [name]: '',
    }));
  };

  const validateForm = () => {
    let formIsValid = true;
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      formIsValid = false;
    } else if (!/^[A-Za-z\s]+$/.test(formData.name)) {
      newErrors.name = 'Name should contain only alphabets and spaces';
      formIsValid = false;
    }

    if (!formData.accountno.trim()) {
      newErrors.accountno = 'Account Number is required';
      formIsValid = false;
    } else if (!/^\d{14}$/.test(formData.accountno)) {
      newErrors.accountno = 'Account Number must be exactly 14 digits';
      formIsValid = false;
    }

    if (formData.IFSC_code && !/^BAR[A-Za-z0-9]{4,10}$/.test(formData.IFSC_code)) {
      newErrors.IFSC_code = 'IFSC Code must start with "BAR" and contain 4 to 10 alphanumeric characters afterward';
      formIsValid = false;
    }

    setErrors(newErrors);
    return formIsValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);

    try {
      const token = JSON.parse(localStorage.getItem('UserToken'));

      const response = await axios.put(
        'http://localhost:8081/user/update',
        formData,
        { headers: { 'auth-token': token } }
      );

      if (response.data.success) {
        Swal.fire('Success', response.data.message || 'Account details updated successfully!', 'success');
        navigate('/profile');
      } else {
        Swal.fire('Error', response.data.message || 'There was an issue updating your details.', 'error');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'There was an issue updating your details. Please try again later.';
      Swal.fire('Error', errorMessage, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.formContainer}>
      <div style={styles.backContainer}>
        <ArrowBackIcon style={styles.backIcon} onClick={() => navigate(-1)} />
      </div>
      <div style={styles.headingContainer}>
        <h1 style={styles.heading}>Add Account Details</h1>
      </div>
      <form onSubmit={handleSubmit} style={styles.form}>
        {/* Form Fields */}
        <div style={styles.inputGroup}>
          <label style={styles.label}>Account Holder Name <span style={styles.required}>*</span></label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} style={styles.input} required />
          {errors.name && <span style={styles.error}>{errors.name}</span>}
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Account Number <span style={styles.required}>*</span></label>
          <input type="tel" name="accountno" value={formData.accountno} onChange={handleChange} style={styles.input} required />
          {errors.accountno && <span style={styles.error}>{errors.accountno}</span>}
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>IFSC Code</label>
          <input type="text" name="IFSC_code" value={formData.IFSC_code} onChange={handleChange} style={styles.input} />
          {errors.IFSC_code && <span style={styles.error}>{errors.IFSC_code}</span>}
        </div>
        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
}

const styles = {
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f4f4f4',
  },
  backContainer: {
    alignSelf: 'flex-start',
    margin: '10px',
  },
  backIcon: {
    fontSize: '30px',
    cursor: 'pointer',
    color: '#007bff',
  },
  headingContainer: {
    marginBottom: '20px',
  },
  heading: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  form: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    maxWidth: '600px',
    width: '80%',
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
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    marginBottom: '10px',
  },
  button: {
    backgroundColor: '#007bff',
    color: '#fff',
    padding: '10px 15px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    width: '100%',
  },
  error: {
    color: 'red',
    fontSize: '12px',
  },
};
