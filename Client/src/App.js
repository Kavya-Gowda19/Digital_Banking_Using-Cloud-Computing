import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from './pages/Main';
import About from './pages/Aout';
import MServices from './pages/MServices.jsx';
import ContactUs from './pages/ContactUs';
import Navar from './Component/Navar';
import Footer from './Component/Footer';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Mpassbook from './Component/Mpassbook.jsx';
import BankTransfer from './Component/BankTransfer.jsx';
import Transactionhistory from './Component/Transactionhistory.jsx';
import Checkbalance from './Component/Checkbalance.jsx';
import FormforCB from './Component/FormforCB.jsx';
import Profile from './pages/Profile.jsx';
import ProfileEdit from './Component/ProfileEdit.jsx';
import Reciept from './Component/Reciept.jsx';
import Elecytricity from './Component/Elecytricity.jsx';
import ElectricityBillSuccessCard from './Component/ElectricityBillSuccessCard.jsx'
import Recharge from './Component/Recharge.jsx';
function App() {
  return (
    <div>
      <BrowserRouter>
      
      <Routes>
        <Route path='/' element={<Main/>} />
        <Route path='/profile' element={<Profile/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/services' element={<MServices/>} />
        <Route path='/ContactUs' element={<ContactUs/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/mpassbook' element={<Mpassbook/>} />
        <Route path='/mtransfer' element={<BankTransfer/>} />
        <Route path='/transactionhistory' element={<Transactionhistory/>} />
        <Route path='/checkbalance/:amount' element={<Checkbalance/>} />
        <Route path='/formforCB' element={<FormforCB/>} />
        <Route path='/Editprofile' element={<ProfileEdit/>} />
        <Route path='/Reciept/:id' element={<Reciept/>} />
        <Route path='/electricity' element={<Elecytricity/>} />
        <Route path='/confirmation/:amount' element={<ElectricityBillSuccessCard/>} />
        <Route path='/recharge' element={<Recharge/>} />

        </Routes>
        
        </BrowserRouter>
    </div>
  );
}



export default App;
