import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './styles/NFTStyles.css';
import { Application } from '@splinetool/runtime';

const ImageGenerator = () => {
  const [text, setText] = useState('');
  const [imageUrl, setImageUrl] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [hash, setHash] = useState('');
  const [description, setDescription] = useState('');

  const splineContainerRef = useRef(null);

  useEffect(() => {
    if (splineContainerRef.current) {
      const app = new Application(splineContainerRef.current);
      app.load('https://prod.spline.design/yavXIDJr3XAZKdvX/scene.splinecode');

      splineContainerRef.current.width = splineContainerRef.current.offsetWidth;
      splineContainerRef.current.height = splineContainerRef.current.offsetHeight;
    }
  }, []);

  useEffect(() => {
    function handleResize() {
      if (splineContainerRef.current) {
        splineContainerRef.current.width = splineContainerRef.current.offsetWidth;
        splineContainerRef.current.height = splineContainerRef.current.offsetHeight;
      }
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    extractTextDetails();
  }, [text]);

  const extractTextDetails = () => {
    const hashRegex = /hash ([\w\d]+)/;
    const descRegex = /descripción ([\w\s\d]+)|descriptivo ([\w\s\d]+)|mensaje ([\w\s\d]+)|concepto ([\w\s\d]+)|message ([\w\s\d]+)|concept ([\w\s\d]+)|description ([\w\s\d]+)/;
    const hashMatch = text.match(hashRegex);
    const descMatch = text.match(descRegex);

    if (hashMatch) setHash(hashMatch[1]);
    if (descMatch) {
      for (let i = 1; i < descMatch.length; i++) {
        if (descMatch[i]) {
          setDescription(descMatch[i]);
          break;
        }
      }
    }
  };

  const generateImage = async () => {
    setIsGenerating(true);

    try {
      const token = localStorage.getItem('jwtToken');
      const response = await axios.post(
        'http://localhost:4000/api/wallet/generate_image',
        { text },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setImageUrl(response.data.imageUrl);
    } catch (error) {
      console.error('Error generating image:', error.response?.data?.message || 'Error interno del servidor');
      alert('Error generando la imagen. Por favor, intenta de nuevo más tarde.');
    } finally {
      setIsGenerating(false);
    }
  };

  const saveImageDetails = async () => {
    if (!imageUrl) return;
  
    // Asegúrate de obtener el token de manera correcta
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      alert('No estás autenticado. Por favor, inicia sesión.');
      return;
    }
  
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Formato correcto para enviar el token
      },
    };
  
    try {
      const response = await axios.post(
        'http://localhost:4000/api/wallet/save_image_data',
        { imageUrl: imageUrl, transactionHash: hash, description: description },
        config
      );
      console.log(response.data.message);
      alert('Imagen guardada correctamente.');
    } catch (error) {
      console.error('Error saving image data:', error);
      alert('Error guardando los datos de la imagen. Por favor, verifica tu sesión.');
    }
  };
  

  return (
    <div className="container">
      {imageUrl ? (
        <>
          <div className="image-container">
            <img src={imageUrl} alt="Generated from text" />
          </div>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Write the instruction with hash and description"
          />
          <div>
            <strong>Resumen:</strong>
            <p>Texto descriptivo: {description}</p>
            <p>Hash: {hash}</p>
          </div>
          <button onClick={generateImage}>Generate Image</button>
          <button onClick={saveImageDetails}>Save Image</button>
        </>
      ) : (
        <div className="button-container">
          <canvas className="spline-background" ref={splineContainerRef}></canvas>
          <button className="memoria transparent-btn" onClick={() => setImageUrl('https://github.com/JoseEmmanuelVG/-Ambassador-AI-Project---Nalton-pAIy/blob/main/images/Launch.png?raw=true')}>Generate a new memory</button>
        </div>
      )}
      {isGenerating && <p>Generating image...</p>}
    </div>
  );
};

export default ImageGenerator;
