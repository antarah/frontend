import React, { useContext } from 'react'
import { Logincontext } from '../context/ContextProvider';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Context } from '../context/ContextProvider';


const Option = ({ deletedata,get}) => {

    const { account, setAccount } = useContext(Logincontext);
    // console.log(account);

    const removedata = async (req,res) => {
        try {
            const res = await fetch(`remove/${deletedata}`, {
                method: "DELETE",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });

            const data = await res.json();
            console.log(data);

            if (res.status === 400 || !data) {
                console.log("error aai remove time pr");
            } else {
                console.log("user delete");
                setAccount(data)
                get();
                toast.success("Item removed from cart 😃!", {
                    position: "top-center"
                });
                };
            
        } catch (error) {
            console.log("error");
        }

    }
    return (
        <div className="add_remove_select">
            <select>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
            </select>
            <p onClick={() => removedata(deletedata)} style={{ cursor: "pointer" }}>Delete</p><span>|</span>
            <p className="forremovemedia">Save Or Later</p><span>|</span>
            <p className="forremovemedia">See More like this</p>
            <ToastContainer />
        </div>

    )
}

export default Option;