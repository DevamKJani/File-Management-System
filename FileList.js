import React, { Component } from "react";
import PropTypes from "prop-types";
import { Table } from "reactstrap";
import FileRow from "./FileRow";

class FileList extends Component {
  render() {
    const { files = [], removeFile } = this.props;
    return (
      <Table striped>
        <thead>
          <tr>
            <th>File Name</th>
            <th>File Type</th>
            <th>IPFS Hash</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {files.map((file, index) => (
            <FileRow key={index} file={file} removeFile={removeFile} />
          ))}
        </tbody>
      </Table>
    );
  }
}

FileList.propTypes = {
  files: PropTypes.array,
  removeFile: PropTypes.func.isRequired,
};

export default FileList;

