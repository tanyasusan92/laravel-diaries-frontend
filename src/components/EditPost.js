import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../App";
import { BASE_URL } from "../axiosConfig";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Header from "./Header";

function EditPost() {
  const { userId, userData } = useContext(UserContext);
  let { id } = useParams();
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState("");

  const [post, setPost] = useState([
    {
      title: "Laravel installation",
      content: "Laravel, xampp, mysql installations. Creating a database",
    },
  ]);
  useEffect(() => {
    console.log(id);
    userData &&
      userId !== -1 &&
      axios
        .get(`${BASE_URL}${userId}/posts/${id}`, {
          headers: {
            Authorization: `Bearer ${userData}`,
          },
        })
        .then((response) => {
          setPost(response.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
  }, [userData, userId, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost({ ...post, [name]: value });
  };

  const handleSubmit = (e) => {
    setErrorMessage("");
    e.preventDefault();

    if (post.title.length === 0) {
      setErrorMessage("Title cannot be left empty");
    } else if (post.content.length === 0) {
      setErrorMessage("Content cannot be left empty");
    } else {
      console.log("submitting this");
      console.log(post);

      userData &&
        userId !== -1 &&
        axios
          .put(
            `${BASE_URL}${userId}/posts/${id}`,
            {
              title: post.title,
              content: post.content,
            },
            {
              headers: {
                Authorization: `Bearer ${userData}`,
              },
            }
          )
          .then((response) => {
            console.log(response);
            e.target.reset();
            navigate("/");
          })
          .catch((error) => {
            console.log(error);
          });
    }
  };

  return (
    <div className="bg-login-blue flex-grow-1 min-h-full min-w-full">
      <Header />
      <div className="bg-login-blue flex flex-wrap justify-center items-center py-20">
        <div className="max-w-sm lg:max-w-lg flex flex-auto m-2">
          <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded p-4 flex flex-col justify-between">
            <form onSubmit={handleSubmit}>
              {/* <!-- Title input --> */}
              <div className="mb-6">
                <input
                  type="text"
                  className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white border border-solid border-gray-300 rounded focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  placeholder="Title"
                  name="title"
                  value={post.title}
                  onChange={handleChange}
                />
              </div>

              {/* <!-- Content input --> */}
              <div className="mb-6">
                <textarea
                  className="form-control block w-full px-4 py-2 text-xl 
                            font-normal text-gray-700 bg-white border border-solid border-gray-300 
                            rounded focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  rows="3"
                  placeholder="Content"
                  name="content"
                  value={post.content}
                  onChange={handleChange}
                ></textarea>
              </div>

              {/* <!-- Submit button --> */}
              <button
                type="submit"
                className="inline-block px-7 py-3 bg-sign-up text-white 
              font-medium text-sm rounded-full shadow-md hover:bg-login-blue 
              hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none 
              active:bg-blue-800 active:shadow-lg w-full"
              >
                Submit
              </button>
              {errorMessage && (
                <div className="text-pink-800 text-center text-sm p-4">
                  Error: {errorMessage}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
export default EditPost;
