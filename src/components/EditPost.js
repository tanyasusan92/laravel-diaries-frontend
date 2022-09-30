import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function EditPost() {
  let { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState([
    {
      title: "Laravel installation",
      content: "Laravel, xampp, mysql installations. Creating a database",
    },
  ]);
  useEffect(() => {
    console.log({ id });
    axios
      .get(`http://localhost:8000/api/posts/${id}`)
      .then((response) => {
        setPost(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost({ ...post, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("submitting this");
    console.log(post.title);
    console.log(post.content);

    let postData = { ...post };
    console.log(postData);

    axios
      .post(
        `http://localhost:8000/api/posts/${id}/edit`,
        post
        // { headers: { 'Authorization': `Bearer ${serviceToken}`,
        //           'Content-Type': 'multipart/form-data' } }
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });

    console.log(post);
    e.target.reset();
    navigate("/");
  };
  /*edit post form- to be completed after authenticated*/
  return (
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
          </form>
        </div>
      </div>
    </div>
  );
}
export default EditPost;
