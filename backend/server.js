const express = require('express');
const {MongoClient, ObjectId} = require('mongodb');
const bodyParser = require('body-parser');
const { insertData, findData, findAll } = require('./touch-db.js'); // Import the functions from touch-db.js

const app = express();
const port = 3000;

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

app.use(bodyParser.json());

app.post('/post-data', async(req, res) => {
    try{
        const {dataType, data} = req.body;

        // Validate dataType (to ensure it's a valid collection name)
        const allowedDataTypes = ["Locations", "Users", "Photos", "EmergencyContacts"];
        if (!allowedDataTypes.includes(dataType)) {
        return res.status(400).json({ message: "Invalid data type" });
        }
        
        const insertedId = await insertData(dataType, data);
        
        res.status(201).json({ insertedId });
    } catch (error) {
        res.status(500).json({ message: "server error oof"});
    }
});

app.get('/get/:dataType/:id', async (req, res) => {
    try{
        const {dataType, id} = req.params;
        const query = { _id: new ObjectId(id) };

        const allowedDataTypes = ["Locations", "Users", "Photos", "EmergencyContacts"];
        if (!allowedDataTypes.includes(dataType)) {
        return res.status(400).json({ message: "Invalid data type" });
        }

        const data = await findData(dataType, query);

        if (data) {
            res.status(200).json(data);
          } else {
            res.status(404).json({ message: `${dataType} not found` });
          }
    } catch (error){
        res.status(500).json({ message: "ERROR BAD"});
    }
});

app.get('/all/:dataType', async (req, res) => {
    try {
        const { dataType } = req.params;

        // Validate dataType (to ensure it's a valid collection name)
        const allowedDataTypes = ["Locations", "Users", "Photos", "EmergencyContacts"];
        if (!allowedDataTypes.includes(dataType)) {
            return res.status(400).json({ message: "Invalid data type" });
        }

        // Use the findAll function to retrieve all documents from the collection
        const data = await findAll(dataType);

        res.status(200).json(data);
    } catch (error) {
        console.error("An error occurred:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});


  // Start the Express server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});