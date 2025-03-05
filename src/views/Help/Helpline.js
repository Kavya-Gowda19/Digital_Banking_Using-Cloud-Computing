import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { View_Account, Deletehelpline , View_Helpline } from '../../global';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Link } from 'react-router-dom';
import { Box, Button } from '@mui/material';
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
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function Helpline() {

  const [display, setDisplay] = useState([]);
  const [count, setCount] = useState(false);
  
  useEffect(() => {
    View_Helpline()
      .then((res) => {
        console.log("Account Response : " + JSON.stringify(res.data));
        setDisplay(res.data);
      })
      .catch((err) => {
        console.log("Error :" + err);
      });
  }, [count]);

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
        Deletehelpline(id)
          .then((res) => {
            console.log(res);
            // Remove the deleted item from the 'display' state
            setDisplay((prevDisplay) => prevDisplay.filter((item) => item._id !== id));
            Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
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

  return (
    <div>
     

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>#</StyledTableCell>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Email</StyledTableCell>
              <StyledTableCell>Contact No</StyledTableCell>
              <StyledTableCell>Message</StyledTableCell>
              <StyledTableCell>Action</StyledTableCell>
           
            </TableRow>
          </TableHead>
          <TableBody>
            {display?.map((item, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell component="th" scope="row">
                  {index + 1}
                </StyledTableCell>
                <StyledTableCell>{item.name}</StyledTableCell>
                <StyledTableCell>{item.email}</StyledTableCell>
                <StyledTableCell>{item.phone}</StyledTableCell>
                <StyledTableCell>{item.message}</StyledTableCell>
              
                <StyledTableCell sx={{ display: 'flex' }}>
                
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
