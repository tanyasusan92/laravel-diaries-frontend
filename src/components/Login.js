import React, { useState, useContext } from "react";
import { AUTH_URL } from "../axiosConfig";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "../App";

function Login() {
  /*to complete- 
  -learn about tokens and auth, 
  -do validations */
  const navigate = useNavigate();
  const { updateUserData, updateUserId } = useContext(UserContext);
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage("");
    console.log(loginDetails.email);
    console.log(document.getElementsByName("_token")[0].value);
    console.log(document.getElementsByTagName("META")[4].content);

    // axios.get( `${AUTH_URL}sanctum/csrf-cookie`).then(resp => {
    //   console.log(resp);
    axios
      .post(
        `${AUTH_URL}auth/token`,
        {
          email: loginDetails.email,
          password: loginDetails.password,
          // _token: document.getElementsByName("_token")[0].value
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            //  "X-CSRF-TOKEN": document.getElementsByTagName("META")[4].value
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        if (
          response.status === 200 &&
          response.data !== "Invalid credentials"
        ) {
          let userToken = response.data.user;
          let id = response.data.userId;

          localStorage.setItem("user_data", JSON.stringify(userToken));
          localStorage.setItem("user_id", JSON.stringify(id));
          updateUserData({ type: "LOGIN", payload: userToken });
          updateUserId(id);

          console.log("userdata updated, navigating to /");
          navigate("/posts");
        } else {
          console.log("error:");
          setErrorMessage(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage(error.message);
      });
    // });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginDetails({ ...loginDetails, [name]: value });
  };

  return (
    <div className="flex justify-center items-center flex-col md:flex-row w-full py-20 bg-gradient-to-b from-login-blue to-white">
      <div className="max-w-1/2 mb-12 md:mb-0">
        <img
          src={require("../assets/diary.png")}
          className="w-52 md:w-full"
          alt="Diary"
        />
      </div>
      <div className="max-w-1/2 lg:ml-20">
        <h1 className="text-title text-3xl lg:text-6xl font-thin pb-6 lg:pb-12">
          Login
        </h1>
        <form onSubmit={handleSubmit}>
          <input type="hidden" name="_token" value="{{ csrf_token() }}" />
          {/* <!-- Email input --> */}
          <div className="mb-6">
            <input
              type="text"
              className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white border border-solid border-gray-300 rounded focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              placeholder="Email address"
              name="email"
              value={loginDetails.email}
              onChange={handleChange}
            />
          </div>

          {/* <!-- Password input --> */}
          <div className="mb-0">
            <input
              type="password"
              className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white border border-solid border-gray-300 rounded focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              placeholder="Password"
              name="password"
              value={loginDetails.password}
              onChange={handleChange}
            />
          </div>

          <div className="flex justify-between items-center mb-6">
            <a
              href="#!"
              className="pointer-events-none cursor-not-allowed text-gray-600 hover:text-blue-700 focus:text-blue-700 active:text-blue-800"
            >
              Forgot password?
            </a>
          </div>

          {/* <!-- Submit button --> */}
          <button
            type="submit"
            className="inline-block px-7 py-3 bg-sign-up text-white 
              font-medium text-sm rounded-full shadow-md hover:bg-login-blue 
              hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none 
              active:bg-blue-800 active:shadow-lg w-full"
          >
            Log in
          </button>
          {errorMessage && (
            <div className="text-pink-800 text-center text-sm p-4">
              Error: {errorMessage}
            </div>
          )}
          <div className="flex justify-center items-center mb-6">
            <Link
              to={"/signup"}
              className="text-blue-800 hover:text-blue-700 focus:text-blue-700 active:text-blue-700"
            >
              New user? Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
export default Login;
