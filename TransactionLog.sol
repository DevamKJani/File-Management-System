// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract TransactionLog {
    struct Log {
        uint256 transactionId;
        address sender;
        address recipient;
        uint256 amount;
        uint256 timestamp;
    }
    
    mapping (uint256 => Log) public logs;
    uint256 public logCount;
    
    function addTransaction(address _sender, address _recipient, uint256 _amount) public {
        logs[logCount] = Log(logCount, _sender, _recipient, _amount, block.timestamp);
        logCount++;
    }
    
    function getTransaction(uint256 _transactionId) public view returns (uint256, address, address, uint256, uint256) {
        Log memory log = logs[_transactionId];
        return (log.transactionId, log.sender, log.recipient, log.amount, log.timestamp);
    }
}
