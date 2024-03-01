// Uses the MongoDB driver
const {MongoClient} = require("mongodb");

async function main() {

  // Replace below "YourAzureCosmosDBAccount" with the name of your Azure Cosmos DB 
  // account name and "YourAzureCosmosDBAccountKEY" with the Azure Cosmos DB account key.
  // Or replace it with the connection string if you have it.
  var url = "mongodb://YourAzureCosmosDBAccount:YourAzureCosmosDBAccountKEY@YourAzureCosmosDBAccount.mongo.cosmos.azure.com:10255/?ssl=true&retrywrites=false&replicaSet=globaldb&maxIdleTimeMS=120000&appName=@YourAzureCosmosDBAccount@";


  // define the connection using the MongoClient method ane the url above
  var mongoClient = new MongoClient(url, function(err,client)
    {
      if (err)
      {
        console.log("error connecting")
      }
    }
  );

  // open the connection
  await mongoClient.connect();

  // connect to the database "products"
  var ProductDatabase = mongoClient.db("products");

  // create a collection "documents" and add one document for "bread"
  var collection = ProductDatabase.collection('documents');
  var insertResult = await collection.insertOne({ ProductId: 1, name: "bread" });

  // return data where ProductId = 1
  const findProduct = await collection.find({ProductId: 1});
  await findProduct.forEach(console.log);

  // close the connection
  mongoClient.close();
}

main();