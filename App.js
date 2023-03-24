import React, { useState, useEffect } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import FileList from "./components/FileList";
import AddFileForm from "./components/AddFileForm";
import RemoveFileForm from "./components/RemoveFileForm";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import { getWeb3, getContractInstance } from "./utils";


function App() {
  // eslint-disable-next-line no-unused-vars
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);

  useEffect(() => {
    async function init() {
      try {
        const web3 = await getWeb3();
        const contract = await getContractInstance(web3);
        const accounts = await web3.eth.getAccounts();
        const account = accounts[0];
        setWeb3(web3);
        setContract(contract);
        setAccount(account);
      } catch (error) {
        console.error(error);
      }
    }
    init();
  }, []);

  /* const removeFile = async (fileId) => {
    try {
      // Your logic to remove the file using the fileId.
      const result = await contract.methods.removeFile(fileId).send({ from: account });
      console.log('Removed file with ID:', fileId, result);
    } catch (error) {
      console.error('Error removing file:', error);
      }
    }; */
    
  const removeFile = async (fileHash) => {
   if (contract && account) {
	try {
		await contract.methods.removeFile(fileHash).send({ from: account });
	} catch (error) {
		console.error("Error while removing file:", error);
		}
	}
	};

  return (
<div className="App">
      <Navbar account={account} />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/files" element={<FileList contract={contract} account={account} removeFile={removeFile} />} />
          <Route path="/add-file" element={<AddFileForm contract={contract} account={account} />} />
          <Route path="/remove-file" element={<RemoveFileForm contract={contract} account={account} />} />
        </Routes>
      </div>
    </div>
);
}

export default App;

