import React, { useEffect, useState } from "react";
import axios from "axios";
import Post from "../models/Post";
import Loader from "./Loader";
import { FaUser } from "react-icons/fa";

export default function AllPosts() {
  const [posts, setPosts] = useState<Post[]>();
  useEffect(() => {
    axios
      .get("http://localhost:8080/posts")
      .then((res) => {
        setPosts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  });
  return (
    <main className="container col-xl-10 col-l-10 col-md-10 col-sm-10 col-xs-12 mt-3">
      {posts == undefined ? (
        <Loader />
      ) : (
        posts.map((post) => {
          return (
            <div
              className="post-card d-flex flex-row border shadow rounded m-4 p-4"
              key={post.id}
            >
              <img
                className="img-fluid"
                width={"400px"}
                src={post.img}
                alt="post img"
              />
              <div className="d-flex flex-column justify-content-start align-items-center position-relative w-100">
                <p className="post-card--description position-absolute top-50 start-50 translate-middle bg-white p-5">
                  {post.description}
                </p>
                <span className="fs-5 my-4">
                  <FaUser className="mx-1" />
                  {post.author}
                </span>
                <h3>{post.title}</h3>
                <p>Uploaded: {post.createdAt.slice(0, 10)}</p>
                <p className="text-center">{post.shortDesc}</p>
              </div>
            </div>
          );
        })
      )}
    </main>
  );
}
