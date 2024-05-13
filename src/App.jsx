import React, { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";

const App = () => {
  const [password, setPassword] = useState(''); // using controlled component for password input using useState
  const [length, setLength] = useState(5);
  const [numbers, setNumbers] = useState(false);
  const [chars, setChars] = useState(false);  
  const passwordRef = useRef(null); // useRef value is null because we are not storing any value initially.
  const [copied, setCopied] = useState('Copy'); // Copy button changing from Copy to Copied.

  const generatePassword = useCallback(() => { 
    let pass = '';  // Empty password variable which will contain the password value.
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'; // Default Alphabetic characters.
    if(numbers) str += '0123456789'; // Check if Numbers are allowed
    if(chars) str += '~!@#$%^&*_+'; // Check if Special Characters are allowed.

    for(let i = 1; i <= length; i++){ // Looping through str variable to get the condition based password.
      let char = Math.floor(Math.random() * str.length); // Selecting random number between str variable length.
      pass += str.charAt(char); // Storing each Character inside password variable.
    }

    setPassword(pass); // Updating Password state to pass variable.
  }, [length, numbers, chars]) // Dependencies to re create the generatePassword function if any of these dependency change.


  const copyPassword = () => { // A function to copy password to clipboard.
    passwordRef.current?.select(); // Selecting referenced input value.
    window.navigator.clipboard.writeText(password); // Copying password to clipboard
    setCopied('Copied'); // Updating copied state to Copied which will be reflected in the Copy button.
  }
  useEffect(() => { // A function to call these functions if any of the given dependencies change.
    generatePassword(); 
    setCopied('Copy'); // if any dependency changes the Copied state will be set to 'Copy' again.
  }, [length, numbers, chars, generatePassword]);


  return (
    <>
      <h1>Password Generator</h1>
      <div className="main-div">
        <div className="password-box">
          <input type="text" className="pass-input" readOnly value={password} ref={passwordRef}/> <button className="copy-btn" onClick={copyPassword}>{copied}</button>
        </div>
        <div className="feature-box">
        <label htmlFor="Length">Length: {length}</label><input type="range" min={5} max={25} id="Length" value={length} onChange={(e)=>{setLength(e.target.value)}}/>
        <label htmlFor="numbers">Numbers</label><input type="checkbox" id="numbers" checked={numbers} onChange={()=>setNumbers(!numbers)}/>
        <label htmlFor="char">Special Characters</label><input type="checkbox" id="char" checked={chars} onChange={()=>setChars(!chars)}/>
        </div>
      </div>
    </>
  );
};

export default App;
