import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
// Import Web3 as default export, not in curly braces
import Web3 from 'web3';

// Contract address and ABI
const ADDRESS = "0x8715db3a3944322A7138ae30472ea6e3095aC976";  // Address should be in quotes
const ABI = [
  {
    "inputs": [
      { "internalType": "uint256", "name": "startingPoint", "type": "uint256" },
      { "internalType": "string", "name": "startingMessage", "type": "string" }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  { "inputs": [], "name": "decreaseNumber", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
  { "inputs": [], "name": "getNumber", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
  { "inputs": [], "name": "increaseNumber", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
  { "inputs": [], "name": "message", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" },
  { "inputs": [{ "internalType": "string", "name": "newMessage", "type": "string" }], "name": "setMessage", "outputs": [], "stateMutability": "nonpayable", "type": "function" }
];

function App() {
  // Corrected useState syntax
  const [number, setNumber] = useState('none');

  // Initialize web3 object correctly
  const web3 = new Web3(window.ethereum);

  // Initialize the contract with ABI and address
  const myContract = new web3.eth.Contract(ABI, ADDRESS);

  // Reading function to get the number
  async function getNumber() {
    try {
      const result = await myContract.methods.getNumber().call();
      setNumber(result.toString());  // Corrected to use toString()
    } catch (error) {
      console.error("Error fetching number:", error);
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button onClick={getNumber}>Get number</button>
        <br />
        <button>Get message</button>
        <br />
        <button>Increase number</button>
        <br />
        <button>Decrease number</button>
        <br />
        <p>Number: {number}</p>
        <br />
        <input />
        <br />
        <button>Update message</button>
      </header>
    </div>
  );
}

export default App;

