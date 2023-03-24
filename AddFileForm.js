import React, { useState } from "react";
import { addFile } from "../utils";
import Notifications from "./Notifications";

function AddFileForm({ contract, account }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [notification, setNotification] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (selectedFile) {
      try {
        await addFile(selectedFile, contract, account);
        setSelectedFile(null);
        setNotification({ type: "success", message: "File added successfully" });
      } catch (error) {
        console.error(error);
        setNotification({ type: "error", message: "Error adding file" });
      }
    } else {
      setNotification({ type: "error", message: "Please select a file" });
    }
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  return (
    <div>
      <h2>Add a new file</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Select File:
          <input type="file" onChange={handleFileChange} />
        </label>
        <button type="submit">Add file</button>
      </form>
      {notification && <Notifications {...notification} />}
    </div>
  );
}

export default AddFileForm;

