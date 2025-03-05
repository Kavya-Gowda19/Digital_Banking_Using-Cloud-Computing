import React, { useState,useEffect } from 'react'
import '../css/recharge.css';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

export default function Recharge() {
    const navigate = useNavigate(); // Hook to handle navigation
    const [formData, setFormData] = useState({
        Sim_type: '',
        Contact_no: '',
        Amount: '',
    });

    const [errors, setErrors] = useState({});
    const [responseMessage, setResponseMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: '' });
        setResponseMessage('');
        setSuccessMessage('');
    };

    // Validate form fields
    const validate = () => {
        let validationErrors = {};

        if (!formData.Sim_type) {
            validationErrors.Sim_type = 'Please select an operator.';
        }

        if (!formData.Contact_no || !/^\d{10}$/.test(formData.Contact_no)) {
            validationErrors.Contact_no = 'Please enter a valid 10-digit contact number.';
        }

        if (!formData.Amount || isNaN(formData.Amount) || parseFloat(formData.Amount) <= 0) {
            validationErrors.Amount = 'Please enter a valid recharge amount greater than 0.';
        }

        setErrors(validationErrors);
        return Object.keys(validationErrors).length === 0;
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validate()) {
            return;
        }

        try {
            const token = JSON.parse(localStorage.getItem('UserToken'));
            const response = await axios.post('http://localhost:8081/recharge/insert', formData, {
                headers: { 'auth-token': token }
            });

            setSuccessMessage(response.data.message); // Display success message from backend

            // SweetAlert for success
            Swal.fire({
                icon: 'success',
                title: 'Recharge Successful',
                text: response.data.message || 'Recharge was successful.',
                confirmButtonText: 'Okay',
            });
            navigate('/services'); // Navigate to services page on success
        } catch (error) {
            console.error('Error during recharge:', error);

            setResponseMessage(error.response?.data?.message || 'Recharge failed'); // Display backend error

            // SweetAlert for error
            Swal.fire({
                icon: 'error',
                title: 'Recharge Failed',
                text: error.response?.data?.message || 'There was an error processing the recharge.',
                confirmButtonText: 'Retry',
            });
        }
    };

    // Handle back navigation
    const handleBackClick = () => {
        navigate(-1); // Go back one step in the history
    };

const [data, setData] = useState([]);

useEffect(() => {
    const token = JSON.parse(localStorage.getItem('UserToken'));
    axios
    .get(`http://localhost:8081/recharge/view`,{
        headers: { 'auth-token': token },
    })
    .then((res) => {
        setData(res.data);
    })
    .catch((err) => {
      console.error('Error fetching transaction details:', err);
    });

},[])

console.log(data, "datadata")

    return (
        <div className="dth-container">
            <header className="dth-header">
                <button className="back-button" onClick={handleBackClick}>←</button>
                <h1>Recharge</h1>
            </header>

            <form className="dth-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="sim-type">Operator</label>
                    <select
                        name="Sim_type"
                        id="sim-type"
                        value={formData.Sim_type}
                        onChange={handleChange}
                    >
                        <option value="">Select Operator</option>
                        <option value="Airtel">Airtel</option>
                        <option value="Jio">Jio</option>
                        <option value="BSNL">BSNL</option>
                    </select>
                    {errors.Sim_type && <p className="error-message">{errors.Sim_type}</p>}
                </div>

                <div className="form-group">
                    <label htmlFor="contact-number">Contact Number</label>
                    <input
                        type="text"
                        name="Contact_no"
                        id="contact-number"
                        value={formData.Contact_no}
                        onChange={handleChange}
                        placeholder="Enter contact number"
                    />
                    {errors.Contact_no && <p className="error-message">{errors.Contact_no}</p>}
                </div>

                <div className="form-group">
                    <label htmlFor="amount">Amount</label>
                    <input
                        type="text"
                        name="Amount"
                        id="amount"
                        value={formData.Amount}
                        onChange={handleChange}
                        placeholder="Enter recharge amount"
                    />
                    {errors.Amount && <p className="error-message">{errors.Amount}</p>}
                </div>

                <button type="submit" className="recharge-button">
                    Recharge
                </button>
            </form>

            {/* Recent Payments Section */}
            <div className="recent-payments">
                <h2>Recent Payments</h2>

                {data.slice().reverse().map((item, i) => (
    <div key={i} className="payment-card success">
        <div className="payment-details">
            <span>{item.Sim_type}</span>
            <span>₹ {item.Amount}</span>
        </div>
        <div className="payment-meta">
            <span>{new Date(item.date).toLocaleString()}</span>
            <span>{item.status || "Success"}</span>
        </div>
    </div>
))}


             

               
            </div>
        </div>
    );
}
