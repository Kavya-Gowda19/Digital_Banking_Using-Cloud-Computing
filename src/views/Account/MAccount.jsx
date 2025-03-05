import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { View_Account, DeleteAccount } from '../../global';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Link } from 'react-router-dom';
import { Box, Button, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import Swal from 'sweetalert2';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function MAccount() {
  const [display, setDisplay] = useState([]);
  const [count, setCount] = useState(0); // Change to number for simpler increment tracking
  const [searchTerm, setSearchTerm] = useState(""); // State to manage search term

  // Fetch account data whenever 'count' changes
  useEffect(() => {
    View_Account()
      .then((res) => {
        console.log("Account Response : " + JSON.stringify(res.data));
        setDisplay(res.data);
      })
      .catch((err) => {
        console.log("Error :" + err);
      });
  }, [count]); // Add 'count' as a dependency

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        DeleteAccount(id)
          .then((res) => {
            console.log(res);
            Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
            setCount(prevCount => prevCount + 1); // Increment count to trigger useEffect
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  };

  // Function to format the date (show only date, not time)
  const formatDate = (date) => {
    const formattedDate = new Date(date);
    return formattedDate.toLocaleDateString(); // This will display the date in format MM/DD/YYYY
  };

  // Filter accounts based on the search term (accountno)
 const filteredAccounts = display.filter(account =>
  account.accountno && account.accountno.toLowerCase().includes(searchTerm.toLowerCase())
);


  return (
    <div>
      <Box sx={{ display: 'flex', justifyContent: 'end', mb: '10px' }}>
        <Button variant="contained" startIcon={<AddIcon />}>
          <Link to={'/maccount/add-account'} style={{ textDecoration: 'none', color: 'white' }}>
            Add Account
          </Link>
        </Button>
      </Box>

      {/* Search Bar */}
      <Box sx={{ mb: '10px' }}>
        <TextField
          label="Search by Account No"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Box>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>#</StyledTableCell>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Account No</StyledTableCell>
              <StyledTableCell>Contact No</StyledTableCell>
              <StyledTableCell>IFSC_code</StyledTableCell>
              <StyledTableCell>Amount</StyledTableCell>
              <StyledTableCell>Date</StyledTableCell>
              <StyledTableCell>Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredAccounts.map((item, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell component="th" scope="row">
                  {index + 1}
                </StyledTableCell>
                <StyledTableCell>{item.name}</StyledTableCell>
                <StyledTableCell>{item.accountno}</StyledTableCell>
                <StyledTableCell>{item.phone}</StyledTableCell>
                <StyledTableCell>{item.IFSC_code}</StyledTableCell>
                <StyledTableCell>{item.OpBalance}</StyledTableCell>
                <StyledTableCell>{formatDate(item.date)}</StyledTableCell>

                <StyledTableCell sx={{ display: 'flex' }}>
                  <Link to={`/maccount/single-account/${item._id}`}>
                    <RemoveRedEyeIcon sx={{ color: 'green' }} />
                  </Link>
                  <Link to={`/maccount/update-account/${item._id}`}>
                    <BorderColorIcon color="primary" />
                  </Link>
                  <Link to={''}>
                    <DeleteOutlineIcon onClick={() => { handleDelete(item._id); }} sx={{ color: 'red' }} />
                  </Link>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
