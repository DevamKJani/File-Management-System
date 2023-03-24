const ipfsClient = require("ipfs-http-client");

// Create an IPFS client instance
const ipfs = ipfsClient({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
});

/**
 * Uploads a file to IPFS.
 * @param {File} file - The file to upload.
 * @returns {Promise<string>} - The IPFS CID of the uploaded file.
 */
export async function uploadFileToIPFS(file) {
  const fileAdded = await ipfs.add(file);
  return fileAdded.cid.toString();
}

/**
 * Retrieves a file from IPFS.
 * @param {string} cid - The IPFS CID of the file to retrieve.
 * @returns {Promise<Blob>} - The retrieved file as a Blob.
 */
export async function getFileFromIPFS(cid) {
  const chunks = [];

  for await (const chunk of ipfs.cat(cid)) {
    chunks.push(chunk);
  }

  return new Blob(chunks);
}
