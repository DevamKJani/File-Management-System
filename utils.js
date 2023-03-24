import Web3 from "web3";
import FileManagementContract from "./FileManagement.json";

/**
 * Converts a file size in bytes to a human-readable string.
 * @param {number} bytes - The size of the file in bytes.
 * @returns {string} - The human-readable file size string.
 */
export function formatFileSize(bytes) {
  if (bytes < 1024) {
    return bytes + " B";
  } else if (bytes < 1024 * 1024) {
    return (bytes / 1024).toFixed(2) + " KB";
  } else if (bytes < 1024 * 1024 * 1024) {
    return (bytes / (1024 * 1024)).toFixed(2) + " MB";
  } else {
    return (bytes / (1024 * 1024 * 1024)).toFixed(2) + " GB";
  }
}

/**
 * Returns the MIME type of a file.
 * @param {File} file - The file.
 * @returns {string} - The MIME type of the file.
 */
export function getMimeType(file) {
  return file.type || "application/octet-stream";
 
}

/**
 * Removes a file from the IPFS network and blockchain.
 * @param {string} hash - The IPFS hash of the file to remove.
 * @param {Object} contract - The contract instance.
 * @param {string} account - The user's account address.
 * @param {Function} onConfirmation - The callback function to invoke after the transaction has been confirmed.
 */
export async function removeFile(hash, contract, account, onConfirmation) {
  try {
    // Call the contract's removeFile function to remove the file from the blockchain.
    const tx = await contract.methods.removeFile(hash).send({ from: account });

    // Invoke the callback function with the transaction hash.
    onConfirmation(tx.transactionHash);
  } catch (error) {
    console.error(`Failed to remove file from blockchain: ${error.message}`);
    throw error;
  }
}

/*export function addFile(file, contract, account) {
  return new Promise((resolve, reject) => {
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = async () => {
      const buffer = Buffer.from(reader.result);
      try {
        await contract.methods.addFile(file.name, buffer.toString('hex')).send({ from: account });
        resolve();
      } catch (error) {
        reject(error);
      }
    };
  });
} */

export const addFile = async (selectedFile, contract, account) => {
  const fileReader = new window.FileReader();
  fileReader.readAsArrayBuffer(selectedFile);
  return new Promise((resolve, reject) => {
    fileReader.onload = async () => {
      try {
        const buffer = await Buffer.from(fileReader.result);
        const data = await contract.methods.addFile(selectedFile.name, buffer).encodeABI();
        const result = await contract.methods.sendTransaction({ from: account, data: data });
        resolve(result);
      } catch (error) {
        reject(error);
      }
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};




/**
 * Returns an instance of the FileManagement contract.
 * @returns {Promise<Contract>} - An instance of the FileManagement contract.
 */
export async function getContractInstance(web3) {
  // const provider = new Web3.providers.HttpProvider('http://127.0.0.1:7545'); // Use ganache's default port
  // const web3 = new Web3(provider);

  try {
    // Get the network ID
    const networkId = await web3.eth.net.getId();
    console.log("Network ID:", networkId); // Debug log

	
    // Get the - network
    const deployedNetwork = FileManagementContract.networks[networkId];
    console.log("Deployed Network:", deployedNetwork); // Debug log

    // Check if the deployedNetwork is defined before creating the contract instance
    if (deployedNetwork) {
      return new web3.eth.Contract(
        FileManagementContract.abi,
        deployedNetwork.address
      );
    } else {
      throw new Error(`The FileManagement contract is not deployed on the current network (ID: ${networkId}).`);
    }
  } catch (error) {
    throw new Error(`Could not get contract instance: ${error}`);
  }
}





/**
 * Returns an instance of the Web3 object.
 * @returns {Web3} - The Web3 object.
 */
export function getWeb3() {
  return new Web3(Web3.givenProvider || "http://localhost:8545");
}

