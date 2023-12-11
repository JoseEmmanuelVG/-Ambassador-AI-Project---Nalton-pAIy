import React, { useState, useContext } from 'react';
import TransactionSummary from './transaction_summary';
import WalletContext from './WalletContext';
import axios from 'axios';
import './styles/BrowserStyles.css';


const Browser = () => {
  const [transactionText, setTransactionText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const { selectedWallet } = useContext(WalletContext);
  const [destination, setDestination] = useState('');
  const [currency, setCurrency] = useState('');
  const [amount, setAmount] = useState('');
  const [gas, setGas] = useState('');


  const toggleListen = () => {
    setIsListening(!isListening);
    if (isListening) {
      recognition.start();
    } else {
      recognition.stop();
    }
  }

  const processText = (text) => {
    const words = text.split(' ');
    let commandIndex = -1;
  
    const commandWords = ['send', 'enviar', 'transfer', 'transferir', 'mandar'];
  
    for (let i = 0; i < words.length; i++) {
      if (commandWords.includes(words[i].toLowerCase())) {
        commandIndex = i;
        continue;
      }
    
      if (commandIndex > -1 && i === commandIndex + 1) {
        const amountToSend = parseFloat(words[i]);
        if (!isNaN(amountToSend)) {
          setAmount(amountToSend.toString());
        }
        const currencyType = words[i + 1];
        if (currencyType) {
          setCurrency(currencyType.toUpperCase());
        }
      } else if (words[i].toLowerCase() === 'a' || words[i].toLowerCase() === 'to') {
        const destinationAddress = words[i + 1];
        setDestination(destinationAddress);
      }
    }
    }

  const submitTransaction = async () => {
    console.log('Cartera seleccionada:', selectedWallet); 
    try {
      const response = await axios.post('http://localhost:4000/api/send_xrp', {
        destination: destination,
        amount: amount 
      });      
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  const recognition = new window.webkitSpeechRecognition();

  recognition.onstart = () => {
    console.log('Voice recognition activated. Try speaking into the microphone.');
  }

  recognition.onresult = (event) => {
    const current = event.resultIndex;
    const transcript = event.results[current][0].transcript;
    setTransactionText(transcript);
    processText(transcript);
  }

  const clearTransaction = () => {
    setTransactionText('');
    setDestination('');
    setCurrency('');
    setAmount('');
    setGas('');
  };

  return (
    <div className="browser-container">
<spline-viewer url="https://prod.spline.design/vnKPzDHOTHc3e5-j/scene.splinecode"></spline-viewer><button className="listen-button" onClick={toggleListen}>
        {isListening ? 'Stop Listening' : 'Start Listening'}
        {isListening ? <img src="https://media0.giphy.com/media/llb8yBLOuZSfctjclW/giphy.gif?cid=6c09b952w5sauvw9trin8ac5qowx2p7yvq32f6j88xew6iis&ep=v1_internal_gif_by_id&rid=giphy.gif&ct=s" alt="Listening Icon" style={{ marginLeft: '5px', width: '30px' }} /> : null} 
      </button>
      <textarea
        value={transactionText}
        onChange={(e) => {
          setTransactionText(e.target.value);
          processText(e.target.value);
        }}
        placeholder="Write your transaction here... Write your transaction here ..."
        className="transaction-textarea"
      />
      <button className="clear-button" onClick={clearTransaction}>
        Delete Summary
      </button>
      <TransactionSummary
        wallet={selectedWallet}
        destination={destination}
        currency={currency}
        amount={amount}
        gas="See on details"
        submitTransaction={submitTransaction}
      />
    </div>
  );
};

export default Browser;
