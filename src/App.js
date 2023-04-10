import './App.css';
import Navbaar from './components/header/Navbaar';
import MainComp from './components/home/MainComp';
import Newnav from './components/newnavbaar/Newnav';
import Footer from './components/footer/Footer';
import SignUp from './components/signup_signin/SignUp';
import {Sign_in}  from './components/signup_signin/Sign_in';
import { Routes, Route } from "react-router-dom";
import Cart from './components/cart/Cart';
import Buynow from './components/buynow/Buynow';
import CircularProgress from '@mui/material/CircularProgress';
import React, { useEffect, useState } from 'react'


function App() {

  const [data, setData] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setData(true);
    }, 2000);
  }, [])

  return (
    <>
    {
      data ? (
        <>
        <Navbaar />
      <Newnav />
      <Routes>
        <Route path="/" element={<MainComp />} />
        <Route path="/login" element={<Sign_in />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/getproductsone/:id" element={<Cart />} />
        <Route path="/buynow" element={<Buynow />} />
      </Routes>
      
      <Footer />
        </>
      ): (
        <div className="circle">
            <CircularProgress />
            <h2> Loading....</h2>
          </div>
        )
      }

    </>
  );
}
    


export default App;
