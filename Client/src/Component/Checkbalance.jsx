import React from "react";
import { Card, Typography, Box, IconButton } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, useParams } from "react-router-dom"; // Import useNavigate for routing

export default function Checkbalance() {
  const { amount } = useParams(); // Correctly use useParams to extract amount
  const navigate = useNavigate(); // Hook to navigate between pages

  // Validate if amount is a valid number
  const validAmount = !isNaN(amount) && amount > 0;

  const handleBack = () => {
    navigate('/services'); // Navigate back to the previous page
  };

  return (
    <div>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        bgcolor="#f4f6f8"
      >
        <Card
          sx={{
            width: "320px",
            textAlign: "center",
            boxShadow: 3,
            borderRadius: 2,
            padding: 2,
            backgroundColor: "#ffffff",
            position: "relative", // To position the back button inside the card
          }}
        >
          {/* Back button */}
          <IconButton
            sx={{
              position: "absolute",
              top: 10,
              left: 10,
              color: "#007bff",
            }}
            onClick={handleBack}
          >
            <ArrowBackIcon />
          </IconButton>

          <CheckCircleIcon
            sx={{ fontSize: 60, color: "#007bff", marginBottom: 2 }}
          />
          <Typography variant="h5" fontWeight="bold" color="#007bff">
            Success
          </Typography>
          {validAmount ? (
            <>
              <Typography variant="body2" color="textSecondary" sx={{ my: 1 }}>
                You've successfully checked your balance.
              </Typography>
              <Box
                sx={{
                  backgroundColor: "#f2f8ff",
                  borderRadius: 1,
                  padding: 1,
                  marginTop: 2,
                }}
              >
                <Typography
                  variant="h4"
                  fontWeight="bold"
                  color="#007bff"
                  sx={{ mb: 0.5 }}
                >
                  ₹{amount}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  Current Balance
                </Typography>
              </Box>
            </>
          ) : (
            // If the amount is invalid or not available, show an error message
            <Typography variant="body2" color="error" sx={{ my: 1 }}>
              Invalid amount or balance not available.
            </Typography>
          )}
        </Card>
      </Box>
    </div>
  );
}
