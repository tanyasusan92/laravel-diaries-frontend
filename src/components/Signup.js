import React, { useState, useContext} from "react";
import { BASE_URL } from "../axiosConfig";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {UserContext} from '../App';

function Signup() {
  /*to complete- 
  -learn about tokens and auth, 
  -do validations */
  const navigate = useNavigate();
  const {updateUserData} = useContext(UserContext);
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(loginDetails.email);
    axios
      .post(`${BASE_URL}auth/register`, {
        email: loginDetails.email,
        password: loginDetails.password,
        first_name: loginDetails.name,
      })
      .then((response) => {
        console.log(response);
        let data = response.data.data;
        let status_code = response.data.statusCode;
        if (status_code === 6000) {
          localStorage.setItem("user_data", JSON.stringify(data));          
          updateUserData({type:"LOGIN", payload:data});
          navigate("/");
        } else {
          setErrorMessage(response.data.message);
        }
      })
      .catch((error) => {

                        // remove this after api is made

                        let fakedata = "Fake token";
                        localStorage.setItem("user_data", JSON.stringify(fakedata));
                        updateUserData({type:"LOGIN", payload:fakedata});
                        navigate("/");

        console.log(error);
        if (error.response.status === 401) {
          setErrorMessage(error.response);
        }
        setErrorMessage(error.message);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginDetails({ ...loginDetails, [name]: value });
  };

  return (
    <div className="flex justify-center items-center flex-col md:flex-row py-20 bg-gradient-to-b from-login-blue to-white">
      <div className="max-w-1/2 mb-12 md:mb-0">
        <img
          src={require("../assets/diary.png")}
          className="w-52 md:w-full"
          alt="Diary"
        />
      </div>
      <div className="max-w-1/2 lg:ml-20">
        <h1 className="text-title text-3xl lg:text-6xl font-thin pb-6 lg:pb-12">
          Sign Up
        </h1>
        <form onSubmit={handleSubmit}>

          {/* <!-- Name input --> */}
          <div className="mb-6">
            <input
              type="text"
              className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white border border-solid border-gray-300 rounded focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              placeholder="Name"
              name="name"
              value={loginDetails.name}
              onChange={handleChange}
            />
          </div>

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
          <div className="mb-6">
            <input
              type="password"
              className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white border border-solid border-gray-300 rounded focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              placeholder="Password"
              name="password"
              value={loginDetails.password}
              onChange={handleChange}
            />
          </div>

          {/* <!-- Submit button --> */}
          <button
            type="submit"
            className="inline-block px-7 py-3 bg-sign-up text-white 
              font-medium text-sm rounded-full shadow-md hover:bg-login-blue 
              hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none 
              active:bg-blue-800 active:shadow-lg w-full"
          >
            Sign up
          </button>
          {errorMessage && (
            <div className="text-pink-800 text-center text-sm p-4">
              Error: {errorMessage}
            </div>
          )}
          <div className="flex justify-center items-center mb-6">
            <a
              href="#!"
              className="text-blue-800 hover:text-blue-700 focus:text-blue-700 active:text-blue-700"
            >
              Already an existing user? Log in.
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
export default Signup;
