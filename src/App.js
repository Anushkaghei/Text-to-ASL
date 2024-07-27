import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [inputText, setInputText] = useState('');
  const [outputSign, setOutputSign] = useState('');

  useEffect(() => {
    convertToSignLanguage();
  }, [inputText]);

  function removeAccents(text) {
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  function convertToSignLanguage() {
    const textWithoutAccents = removeAccents(inputText);
    setOutputSign(textWithoutAccents);
  }

  function clearText() {
    setInputText('');
    setOutputSign('');
  }

  function readOutLoud() {
    if ('speechSynthesis' in window) {
      var synthesis = window.speechSynthesis;
      var message = new SpeechSynthesisUtterance(inputText);
      synthesis.speak(message);
    } else {
      alert("Your browser does not support speech synthesis.");
    }
  }

  function stopReading() {
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
    }
  }

  return (
    <div className="container">
      <h1 tabIndex="0">Convert to Sign Language and Voice</h1>
      <textarea
        id="inputText"
        placeholder="Paste or type the text here"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      /><br />
      <button className="button-style" onClick={readOutLoud}>Read out loud</button>
      <button className="button-style" onClick={stopReading}>Stop Reading</button>
      <div tabIndex="0" id="outputSign">{outputSign}</div>
      <button className="button-style" onClick={clearText}>Clear</button>
    </div>
  );
}

export default App;
