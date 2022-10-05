import { useContext } from "react";
import { UserContext } from "../App";
import { useNavigate, Link } from "react-router-dom";

function Header() {
  const { updateUserData } = useContext(UserContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    updateUserData({ type: "LOGOUT" });
    navigate("/login");
  };
  return (
    <div className="flex items-center justify-between bg-soft-grey h-12">
      <div className="flex items-center h-12">
        
      </div>
      <div className="flex items-center justify-end h-12">
        <Link
          to={`/posts`}
          className="text-blue-800 hover:text-blue-700 focus:text-blue-700 active:text-blue-700"
        >
          Go to my posts{" "}
        </Link>
        <button
          className="m-2 inline-block px-3  bg-sign-up text-white 
              font-medium text-sm rounded-lg shadow-md hover:bg-login-blue 
              hover:shadow-lg focus:bg-login-blue focus:shadow-lg focus:outline-none 
              active:bg-login-blue active:shadow-lg w-20 h-10"
          onClick={() => handleLogout()}
        >
          Logout{" "}
        </button>
      </div>
    </div>
  );
}
export default Header;
