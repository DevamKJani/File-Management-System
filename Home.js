import React from "react";
import { Link } from "react-router-dom";

/* function Home() {
  return (
    <div>
      <h1>Welcome to the File Management System</h1>
      <p>
        This is a decentralized application built on Ethereum and IPFS that
        allows you to upload and manage files securely.
      </p>
      <Link to="/add">Add a file</Link>
      <br />
      <Link to="/remove">Remove a file</Link>
    </div>
  );
}

export default Home; */
function Home() {
  return (
    <div style={{ textAlign: "center" }}>
      <h1>Welcome to the File Management System</h1>
      <p style={{ fontSize: "1.2rem", maxWidth: "80%", margin: "0 auto 1rem" }}>
        This is a decentralized application built on Ethereum and IPFS that
        allows you to upload and manage files securely.
      </p>
      <Link
        to="/add-file"
        style={{
          backgroundColor: "#4CAF50",
          color: "white",
          padding: "1rem 2rem",
          textDecoration: "none",
          marginRight: "1rem",
        }}
      >
        Add a file
      </Link>
      <Link
        to="/remove-file"
        style={{
          backgroundColor: "#f44336",
          color: "white",
          padding: "1rem 2rem",
          textDecoration: "none",
        }}
      >
        Remove a file
      </Link>
    </div>
  );
}

export default Home;

