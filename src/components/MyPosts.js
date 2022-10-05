import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { BASE_URL } from "../axiosConfig";
import Header from "./Header";
import { UserContext } from "../App";

function MyPosts() {
  /*displays the posts in db static from below array*/
  const { userData, userId } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([
    {
      id: "1",
      title: "Laravel installation",
      content: "Laravel, xampp, mysql installations. Creating a database",
    },
    {
      id: "2",
      title: "MVC",
      content: "Creating models and views and controlling them with controller",
    },
    {
      id: "3",
      title: "CRUD operations",
      content:
        "Crud operations for inserting, reading, updating and deleting data from the mysql database through laravel",
    },
    {
      id: "4",
      title: "Laravel installation",
      content: "Laravel, xampp, mysql installations. Creating a database",
    },
    {
      id: "5",
      title: "MVC",
      content: "Creating models and views and controlling them with controller",
    },
    {
      id: "6",
      title: "CRUD operations",
      content:
        "Crud operations for inserting, reading, updating and deleting data from the mysql database through laravel",
    },
  ]);
  useEffect(() => {
    console.log(userId);
    console.log(userData);
    userData &&
      userId !== -1 &&
      axios
        .get(`${BASE_URL}${userId}/posts`, {
          headers: {
            Authorization: `Bearer ${userData}`,
          },
        })
        .then((response) => {
          console.log(response.data.data);
          setPosts(response.data.data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
  }, [userData, userId]);

  let renderPosts = () => {
    return posts.map((post) => (
      <div key={post.id} className="max-w-sm lg:max-w-lg flex flex-auto m-2">
        <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-soft-grey rounded p-4 flex flex-col justify-between">
          <div className="mb-8">
            <div className="text-gray-500 font-bold text-xl mb-2">
              {post.title}
            </div>
            <p className="text-gray-400 text-base">{post.content}</p>
          </div>
          <div className="flex justify-between items-center">
            <Link
              to={`/post/${post.id}`}
              className="text-blue-800 hover:text-blue-700 focus:text-blue-700 active:text-blue-700"
            >
              View Post{" "}
            </Link>
          </div>
        </div>
      </div>
    ));
  };

  return (
    <>
      {isLoading ? (
        <div className="flex flex-wrap justify-center items-center py-20 text-white">
          <h1>Loading...</h1>
        </div>
      ) : (
        <>
          <Header />
          <div className="bg-login-blue flex flex-wrap justify-center items-center pt-20 pb-10">
            {posts.length ? (
              renderPosts()
            ) : (
              <div className="flex flex-wrap justify-center items-center text-white py-20">
                <h1>No posts here...</h1>
              </div>
            )}
          </div>
          <div className="flex items-center justify-center h-12 pb-10">
            <Link to={`/post/create`}>
              <button
                className="m-2 inline-block px-5 py-2 bg-button-red text-whitesmoke 
              rounded-full shadow-md hover:bg-login-blue 
              hover:shadow-lg focus:bg-login-blue focus:shadow-lg focus:outline-none 
              active:bg-login-blue active:shadow-lg w-40"
              >
                Create new entry
              </button>
            </Link>
          </div>
        </>
      )}
    </>
  );
}
export default MyPosts;
