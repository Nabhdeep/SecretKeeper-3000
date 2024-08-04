import React, { useState, useEffect } from 'react';
import { decryptMessage, hashSHA256 } from './utils';
import { getSecret } from './services';


function SecretRetrieval({ secretId }) {
  const [key , setKey] = useState("")
  const [secret, setSecret] = useState('');
  const [uuid, setUUID] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordRequired, setIsPasswordRequired] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(()=>{
    setKey(window.location.hash.slice(1,window.location.hash.length))
    setUUID(window.location.pathname.split('/').at(-1))
  },[])

  
  const handleSubmit = (e) => {
    e.preventDefault();
    retrieveSecret();
  };

  const retrieveSecret = () => {
    getSecret({uuid , passphrase:hashSHA256(password)})
    .then((res)=>{
      let gotMsg = res.data.encryptedMessage
      if (!gotMsg){
        setError("No message found")
        return
      }
      const decryptedMessage = decryptMessage(gotMsg , key)
      if (!decryptedMessage || decryptedMessage.length == 0){
        setError("URL was tampered")
        return
      }
      setSecret(decryptedMessage);
    })
    .catch((err)=>{
      let ms = err?.response?.data?.error?.message
      console.log(err);
      setError(ms? ms : "some error")
    })
    
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (secret) {
    return (
      <div className="secret-display">
        <p style={{padding:'10px'}}>{secret}</p>
      </div>
    );
  }

  return (
    <div className="secret-retrieval">
      <h2>You have got a Message 📮</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password (Optional)"
          />
          <button type='submit'>View Secret</button>
        </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default SecretRetrieval;