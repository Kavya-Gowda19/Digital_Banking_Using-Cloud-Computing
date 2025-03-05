import React, { useState, useEffect } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import { Insert_Deposit, View_Account } from '../../global';
import {
  Box,
  Button,
  TextField,
  FormControl,
  Autocomplete, 
  FormHelperText, 
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Deposit() {
  const navigate = useNavigate();
  
  const [data, setData] = useState({});
  const [accounts, setAccounts] = useState([]);
  const [filteredAccounts, setFilteredAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [count, setCount] = useState(false);
  
  const [errors, setErrors] = useState({ accountno: '', Amount: '' }); // Track errors

  useEffect(() => {
    // Fetch account details when the component mounts
    View_Account()
      .then((res) => {
        setAccounts(res.data);
        setFilteredAccounts(res.data);
      })
      .catch((err) => {
        console.log('Error :' + err);
      });
  }, [count]);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSearchAndSelect = (event, value) => {
    const selected = accounts.find((account) => account.accountno === value?.accountno);
    if (selected) {
      setSelectedAccount(selected);
      setData({ ...data, _id: selected._id, accountno: selected.accountno, name: selected.name });
      setErrors({ ...errors, accountno: '' }); // Clear accountno error when account is selected
    }
  };

  const validateForm = () => {
    let valid = true;
    let tempErrors = { accountno: '', Amount: '' };

    // Validate account number
    if (!data.accountno) {
      tempErrors.accountno = 'Please select an account number.';
      valid = false;
    }

    // Validate deposit amount
    if (!data.Amount || isNaN(data.Amount) || data.Amount <= 0) {
      tempErrors.Amount = 'Please enter a valid deposit amount greater than zero.';
      valid = false;
    }

    setErrors(tempErrors);
    return valid;
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      Insert_Deposit({ _id: data._id, Amount: data.Amount })
        .then((res) => {
          console.log('Deposit successful:', res);
          alert(res.data.message);
          setCount(true);
          navigate('/maccount/view-account');
        })
        .catch((error) => {
          console.log('Error :' + error);
        });
    } else {
      console.log('Form validation failed.');
    }
  };

  return (
    <div>
      <MainCard title="Manage Deposit">
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
              error={!!errors.accountno}
              helperText={errors.accountno}
            />
          )}
        />

        {/* User Name and Deposit Amount Fields */}
        <FormControl>
          <Box
            sx={{
              '& .MuiTextField-root': { m: 1, width: '50ch' },
            }}
          >
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

        <FormControl>
          <Box
            sx={{
              '& .MuiTextField-root': { m: 1, width: '105ch' },
            }}
          >
            <TextField
              id="deposit-amount"
              onChange={handleChange}
              label="Deposit Amount"
              name="Amount"
              variant="outlined"
              error={!!errors.Amount}
              helperText={errors.Amount}
            />
          </Box>
        </FormControl>

        <br />
        <br />
        <Box>
          <Button variant="contained" onClick={onSubmit} disableElevation fullWidth>
            Deposit
          </Button>
        </Box>
      </MainCard>
    </div>
  );
}
