import React, { useContext, useEffect, useState } from 'react'
import "../header/navbaar.css"
import SearchIcon from '@mui/icons-material/Search';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { NavLink, useNavigate } from 'react-router-dom';
import { Logincontext, ContextProvider } from '../context/ContextProvider';
import MenuIcon from '@mui/icons-material/Menu';
import Rightheader from './Rightheader';
import { Drawer, IconButton, List, ListItem } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { ToastContainer, toast } from 'react-toastify';
import LogoutIcon from '@mui/icons-material/Logout';
import { useSelector } from "react-redux";


const Navbaar = () => {

  const { account, setAccount } = useContext(Logincontext);
  //console.log(account);

  const navigate = useNavigate("");

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [text, setText] = useState("");
  console.log(text);

  const [setOpen] = useState(false);
  const [liopen, setLiopen] = useState(true);

  const { products } = useSelector(state => state.getProductsdata);

  const [dropen, setDropen] = useState(false);



  const getdetailsvaliduser = async () => {
    const res = await fetch("/validuser", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      credentials: "include"
    });

    const data = await res.json();
    console.log(data);

    if (res.status !== 201) {
      console.log("first login");
    } else {
      console.log("data valid");
      setAccount(data);
    }
  };

  useEffect(() => {
    getdetailsvaliduser();
  }, []);

  // for logout
  const logoutuser = async () => {
    const res2 = await fetch("/logout", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      credentials: "include"
    });

    const data2 = await res2.json();
    // console.log(data2);

    if (!res2.status === 201) {
      const error = new Error(res2.error);
      throw error;
    } else {
      console.log("data valid log")
      toast.success("user Logout 😃!", {
        position: "top-center"
      });
      navigate("/");
    }
  }

  // for drawer

  const handelopen = () => {
    setDropen(true);
  }

  const handleClosedr = () => {
    setDropen(false)
  }

  const getText = (text) => {
    setText(text)
    setLiopen(false)
  }


  return (
    <header>
      <nav>
        <div className="left">

          <IconButton className="hamburgur" onClick={handelopen}>
            <MenuIcon style={{ color: "#fff" }} />
          </IconButton>
          {/* here define the right header */}
          <Drawer open={dropen} onClose={handleClosedr}>
            <Rightheader Logclose={handleClosedr} userlog={logoutuser}  />
          </Drawer>

          <div className="navlogo">
            <NavLink to="/"> <img src="./amazon_PNG25.png" alt="logo" /> </NavLink>
          </div>
          <div className="spatial_btn">
         
          <a href="https://www.spatial.io/s/Ants-Hi-Fi-Hangout-642815e8f7f68ef1ab7053f2?share=8840547250859095273" class="button">Click Me</a>
            
          </div>
          <div className="nav_searchbaar">
            <input type="text" name=""
              onChange={(e) => getText(e.target.value)}
              placeholder="Search Your Products"
              id="" />
            <div className="search_icon">
              <SearchIcon id="search" />
            </div>
            {
              text &&
              <List className="extrasearch" hidden={liopen}>
                {
                  products.filter(product => product.title.longTitle.toLowerCase().includes(text.toLowerCase())).map(product => (
                    <ListItem>
                      <NavLink to={`/getproductsone/${product.id}`} onClick={() => setLiopen(true)}>
                        {product.title.longTitle}
                      </NavLink>
                    </ListItem>
                  ))
                }
              </List>
            }

          </div>
        </div>
        <div className="right">
          <div className="nav_btn">
            <NavLink to={"/login"}>Sign in</NavLink>
          </div>
          <div className="cart_btn">

            {
              account ? <NavLink to="/buynow">
                <Badge badgeContent={account?.carts?.length} color="primary">
                  <ShoppingCartIcon id="icon" />
                </Badge>
              </NavLink> : <NavLink to="/login">
                <Badge badgeContent={0} color="primary">
                  <ShoppingCartIcon id="icon" />
                </Badge>
              </NavLink>
            }

            <ToastContainer />

            <p>Cart</p>
          </div>
          {
            account ? <Avatar className="avtar2"
              id="basic-button"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
            > {account.fname[0].toUpperCase()}</Avatar> :
              <Avatar className="avtar"
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
              ></Avatar>
          }

          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >

            <MenuItem onClick={handleClose}>My account</MenuItem>
            {
              account ? <MenuItem onClick={handleClose} onClick={logoutuser}><LogoutIcon style={{ fontSize: 16, marginRight: 3 }} />Logout</MenuItem> : ""
            }

          </Menu>
        </div>
      </nav>
    </header>
  )
}

export default Navbaar;