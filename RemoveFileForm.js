import React, { useState } from "react";
import { removeFile } from "../utils";
import { notify } from "./Notifications";

function RemoveFileForm(props) {
  const [fileId, setFileId] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await removeFile(fileId);
      notify(`File with ID ${fileId} has been removed.`);
      setFileId("");
    } catch (err) {
      console.error(err);
      notify(`Failed to remove file with ID ${fileId}.`, true);
    }
  };

  return (
    <div className="container">
      <h2>Remove File</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="fileId">File ID:</label>
          <input
            type="text"
            className="form-control"
            id="fileId"
            placeholder="Enter file ID"
            value={fileId}
            onChange={(e) => setFileId(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Remove
        </button>
      </form>
    </div>
  );
}

export default RemoveFileForm;
