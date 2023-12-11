const { Configuration, OpenAIApi } = require("openai");


async function generateImageFromText(text, dalleKey) {
    const config = new Configuration({
        apiKey: dalleKey,  
    });
    const openai = new OpenAIApi(config);
    
    try {
        const response = await openai.createImage({
            prompt: text,
            n: 1,
            size: "256x256"
        });
        
        if (response.data.data && response.data.data[0] && response.data.data[0].url) {
            return response.data.data[0].url;
        } else {
            throw new Error("Image URL not found in response.");
        }

    } catch (error) {
        throw new Error(`Error generating image: ${error.message}`);
    }
}


module.exports = generateImageFromText;
