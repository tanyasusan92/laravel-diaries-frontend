import React, {useState} from 'react';
import { BASE_URL } from "../axiosConfig";
import axios from "axios";

function Login() {
  /*to complete- 
  -learn about tokens and auth, 
  -do validations */ 
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(loginDetails);

    axios.get(`${BASE_URL}tokens/create`).then((response) => {
      // Login...
      console.log(response);
    });
  };

  const [loginDetails, setLoginDetails] = useState([{
      email: "",
      password: "",
    },
  ]);
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
          Login
        </h1>
        <form onSubmit={handleSubmit}>
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
            Sign in
          </button>
          <div className="flex justify-center items-center mb-6">
            <a
              href="#!"
              className="text-blue-800 hover:text-blue-700 focus:text-blue-700 active:text-blue-700"
            >
              New user? Sign up
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
export default Login;