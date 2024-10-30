const { MongoClient } = require('mongodb');

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

async function connectToDB() {
    if(!client.topology || !client.topology.isConnected()){
        await client.connect();
        console.log("connected to mongodb yessssssssir");
    }
    const database = client.db("hackru_backend");
    return database;
}

async function getCollection(dataType){
    const db = await connectToDB();
    return db.collection(dataType);
}


async function insertData(dataType, data){
    try{
        const collection = await getCollection(dataType);
        const result = await collection.insertOne(data);
        return result.insertedId
    } catch (error){
        console.error("fuck you: ", error);
        throw error;
    } 
}

async function findData(dataType, query){
    try{
        const collection = await getCollection(dataType);
        const data = await collection.findOne(query);
        return data;
    } catch(error){
        console.error("system error go fuck yourself: ", error);
        throw error;
    }
}

async function findAll(dataType){
    try{
        const collection = await getCollection(dataType);
        // Use the .find() method to get all documents in the collection
        const cursor = collection.find({});

        // Convert the cursor to an array
        const allDocuments = await cursor.toArray();

        return allDocuments;
    } catch(error){
        console.error("system error go fuck yourself: ", error);
        throw error;
    }
}

module.exports = {
    insertData,
    findData,
    findAll
};