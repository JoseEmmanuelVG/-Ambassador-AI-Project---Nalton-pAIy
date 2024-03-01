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

  // connect to the database "HumanResources"
  var EmployeeDatabase = mongoClient.db("HumanResources");

  // create the Employee collection with a throughput of 1000 RUs and with EmployeeId as the sharding key
  var result = EmployeeDatabase.command({customAction: "CreateCollection", collection: "Employee", offerThroughput: 1000, shardKey: "EmployeeId"});

  // Connect to the collection "Employee" and add two documents for "Marcos" and "Tam" 
  var collection = EmployeeDatabase.collection('Employee');

  var insertResult = await collection.insertOne({EmployeeId: 1, email: "Marcos@fabrikam.com", name: "Marcos"});
  insertResult = await collection.insertOne({EmployeeId: 2, email: "Tam@fabrikam.com", name: "Tam"});

  // return data where ProductId = 1
  const findProduct = await collection.find({EmployeeId: 1});
  await findProduct.forEach(console.log);

  // close the connection
  mongoClient.close();
}

main();