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
  const [dalleKey, setDalleKey] = useState('');


  
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

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
        window.removeEventListener('resize', handleResize);
    };
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
        for(let i = 1; i < descMatch.length; i++) {
            if(descMatch[i]) {
                setDescription(descMatch[i]);
                break;
            }
        }
    }
 }


 const generateImage = async () => {
    setIsGenerating(true);
  
    try {
        const response = await axios.post('http://localhost:4000/api/wallet/generate_image', { 
            text: description, 
            dalleKey  
        });
        setImageUrl(response.data.imageUrl);
    } catch (error) {
        console.error('Error generating image:', error);
    } finally {
        setIsGenerating(false);
    }
  };

  
const saveImageDetails = async () => {
  if (!imageUrl) return;

  try {
      const response = await axios.post('http://localhost:4000/api/wallet/save_image_data', {
          imageUrl: imageUrl,
          transactionHash: hash,
          description,  
      });
      console.log(response.data.message);
  } catch (error) {
      console.error('Error saving image data:', error);
  }
};


 

  const uploadImage = async (imageFile) => {
    const formData = new FormData();
    formData.append('image', imageFile);
  
    try {
      const response = await axios.post('http://localhost:4000/api/upload_image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      const imageUrl = `http://localhost:4000/image/${response.data.file.filename}`;
      
      return response.data.imageUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      return null;
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


                <input 
                    value={dalleKey}
                    onChange={(e) => setDalleKey(e.target.value)}
                    placeholder="Type the DALL-E password"
                />


                <button onClick={generateImage}>Generate Image</button>
                <button onClick={saveImageDetails}>Save Image</button>
            </>
        ) : (


                <div className="button-container">
                        <canvas className="spline-background" ref={splineContainerRef}> {/*vlad chest-for-web spline design*/} 
                        </canvas>
                        <button className="memoria transparent-btn" onClick={() => setImageUrl('https://github.com/bancambios/PaiyApp-Hackaton-Etherfuse/blob/main/Images/Launch.png?raw=true')}>Generate a new memory</button>
                </div>
        )}
        {isGenerating && <p>Generating image...</p>}
    </div>
);
}


export default ImageGenerator;
