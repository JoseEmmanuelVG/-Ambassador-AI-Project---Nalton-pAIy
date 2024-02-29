require('dotenv').config();
const axios = require('axios');

async function generateImageFromText(text) {
    const apiBase = process.env.AZURE_OAI_ENDPOINT; // Asegúrate de tener esta variable en tu .env
    const apiKey = process.env.AZURE_OAI_KEY; // Asegúrate de tener esta variable en tu .env
    const apiVersion = '2023-06-01-preview';

    if (!apiKey || !apiBase) {
        throw new Error("Faltan el endpoint de Azure y/o la clave de suscripción");
    }

    const url = `${apiBase}openai/images/generations:submit?api-version=${apiVersion}`;
    const headers = {
        "Ocp-Apim-Subscription-Key": apiKey,
        "Content-Type": "application/json"
    };
    const body = {
        prompt: text,
        n: 1,
        size: "512x512"
    };

    try {
        const submission = await axios.post(url, body, { headers });
        const operationLocation = submission.headers['operation-location'];

        let status = "";
        let response;
        while (status !== "succeeded") {
            await new Promise(resolve => setTimeout(resolve, 3000)); // Esperar 3 segundos
            response = await axios.get(operationLocation, { headers });
            status = response.data['status'];
        }

        if (response.data.result && response.data.result.data && response.data.result.data.length > 0) {
            const imageUrl = response.data.result.data[0].url;
            return imageUrl;
        } else {
            throw new Error("La respuesta de Azure DALL·E no contiene imágenes");
        }
    } catch (error) {
        console.error("Error al generar la imagen con Azure DALL·E:", error.response ? error.response.data : error);
        throw new Error(`Error al generar la imagen: ${error.response ? error.response.data.error.message : error.message}`);
    }
}

module.exports = generateImageFromText;
