import React, { useState } from 'react';
import QRCode from 'qrcode.react'; 
import {encryptMessage , generateID, hashSHA256 } from './utils/index.js'
import './App.css';
import { sendSecret } from './services/index.js';
import DarkModeSwitch from './DarkModeSwitch.jsx';

function App() {
  const [secret, setSecret] = useState('');
  const [expiration, setExpiration] = useState('1 hour');
  const [maxViews, setMaxViews] = useState(1);
  const [password, setPassword] = useState('');
  const [generatedLink, setGeneratedLink] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [error, setError] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);



  const handleGenerateLink = () => {
    if (secret === "") {
      setError("Need some secret to send!");
      setSecret("")
      return;
    }
      const id = generateID()
      const [encMsg , key]  = encryptMessage(secret) 
      
    sendData(id , encMsg)
    .then((res)=>{
      const dummyLink = `${window.location.href}secret/${id}#${key}`;
      setGeneratedLink(dummyLink);
      setShowResult(true);
    })
    .catch((err)=>{
      setError("Sorry can't generate link")
    })  
};


  const sendData = async (id, encMsg)=>{
    console.log('DINDIOSAN' , encMsg);
    const data = {
      uuid: id,
      ttl: getSeconds(expiration),
      maxAccess: maxViews,
      passphrase:hashSHA256(password),
      encryptedMessage: encMsg,
    }
    console.log(data);
    return sendSecret(data)
  }

  const handleBack = () => {
    setShowResult(false);
    setGeneratedLink('');
  };

  const getSeconds = (expiration)=>{
    switch (expiration){
      case '1 minute':
        return 60
      case '1 hour':
        return 60*60 
      case '1 day':
        return 60*60*24
      case '1 week':
        return 60*60*24*7
      default:
        return 60
    }
  }
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle('dark-mode');
  };

  if (showResult) {
    return (
      <div className="app">
        <div className="enigma">
          <h1>SecretKeeper 3000 <span className="home-icon" onClick={handleBack}>⌂</span></h1>
          <div className="result-container">
            <h2>Your Secret Link:</h2>
            <p className="generated-link">{generatedLink}</p>
            <div className="qr-code">
              <QRCode value={generatedLink} size={200} radius={20} />
            </div>
            <button onClick={() => {navigator.clipboard.writeText(generatedLink) }}>
              Copy Link
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <DarkModeSwitch isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      <div className="enigma">
        <h1>SecretKeeper 3000</h1>
        <textarea
          placeholder="Enter your secret here..."
          value={secret}
          onChange={(e) => setSecret(e.target.value)}
        />
        <div className="options">
          <div className="option">
            <label>Expiration</label>
            <select value={expiration} onChange={(e) => setExpiration(e.target.value)}>
              <option>1 minute</option>
              <option>1 hour</option>
              <option>1 day</option>
              <option>1 week</option>
            </select>
          </div>
          <div className="option">
            <label>Max Views</label>
            <input
                  type="number"
                  value={maxViews}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value > 10) {
                      setError("Max Views Can't be more than 10.");
                    } else if (value < 0) {
                      setError("Max Views can't be negative.");
                    } else {
                      setMaxViews(value);
                      setError(""); 
                    }
                  }}
                  style={{ appearance: 'textfield' }}
                  min="0"
                  max="10"
                />
          </div>
        </div>
        <div className="password-option">
          <label>Password (optional)</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
          />
        </div>
        <button onClick={handleGenerateLink}>Generate Link</button>
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
}

export default App;

  