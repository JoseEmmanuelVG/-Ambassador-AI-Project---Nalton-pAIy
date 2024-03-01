import requests
import time
import os
from dotenv import load_dotenv

def main(): 
        
    try:
        # Get Azure OpenAI Service settings
        load_dotenv()
        api_base = os.getenv("AZURE_OAI_ENDPOINT")
        api_key = os.getenv("AZURE_OAI_KEY")
        api_version = '2023-06-01-preview'
        
        # Get prompt for image to be generated
        prompt = input("\nEnter a prompt to request an image: ")

        # Make the initial call to start the job
        url = "{}openai/images/generations:submit?api-version={}".format(api_base, api_version)
        headers= { "api-key": api_key, "Content-Type": "application/json" }
        body = {
            "prompt": prompt,
            "n": 1,
            "size": "512x512"
        }
        submission = requests.post(url, headers=headers, json=body)

        # Get the operation-location URL for the callback
        operation_location = submission.headers['Operation-Location']

        # Poll the callback URL until the job has succeeeded
        status = ""
        while (status != "succeeded"):
            time.sleep(3) # wait 3 seconds to avoid rate limit
            response = requests.get(operation_location, headers=headers)
            status = response.json()['status']

        # Get the results
        image_url = response.json()['result']['data'][0]['url']

        # Display the URL for the generated image
        print(image_url)
        

    except Exception as ex:
        print(ex)

if __name__ == '__main__': 
    main()

# first image generation:
# Enter a prompt to request an image: Take care of yourself today
# https://dalleproduse.blob.core.windows.net/private/images/3c98c7e1-63e0-4cf8-b032-c86a91a83657/generated_00.png?se=2024-02-11T01%3A19%3A27Z&sig=GQPEph9tzDe2iiZcjlnhhiiHYX4i1WVqOxh5h%2B95BXg%3D&ske=2024-02-15T10%3A40%3A42Z&skoid=09ba021e-c417-441c-b203-c81e5dcd7b7f&sks=b&skt=2024-02-08T10%3A40%3A42Z&sktid=33e01921-4d64-4f8c-a055-5bdaffd5e33d&skv=2020-10-02&sp=r&spr=https&sr=b&sv=2020-10-02