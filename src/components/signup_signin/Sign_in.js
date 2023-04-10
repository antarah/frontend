import React, { useContext, useState }  from 'react'
import "./signup.css"
import { NavLink } from 'react-router-dom';
import { Logincontext } from '../context/ContextProvider';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Sign_in = () => {
    
    const { account, setAccount } = useContext(Logincontext);

    const [logdata, setData] = useState({
        email: "",
        password: ""
    });
    console.log(logdata);

    const adddata = (e) => {
        const { name, value } = e.target;
        // console.log(name, value);

        setData(() => {
            return {
                ...logdata,
                [name]: value
            }
        })
    };

    const senddata = async (e) => {
        e.preventDefault();
      
        const { email, password } = logdata;
        
        const res = await fetch("/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email,
            password
          })
        });
      
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
      
        try {
          const data = await res.json();
          console.log(data);
      
          if (!data) {
            console.log("invalid details");
            toast.warn("Invalid Details 👎!", {
              position: "top-center"
            });
          } else {
            console.log("valid data");
            setAccount(data)
            toast.success("Login Successfully done 😃!", {
              position: "top-center"
            });
            setData({ ...logdata, email: "", password: "" });
          }
        } catch (error) {
          console.error('Error while parsing JSON: ', error);
          toast.error("Oops! Something went wrong. Please try again later. 😞", {
            position: "top-center"
          });
        }
      };
        



  return (
    <section>
    <div className="sign_container">
        <div className="sign_header">
            <img src="./blacklogoamazon.png" alt="signupimg" />
        </div>
        <div className="sign_form">
                    <form method="POST">
                        <h1>Sign-In</h1>
                    <div className="form_data">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" 
                            onChange={adddata}
                            value={logdata.email}
                            id="email" />
                    </div>
                    <div className="form_data">
                    <label htmlFor="password">Password</label>
                     <input type="password" name="password"  
                          onChange={adddata}
                          value={logdata.password}
                         id="password" placeholder="At least 6 characters" />
                     </div>
                     <button type="submit" className="signin_btn" onClick={senddata}> Continue</button>
                    </form>
                   
                </div>
                 <div className="create_accountinfo">
                    <p>New to Amazon?</p>
                    <button>  <NavLink to ={"/register"}>Create your Amazon Account</NavLink></button>
                </div>
    </div>
    <ToastContainer />
</section>
  )
}

export default Sign_in;
