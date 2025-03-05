import React from 'react';
import { Card, CardContent, Typography, Box, Button } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const ElectricityBillSuccessCard = ({ amount, date, onOkClick }) => {
  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <Card
        sx={{
          maxWidth: 400,
          borderRadius: 3,
          backgroundColor: '#E3F2FD',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
          textAlign: 'center',
        }}
      >
        <CardContent>
          <Typography variant="h6" fontWeight="bold">
            Electricity Bill Paid Successfully
          </Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              mt: 2,
            }}
          >
            <Typography variant="h4" fontWeight="bold" sx={{ marginRight: 1 }}>
              ₹{amount}
            </Typography>
            <CheckCircleIcon sx={{ color: '#4CAF50', fontSize: 32 }} />
          </Box>
          <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
            on{' '}
            {new Date(date).toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </Typography>
          <Box sx={{ borderTop: '5px solid #1976D2', mt: 2 }} />
        </CardContent>
      </Card>

      {/* OK Button */}
      <Button
        variant="contained"
        sx={{ mt: 3 }}
        onClick={onOkClick}
        color="primary"
      >
        OK
      </Button>
    </Box>
  );
};

export default ElectricityBillSuccessCard;
