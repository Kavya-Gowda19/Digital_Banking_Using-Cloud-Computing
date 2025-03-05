import React, { useState, useEffect } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import { Insert_withdraw, View_Account } from '../../global';
import {
  Box,
  Button,
  TextField,
  FormControl,
  Autocomplete,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Withdrawa() {
  const navigate = useNavigate();

  const [data, setData] = useState({});
  const [accounts, setAccounts] = useState([]); // Store all accounts
  const [filteredAccounts, setFilteredAccounts] = useState([]); // Store filtered accounts based on search
  const [selectedAccount, setSelectedAccount] = useState(null); // Store selected account info
  const [count, setCount] = useState(false);
  const [error, setError] = useState(''); // State for error messages

  useEffect(() => {
    // Fetch account details when the component mounts
    View_Account()
      .then((res) => {
        console.log('Account Response : ' + JSON.stringify(res.data));
        setAccounts(res.data); // Store the fetched accounts
        setFilteredAccounts(res.data); // Initialize filtered accounts with all accounts
      })
      .catch((err) => {
        console.log('Error :' + err);
      });
  }, [count]);

  // Handle input changes for other fields
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  // Handle search and account selection
  const handleSearchAndSelect = (event, value) => {
    const selected = accounts.find((account) => account.accountno === value?.accountno);
    if (selected) {
      setSelectedAccount(selected);
      // Store the selected _id and account details in data
      setData({ ...data, _id: selected._id, accountno: selected.accountno, name: selected.name });
    }
  };

  // Validation function
  const validateForm = () => {
    if (!data.accountno) {
      setError('Account number is required.');
      return false;
    }
    if (!data.Amount || isNaN(data.Amount)) {
      setError('Valid deposit amount is required.');
      return false;
    }
    if (data.Amount <= 0) {
      setError('Amount must be greater than zero.');
      return false;
    }
    if (data.Amount > 50000) {
      setError('Withdrawal amount cannot exceed ₹50,000.');
      return false;
    }
    if (selectedAccount && data.Amount > selectedAccount.OpBalance) {
      setError('Withdrawal amount cannot exceed the available balance.');
      return false;
    }
    setError('');
    return true;
  };
  

  // Handle form submission
  const onSubmit = (e) => {
    e.preventDefault();
  
    if (!validateForm()) return; // Stop if validation fails
  
    // Ensure that _id and deposit amount are present before sending the request
    if (data._id && data.Amount) {
      Insert_withdraw({ _id: data._id, Amount: data.Amount })
        .then((res) => {
          console.log('Withdraw successful:', res);
          alert(res.data.message); // Display success message from backend
          setCount(true);
          navigate('/maccount/view-account');
        })
        .catch((error) => {
          if (error.response && error.response.data) {
            // Display backend error message
            alert(`Error: ${error.response.data.message}`);
          } else {
            // Display a generic error message if no backend message is available
            alert('An unexpected error occurred.');
          }
          console.error('Error:', error);
        });
    } else {
      alert('Please select an account and enter a valid withdrawal amount.');
    }
  };
  

  return (
    <div>
      <MainCard title="Manage Withdraw">
        {/* Account Search Field */}
        <Autocomplete
          options={filteredAccounts}
          getOptionLabel={(option) => option.accountno.toString()}
          value={selectedAccount}
          onChange={handleSearchAndSelect}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search Account No"
              variant="outlined"
              placeholder="Search by account number"
              sx={{ m: 1, width: '50ch', mt: 3 }}
            />
          )}
        />

        {/* User Name and Account Balance */}
        <FormControl>
          <Box sx={{ '& .MuiTextField-root': { m: 1, width: '50ch' } }}>
            <TextField
              id="user-name"
              value={selectedAccount?.name || data.name || ''}
              label="User Name"
              name="name"
              variant="outlined"
              disabled
            />
            <TextField
              id="user-balance"
              value={selectedAccount?.OpBalance || data.OpBalance || ''}
              label="Balance"
              name="OpBalance"
              variant="outlined"
              disabled
            />
          </Box>
        </FormControl>

        {/* Withdrawal Amount Field */}
        <FormControl>
          <Box sx={{ '& .MuiTextField-root': { m: 1, width: '105ch' } }}>
            <TextField
              id="withdraw-amount"
              onChange={handleChange}
              label="Withdraw Amount"
              name="Amount"
              variant="outlined"
              error={!!error} // Show error state if there's an error
              helperText={error} // Display the error message
            />
          </Box>
        </FormControl>

        <br />
        <br />
        <Box>
          <Button variant="contained" onClick={onSubmit} disableElevation fullWidth>
            Withdraw
          </Button>
        </Box>
      </MainCard>
    </div>
  );
}
