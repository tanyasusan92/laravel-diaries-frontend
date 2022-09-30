import "./App.css";
import Login from "./components/Login";
import MyPosts from "./components/MyPosts";
import CreatePost from "./components/CreatePost";
import Post from "./components/Post";
import EditPost from "./components/EditPost";
import DeletePost from "./components/DeletePost";
import PrivateRoutes from "./PrivateRoutes";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./components/Signup";
import React, { useState, useEffect } from "react";

export const UserContext = React.createContext();

function App() {
  const [userData, setUserData] = useState({});
  const updateUserData = (action) => {
    switch (action.type) {
      case "LOGOUT":
        setUserData(null);
        localStorage.clear();
        break;
      case "LOGIN":
        setUserData(action.payload);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    setUserData(JSON.parse(localStorage.getItem("User_data")));
  }, []);

  return (
    <div className="App">
      <UserContext.Provider value={{ userData, updateUserData }}>
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                // <PrivateRoutes >
                <MyPosts />
                //  </PrivateRoutes>
              }
            />
            <Route
              path="/post/:id"
              element={
                //<PrivateRoutes >
                <Post />
                //</PrivateRoutes>
              }
            />
            <Route
              path="/post/:id/edit"
              element={
                //<PrivateRoutes >
                <EditPost />
                //</PrivateRoutes>
              }
            />
            <Route
              path="/"
              element={
                //<PrivateRoutes >
                <MyPosts />
                //</PrivateRoutes>
              }
            />
            <Route
              path="/post/:id/delete"
              element={
                //<PrivateRoutes >
                <DeletePost />
                //</PrivateRoutes>
              }
            />
            <Route path="auth/login" element={<Login />} />
            <Route path="auth/register" element={<Signup />} />
          </Routes>
        </Router>
      </UserContext.Provider>
    </div>
  );
}

export default App;
