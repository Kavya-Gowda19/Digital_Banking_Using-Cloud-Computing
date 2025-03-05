import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';  // Import the back arrow icon

export default function FormforCB() {
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));

        // Clear error messages as user types
        setErrors((prevState) => ({
            ...prevState,
            [name]: '',
        }));
    };

    // Validation function
    const validateForm = () => {
        let formIsValid = true;
        const newErrors = {};

        // Validate Name (only alphabets and not empty)
        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
            formIsValid = false;
        } else if (!/^[A-Za-z\s]+$/.test(formData.name)) {
            newErrors.name = 'Name should contain only alphabets';
            formIsValid = false;
        }

        // Validate Account Number (should be exactly 14 digits)
        if (!formData.accountno.trim()) {
            newErrors.accountno = 'Account Number is required';
            formIsValid = false;
        } else if (!/^\d{14}$/.test(formData.accountno)) {
            newErrors.accountno = 'Account Number must be 14 digits';
            formIsValid = false;
        }

        // Validate IFSC Code (should start with 'BAR' and be 11 characters long)
      // IFSC Code validation: Must start with "BAR" and can have any alphanumeric characters afterward
if (formData.IFSC_code && !/^BAR[A-Za-z0-9]{4,10}$/.test(formData.IFSC_code)) {
    newErrors.IFSC_code = 'IFSC Code must start with "BAR" and contain 4 to 10 alphanumeric characters afterward';
    formIsValid = false;
  }
  

        setErrors(newErrors);
        return formIsValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate the form before submitting
        if (!validateForm()) {
            return; // If validation fails, stop the form submission
        }

        try {
            // Sending data to the backend
            const response = await axios.post('http://localhost:8081/deposit/amount', formData);
            console.log(response.data.balance.OpBalance, "jjjjjjjjjjjjj");

            // Assuming that success responses are in the 200 range
            if (response.data && response.data.balance) {
                console.log(response.data, "jjjjjjjjjjjjj");
                const amount = response.data.balance.OpBalance;

                navigate(`/checkbalance/${amount}`);
            } else if (response.data && response.data.message) {
                // Handle any error message sent from the backend
                Swal.fire('Error', response.data.message, 'error');
            } else {
                // Handle unexpected responses from the backend
                Swal.fire('Error', 'Unexpected response from the server. Please try again.', 'error');
            }
        } catch (error) {
            console.error(error);
            Swal.fire('Error', 'There was an issue sending your message. Please try again later.', 'error');
        }
    };

    return (
        <div style={styles.formContainer}>
             <div style={styles.headingContainer}>
               
                <h1 style={styles.heading}>Balance Check</h1>
            </div>
            <form onSubmit={handleSubmit} style={styles.form}>
                {/* Back Button inside the form */}
                <button
                    onClick={() => navigate(-1)}
                    style={styles.backButton}
                    type="button"  // Prevents form submission when clicked
                >
                    <ArrowBackIcon style={styles.backIcon} /> Back
                </button><br/><br/>

                <div style={styles.inputGroup}>
                    <label style={styles.label}>
                        Name <span style={styles.required}>*</span>
                    </label>
                    <input
                        type="text"
                        name="name"
                        placeholder="John"
                        value={formData.name}
                        onChange={handleChange}
                        style={styles.input}
                        required
                    />
                    {errors.name && <span style={styles.error}>{errors.name}</span>}
                </div>
                <div style={styles.inputGroup}>
                    <label style={styles.label}>
                        Account Number <span style={styles.required}>*</span>
                    </label>
                    <input
                        type="tel"
                        name="accountno"
                        placeholder="Account Number"
                        value={formData.accountno}
                        onChange={handleChange}
                        style={styles.input}
                        required
                    />
                    {errors.accountno && <span style={styles.error}>{errors.accountno}</span>}
                </div>
                <div style={styles.inputGroup}>
                    <label style={styles.label}>IFSC Code</label>
                    <input
                        type="text"
                        name="IFSC_code"
                        placeholder="IFSC Code"
                        value={formData.IFSC_code}
                        onChange={handleChange}
                        style={styles.input}
                    />
                    {errors.IFSC_code && <span style={styles.error}>{errors.IFSC_code}</span>}
                </div>
                <button type="submit" style={styles.button}>
                    Submit
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
    form: {
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        maxWidth: '600px',
        width: '80%',
        position: 'relative', // Ensure back button can be positioned correctly
    },
    backButton: {
        position: 'absolute',  // Position it relative to the form
        top: '10px',
        left: '10px',
        backgroundColor: 'transparent',
        border: 'none',
        cursor: 'pointer',
        fontSize: '16px',
        color: '#007bff',
        padding: '5px',
    },
    backIcon: {
        fontSize: '20px',
        marginRight: '5px',
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
