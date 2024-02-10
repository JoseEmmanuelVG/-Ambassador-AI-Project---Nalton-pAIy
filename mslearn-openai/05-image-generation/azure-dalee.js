require('dotenv').config();
const axios = require('axios');

async function main() {
    try {
        // Cargar configuración del servicio Azure OpenAI
        const apiBase = process.env.AZURE_OAI_ENDPOINT;
        const apiKey = process.env.AZURE_OAI_KEY;
        const apiVersion = '2023-06-01-preview';

        // Obtener el prompt para la generación de la imagen
        const prompt = "Take care of yourself today"; // Modificar según sea necesario

        // Hacer la llamada inicial para comenzar el trabajo
        const url = `${apiBase}openai/images/generations:submit?api-version=${apiVersion}`;
        const headers = { "api-key": apiKey, "Content-Type": "application/json" };
        const body = {
            "prompt": prompt,
            "n": 1,
            "size": "512x512"
        };

        const submission = await axios.post(url, body, { headers });
        const operationLocation = submission.headers['operation-location'];

        // Sondear la URL de callback hasta que el trabajo haya finalizado con éxito
        let status = "";
        let response;
        while (status !== "succeeded") {
            await new Promise(resolve => setTimeout(resolve, 3000)); // Esperar 3 segundos
            response = await axios.get(operationLocation, { headers });
            status = response.data['status'];
        }

        // Obtener los resultados
        const imageUrl = response.data['result']['data'][0]['url'];

        // Mostrar la URL de la imagen generada
        console.log(imageUrl);

    } catch (ex) {
        console.error(ex);
    }
}

main();

// second image generation:
// Enter a prompt to request an image: Take care of yourself today
// https://dalleproduse.blob.core.windows.net/private/images/97b1f7bc-bc97-47eb-a9a4-8f77defae878/generated_00.png?se=2024-02-11T01%3A28%3A19Z&sig=UEgRTsBKJHJO3DDmcfBCfIur5yQc2F71lWvnREjHcHk%3D&ske=2024-02-15T18%3A24%3A22Z&skoid=09ba021e-c417-441c-b203-c81e5dcd7b7f&sks=b&skt=2024-02-08T18%3A24%3A22Z&sktid=33e01921-4d64-4f8c-a055-5bdaffd5e33d&skv=2020-10-02&sp=r&spr=https&sr=b&sv=2020-10-02