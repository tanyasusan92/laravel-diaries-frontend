import "./App.css";
import Login from "./components/Login";
import MyPosts from "./components/MyPosts";
import CreatePost from "./components/CreatePost";
// import PrivateRoutes from "./PrivateRoutes";
import Post from "./components/Post";
import EditPost from "./components/EditPost";
import DeletePost from "./components/DeletePost";
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

  const [userId, setUserId] = useState(-1);
  const updateUserId = (id) => {
    setUserId(id);
  };

  useEffect(() => {
    setUserData(JSON.parse(localStorage.getItem("user_data")));
    setUserId(JSON.parse(localStorage.getItem("user_id")));
  }, []);

  return (
    <div className="App">
      <UserContext.Provider
        value={{ userData, updateUserData, userId, updateUserId }}
      >
        <Router>
          <Routes>
            <Route
              path="/posts"
              element={
                // <PrivateRoutes >
                <MyPosts />
                //  </PrivateRoutes>
              }
            />
            <Route
              path="/post/create"
              element={
                //<PrivateRoutes >
                <CreatePost />
                //</PrivateRoutes>
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
              path="/post/:id/delete"
              element={
                //<PrivateRoutes >
                <DeletePost />
                //</PrivateRoutes>
              }
            />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="/" element={userData ? <MyPosts /> : <Login />} />
          </Routes>
        </Router>
      </UserContext.Provider>
    </div>
  );
}

export default App;
