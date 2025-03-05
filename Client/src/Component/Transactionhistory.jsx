import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Box, Grid, IconButton } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function TransactionHistory() {
  const [display, setDisplay] = useState([]);
  const [totalBalance, setTotalBalance] = useState(0); // Track the total balance (OpBalance)
  const [userId, setUserId] = useState(null); // Store the logged-in user ID
  useEffect(() => {
    // Retrieve the token and userId from localStorage
    const token = JSON.parse(localStorage.getItem('UserToken'));
    const user = JSON.parse(localStorage.getItem('loggedUser'));
  
    if (user) {
      setUserId(user._id); // Set the logged-in user's ID
    }
  
    // Fetch transaction data
    axios
      .get('http://localhost:8081/deposit/transaction', { headers: { 'auth-token': token } })
      .then((res) => {
        console.log('Account Response:', res.data);
  
        if (Array.isArray(res.data)) {
          // Filter out only the 'payment' transactions
          const paymentTransactions = res.data.filter(transaction => transaction.type === 'payment');
          setDisplay(paymentTransactions); // Set the filtered data to display
  
          // Calculate the OpBalance based on the filtered transactions
          let balance = 0;
          paymentTransactions.forEach((transaction) => {
            const { type, Amount, user_id } = transaction;
  
            // Check the transaction type and update balance
            if (type === 'payment') {
              if (userId !== user_id._id) {
                balance += Amount; // Add for payment when user IDs do not match
              } else {
                balance -= Amount; // Subtract for payment when user IDs match
              }
            }
          });
  
          setTotalBalance(balance); // Set the calculated total balance (OpBalance)
        } else {
          console.error('Response data is not an array:', res.data);
          setDisplay([]); // Set to an empty array to prevent further errors
        }
      })
      .catch((err) => {
        console.log('Error:', err);
      });
  }, [userId]);
  
  // Function to format the date and time
  const formatDateAndTime = (dateString) => {
    const date = new Date(dateString);
    
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);

    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    const formattedTime = `${hours}:${minutes < 10 ? '0' : ''}${minutes} ${ampm}`;

    return { formattedDate, formattedTime };
  };

  return (
    <Box p={2} style={{ backgroundColor: '#f0f0f0', minHeight: '100vh' }}>
      <Box display="flex" alignItems="center" justifyContent="center" mb={3}>
        <Link to={'/services'}>
          <IconButton
            style={{ position: 'absolute', left: 16 }}
            onClick={() => {
              console.log('Back button clicked');
            }}
          >
            <ArrowBackIosIcon />
          </IconButton>
        </Link>
        <Typography variant="h5" style={{ fontWeight: 'bold' }}>
          Transaction History
        </Typography>
      </Box>

      {/* Render transaction history */}
      {Array.isArray(display) && display.length > 0
        ? display.map((transaction, index) => {
            const { formattedDate, formattedTime } = formatDateAndTime(transaction.date);
            const { type, Amount, user_id, account_id, _id: transactionId } = transaction;

            // Determine the sign based on the type of transaction and user ID comparison
            let amountSign = '';
            if (userId !== (user_id && user_id._id)) {
              // Handle logic when the user_id is defined
              if (type === 'deposit') {
                amountSign = `+ ₹${Amount}`;
              } else if (type === 'withdrawal') {
                amountSign = `- ₹${Amount}`;
              } else if (type === 'payment') {
                amountSign = `+ ₹${Amount}`;
              }
            } else {
              // Handle logic for transactions where user_id matches
              if (type === 'deposit') {
                amountSign = `- ₹${Amount}`;
              } else if (type === 'withdrawal') {
                amountSign = `+ ₹${Amount}`;
              } else if (type === 'payment') {
                amountSign = `- ₹${Amount}`;
              }
            }

            return (
              <Card
                key={index}
                style={{
                  marginBottom: '10px',
                  borderRadius: '10px',
                  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
                }}
              >
                <CardContent>
                  <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item>
                      <Typography variant="subtitle2" color="textSecondary">
                        {formattedDate} {/* Jan 1, 2024 */}
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        {formattedTime} {/* 12:30 PM */}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Grid container alignItems="center" spacing={1}>
                        <Grid item>
                          <CreditCardIcon style={{ fontSize: '30px' }} />
                        </Grid>
                        <Grid item>
                          <Typography variant="body2">{transaction.type}</Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item>
                      <Typography variant="h6" style={{ fontWeight: 'bold' }}>
                        {amountSign}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Link to={`/reciept/${transactionId}`}> {/* Pass transactionId in URL */}
                        <IconButton>
                          <ArrowForwardIosIcon />
                        </IconButton>
                      </Link>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            );
          })
        : 'No transactions available.'}

      {/* Display the total balance (OpBalance) */}
      {/* <Box mt={3} textAlign="center">
        <Typography variant="h6" style={{ fontWeight: 'bold' }} >
          Total Balance (OpBalance): ₹{display.account_id.OpBalance}
        </Typography>
      </Box> */}
    </Box>
  );
}
