import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles/SavedImagesStyles.css';

const SavedImagesPage = () => {
    const [imagesData, setImagesData] = useState([]);

    useEffect(() => {
        const fetchImagesData = async () => {
            try {
                const token = localStorage.getItem('jwtToken'); // Obtener el token del almacenamiento local
                if (!token) {
                  console.error('No se encontró el token JWT. Asegúrate de estar autenticado.');
                  return;
                }
                
                const config = {
                  headers: {
                    Authorization: `Bearer ${token}`, // Incluir el token en el header Authorization
                  },
                };
            
                const response = await axios.get('http://localhost:4000/api/wallet/get_all_image_urls', config);
                setImagesData(response.data);
              } catch (error) {
                console.error('Error fetching saved images:', error);
              }
        };
    
        fetchImagesData();
    }, []);

    const deleteImageDetails = async (imageUrl, hash, description) => {
        const confirmation = prompt('Ingrese el hash, url, o descripción para confirmar la eliminación:');
        if (!confirmation) return;
    
        // Check confirmation
        if (confirmation !== imageUrl && confirmation !== hash && confirmation !== description) {
            alert('La confirmación no coincide. Eliminación cancelada.');
            return;
        }
    
        // Obtener el token JWT del almacenamiento local
        const token = localStorage.getItem('jwtToken');
        if (!token) {
          alert('No estás autenticado. Por favor, inicia sesión.');
          return;
        }
    
        // Configuración de Axios con el token JWT
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            // Aquí especificamos el cuerpo de la solicitud para Axios en DELETE
            data: { imageUrl, hash, description }
        };
    
        try {
            const response = await axios.delete('http://localhost:4000/api/wallet/delete_saved_image', config);
    
            alert(response.data.message);
    
            // Removing the image from the state
            setImagesData(prevImages => prevImages.filter(img => img.imageUrl !== imageUrl));
        } catch (error) {
            console.error('Error eliminando los datos de la imagen:', error);
            alert('Error eliminando los datos de la imagen.');
        }
    };
    



    const [openedCard, setOpenedCard] = useState(null);

    const toggleImageDetails = (index) => {
        if (openedCard === index) {
            setOpenedCard(null);
        } else {
            setOpenedCard(index);
        }
    };


    const handleDownload = (imageData) => {
        const link = document.createElement('a');
        link.href = imageData.imageUrl;
        link.download = 'saved_image.jpg'; 
        document.body.appendChild(link);
        link.click();
    
        const details = `
            _id: ${imageData._id}
            imageUrl: ${imageData.imageUrl}
            transactionHash: ${imageData.transactionHash}
            description: ${imageData.description}
            __v: ${imageData.__v}
        `;
        const blob = new Blob([details], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const txtLink = document.createElement('a');
        txtLink.href = url;
        txtLink.download = 'image_details.txt';
        document.body.appendChild(txtLink);
        txtLink.click();
        document.body.removeChild(txtLink);
    };

    
    return (
        <div className="container">
            {imagesData.map((imageData, index) => (
                <div key={index} className={`image-card ${openedCard === index ? 'opened' : ''}`} onClick={() => toggleImageDetails(index)}>
                    <img src={imageData.imageUrl} alt="Saved Image" />
                    <div className="image-content">
                        <p>Date: {imageData.creationDate}</p>
                        <p>Transaction Hash: {imageData.transactionHash}</p>
                        <p>Description: {imageData.description}</p>
                        <button className="delete-button" onClick={(e) => { e.stopPropagation(); deleteImageDetails(imageData.imageUrl, imageData.transactionHash, imageData.description); }}>Delete Image</button>
                        <button onClick={(e) => { e.stopPropagation(); handleDownload(imageData); }}>Download</button>
                    </div>
                </div>
            ))}
        </div>
    );
    
};

export default SavedImagesPage;