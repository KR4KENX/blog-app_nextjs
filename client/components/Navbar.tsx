import React from "react";
import { HiDocumentAdd } from "react-icons/hi";
import { AiFillHome } from "react-icons/ai";
import { SiMicrodotblog } from "react-icons/si";
import Link from "next/link";

export default function Navbar() {
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
        <Link href={"/add"}>
          <div className="btn btn-success h-75 p-2">
            <HiDocumentAdd size={"30px"} />
            <p className="d-inline mx-2">Add new post</p>
          </div>
        </Link>
      </div>
    </nav>
  );
}
