import React, { useState } from "react";
import { HiDocumentAdd } from "react-icons/hi";
import { AiFillHome } from "react-icons/ai";
import { SiMicrodotblog } from "react-icons/si";
import Link from "next/link";
import Modal from "react-bootstrap/Modal";
import axios from "axios";

export default function Navbar() {
  const [showModal, setShowModal] = useState(false);
  const [file, setFile] = useState<FormData>();
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [desc, setDesc] = useState("");

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    const formData = {
      title: title,
      shortDesc: shortDesc,
      description: desc,
      author: author,
      img: file,
    };
    axios
      .post("http://localhost:8080/posts", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res.data);
      });
  };
  return (
    <nav className="d-flex flex-row justify-content-between align-items-center container col-xl-10 col-l-10 col-md-10 col-sm-10 col-xs-12 border-bottom text-dark p-3">
      <div className="d-flex align-items-center">
        <SiMicrodotblog size={"50px"} color="red" />
        <h1 className="mx-2">Blogger</h1>
      </div>
      <div>
        <Link href={"/"}>
          <div className="btn btn-primary h-75 p-2 mx-4">
            <AiFillHome size={"30px"} color="white" />
            <p className="d-inline mx-2">Home</p>
          </div>
        </Link>
        <div
          onClick={() => setShowModal(true)}
          className="btn btn-success h-75 p-2"
        >
          <HiDocumentAdd size={"30px"} />
          <p className="d-inline mx-2">Add new post</p>
        </div>
      </div>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Share with other users!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="form-group">
              <label>Your name</label>
              <input
                type="text"
                className="form-control"
                placeholder="What's your name?"
                value={author}
                onInput={(e: any) => setAuthor(e.target.value)}
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
            <div className="form-group">
              <label className="form-label">Image</label>
              <input
                onChange={(e: any) => setFile(e.target.files[0])}
                className="form-control"
                type="file"
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-primary"
            onClick={(e: React.MouseEvent) => {
              handleSubmit(e);
              setShowModal(false);
            }}
          >
            Add post
          </button>
        </Modal.Footer>
      </Modal>
    </nav>
  );
}
