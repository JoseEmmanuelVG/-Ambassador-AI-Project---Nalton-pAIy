const { Configuration, OpenAIApi } = require("openai");

const config = new Configuration({
	apiKey: "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",
});

const openai = new OpenAIApi(config);

const prompt = "Take care of yourself today";
const numberOfImages = 1;
const imageSize = "256x256"; 

openai
	.createImage({
		prompt: prompt,
		n: numberOfImages,
		size: imageSize,
	})
	.then((data) => {
		console.log(data.data.data);
	})
	.catch((error) => {
		console.error('API Error:', error.response ? error.response.data : error.message);
	});
