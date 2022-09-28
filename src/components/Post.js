import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import DeletePost from "./DeletePost";
import {BASE_URL} from '../axiosConfig';

function Post() {
  /*show a single post with options to edit/delete*/
  let { id } = useParams();
  const [deleteModal, setDeleteModal] = useState(false);
  const [post, setPost] = useState([
    {
      id: "1",
      title: "Laravel installation",
      content: "Laravel, xampp, mysql installations. Creating a database",
      email: "",
      first_name: "",
    },
  ]);
  
  const hideModal = () => {
    setDeleteModal((deleteModal)=>false);
  };
  useEffect(() => {
    console.log({ id });
    axios
      .get(`${BASE_URL}posts/${id}`)
      .then((response) => {
        setPost(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <div className="bg-login-blue flex flex-wrap justify-center items-center py-20">
        <div className="max-w-sm lg:max-w-lg flex flex-auto m-2">
          <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded p-4 flex flex-col justify-between">
            <div className="mb-8">
              <div className="text-gray-500 font-bold text-xl mb-2">
                {post.title}
              </div>
              <p className="text-gray-400 text-base">{post.content}</p>
            </div>
            <div className="flex justify-between items-center">
              <Link
                to={`/post/${post.id}/edit`}
                className="text-blue-800 hover:text-blue-700 focus:text-blue-700 active:text-blue-700"
              >
                Edit
              </Link>
              <Link
                className="text-blue-800 hover:text-blue-700 focus:text-blue-700 active:text-blue-700"
                onClick={() => setDeleteModal(true)}
              >
                <img className= "w-6" src={require('../assets/bin.png')}/>
              </Link>
            </div>
          </div>
        </div>
      </div>
      {deleteModal ? ( 
         <DeletePost id = {post.id} hideModal={hideModal}/>
      ) : (
        ""
      )}
    </>
  );
}
export default Post;
