import React from 'react';
import { formatFileSize } from '../utils';

function FileRow({ file }) {
  return (
    <tr>
      <td>{file.name}</td>
      <td>{formatFileSize(file.size)}</td>
      <td>{file.uploadedAt.toLocaleString()}</td>
      <td><a href={file.url}>Download</a></td>
    </tr>
  );
}

export default FileRow;

