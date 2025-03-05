import React, { useState, useEffect } from "react";
import { Card, Typography, Box, IconButton } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function Reciept() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [transactionDetails, setTransactionDetails] = useState(null);
  const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));

  const { transaction, user, account } = transactionDetails || {};

  useEffect(() => {
    axios
      .get(`http://localhost:8081/deposit/get/${id}`)
      .then((res) => {
        setTransactionDetails(res.data);
      })
      .catch((err) => {
        console.error('Error fetching transaction details:', err);
      });
  }, [id]);

  const handleBack = () => {
    navigate('/services');
  };

  const generateUPITransactionID = () => {
    return Math.floor(100000000000 + Math.random() * 900000000000).toString();
  };

  const upiTransactionID = generateUPITransactionID();

  let fromDetails, toDetails;

  if (loggedUser && transaction) {
    if (user._id === loggedUser._id) {
      fromDetails = loggedUser;
      toDetails = account;
    } else {
      fromDetails = account;
      toDetails = user;
    }
  }

  // Avoid referencing undefined transaction.Amount
  const Amount = transaction ? transaction.Amount : "Loading...";

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
            position: "relative",
          }}
        >
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

          {transaction && (
            <>
              <Typography variant="body2" color="textSecondary" sx={{ my: 1 }}>
                You've successfully transferred your balance.
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
                  ₹ {Amount}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  {/* Current Balance */}
                </Typography>
              </Box>
            </>
          )}

          {/* UPI Transaction Details */}
          <Typography variant="body1" sx={{ mt: 2 }}>
            <strong>UPI Transaction ID:</strong> {upiTransactionID}
          </Typography>

          {/* From Details */}
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" color="textSecondary">
              <strong>From:</strong>
            </Typography>
            <Typography variant="body2">
              {fromDetails ? fromDetails?.name : "Unknown"}
            </Typography>

            <Typography variant="body2">
              {fromDetails ? fromDetails?.name + '@okaxis' : "Unknown"}
            </Typography>
          </Box>

          {/* To Details */}
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" color="textSecondary">
              <strong>To:</strong>
            </Typography>
            <Typography variant="body2">
              {toDetails ? toDetails?.name : "Unknown"}
            </Typography>
            <Typography variant="body2">
              {toDetails ? toDetails?.name + '@okcici' : "Unknown"}
            </Typography>
          </Box>
        </Card>
      </Box>
    </div>
  );
}
