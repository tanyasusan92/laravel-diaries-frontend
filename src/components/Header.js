import { useContext } from 'react';
import {UserContext} from '../App';
import { useNavigate } from "react-router-dom";

function Header() {
  const {updateUserData} = useContext(UserContext);
  const navigate = useNavigate();
    const handleLogout=() => {
        updateUserData({type:"LOGOUT"});
        navigate("/auth/login");
    }
    return (
        <div className="flex justify-end h-12">
        <button className="m-2 inline-block px-3  bg-sign-up text-white 
              font-medium text-sm rounded-lg shadow-md hover:bg-login-blue 
              hover:shadow-lg focus:bg-login-blue focus:shadow-lg focus:outline-none 
              active:bg-login-blue active:shadow-lg w-20"
              onClick={()=>handleLogout()}>
          Logout{" "}   
        </button>
        </div>
    
  );
}
export default Header;
