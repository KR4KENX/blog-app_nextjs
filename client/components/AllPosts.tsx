import React, { useEffect, useState } from "react";
import axios from "axios";
import Post from "../models/Post";
import Loader from "./Loader";
import { FaUser } from "react-icons/fa";
import { RxUpload } from "react-icons/rx";
import ToggleReload from "@/models/ToggleReload";
import Modal from "react-bootstrap/Modal";

export default function AllPosts(props: ToggleReload) {
  const [posts, setPosts] = useState<Post[]>();
  const [showModal, setShowModal] = useState(false);
  const [postUpdatedId, setPostUpdatedId] = useState<Number>();
  const [passwd, setPasswd] = useState("");
  const [title, setTitle] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [desc, setDesc] = useState("");
  useEffect(() => {
    axios
      .get("http://localhost:8080/posts")
      .then((res) => {
        setPosts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props.toggleReload]);
  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    const dataObj = {
      title: title,
      shortDesc: shortDesc,
      description: desc,
    };
    axios
      .patch(
        `http://localhost:8080/posts?id=${postUpdatedId}&passwd=${passwd}`,
        dataObj
      )
      .then(() => {
        props.setToggleReload((prev) => !prev);
      });
  };
  return (
    <main className="container col-xl-10 col-l-10 col-md-10 col-sm-10 col-xs-12 mt-3">
      {posts == undefined ? (
        <Loader />
      ) : (
        posts.map((post) => {
          return (
            <div
              className="post-card d-flex flex-row border shadow rounded m-5 p-4"
              key={post.id}
            >
              <img
                className="img-fluid"
                width={"400px"}
                src={post.img}
                alt="post img"
              />
              <div className="d-flex flex-column justify-content-start align-items-center position-relative w-100">
                <div className="post-card--description d-flex flex-column align-items-center justify-content-between position-absolute top-50 start-50 translate-middle bg-white p-2">
                  {post.description}
                  <div
                    onClick={() => {
                      setPostUpdatedId(post.id);
                      setShowModal(true);
                    }}
                    className="btn btn-info p-2 text-white"
                  >
                    <RxUpload color="white" size={"30px"} />
                    <p className="d-inline mx-2">Add new post</p>
                  </div>
                </div>
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
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Update this post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="form-group">
              <label>Post password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Type in password for your post"
                value={passwd}
                onInput={(e: any) => setPasswd(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter title for your post..."
                value={title}
                onInput={(e: any) => setTitle(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Short description</label>
              <textarea
                className="form-control"
                id="exampleFormControlTextarea1"
                rows={3}
                value={shortDesc}
                onInput={(e: any) => setShortDesc(e.target.value)}
              ></textarea>
            </div>
            <div className="form-group">
              <label>Post content</label>
              <textarea
                className="form-control"
                id="exampleFormControlTextarea1"
                rows={5}
                value={desc}
                onInput={(e: any) => setDesc(e.target.value)}
              ></textarea>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-primary"
            onClick={(e: React.MouseEvent) => {
              setShowModal(false);
              handleSubmit(e);
            }}
          >
            Update post
          </button>
        </Modal.Footer>
      </Modal>
    </main>
  );
}
