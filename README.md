# -Ambassador-AI-Project---Nalton-pAIy

The proposal is an innovative application designed to facilitate user interaction with financial transactions, using Ripple's XRPL (XRP Ledger Testnet) as a demonstration platform. This advanced system allows users to execute transactions simply and directly, using text or voice commands.

### Key application functionalities:

- **Intuitive Interaction:** Users can communicate their transaction intentions via text or voice, making the process more accessible and convenient, especially for those unfamiliar with traditional financial systems.

- **Use of Artificial Intelligence:** Once the user expresses their transaction intent, the application uses AI to interpret, process and prepare the transaction. This process includes verifying the validity of the transaction and confirming the details with the user prior to execution.

- **Pre-Execution Summary:** Before any transaction is executed, the application provides a detailed summary. This summary includes crucial information such as the amount, the recipient and any associated fees, ensuring that the user has all the information needed to make an informed decision.

- **Memorable Image Generation:** A distinctive feature of this application is its ability to generate images associated with meaningful transactions. This not only helps users remember important transactions, but also adds a personal and emotional element to financial management.

- **Encouraging Financial Literacy:** By making financial transactions more interactive and personally relevant, the app has the potential to increase user interest and understanding of financial matters. This can lead to better financial education and greater responsibility in personal financial management.

The implementation of this application on Ripple's XRPL Testnet shows its viability in a controlled test environment, allowing developers to fine-tune and enhance its features prior to possible deployment on production networks.

This technological solution not only seeks to simplify financial transactions, but also aims to integrate them more meaningfully into people's daily lives, thus promoting a deeper and more educational relationship with personal finance.


**NALTON_WALLET (Web Application NOW)**
Utilizes technologies like XRPL (XRP Ledger), Smart Contracts, XRPL APIs, OpenAI APIs, and more.
Includes components such as transaction summary, wallet browser (using basic AI for transaction detection), local wallet modals, and more.
Backed by a Node.js backend with MongoDB for storing encrypted XRPL testnet account information.
Implements features for saving addresses and keys, making transactions through text input, viewing transaction history, and generating images for transactions. Challenges we ran into
Demo Video (without User register):
https://vimeo.com/856631154?share=copy





# **Azure Implementation**
We plan to implement wallet connectivity for XRPL and Metamask devnet, as well as different wallet connect wallets to make the application a multichain site. In order to increase the security and not need to save the sensitivity aaccount information, or use a better ways to save it The future of Nalton Paiy involves further refining the application, expanding its compatibility with different wallet connectors, and exploring integration with the Ripple CBDC Innovate Payment Service and international banking networks. The team also plans to enhance security, improve user experience, and potentially migrate to a more comprehensive cloud solution like Azure Cloud:

- Use key vault to save the secrets keys
- Use Azure Cosmos Db to save the images and the same service or another focus to save the accounts if it is necesary
- Use the Azure open AI services to get a full Azure Cloud connection Apis
