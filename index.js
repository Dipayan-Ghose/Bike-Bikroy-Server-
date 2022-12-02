const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const express = require("express");
const cors = require("cors");
const { response, query } = require("express");
const jwt = require('jsonwebtoken');
const app = express();
const port = process.env.PORT || 5000;
require("dotenv").config();
// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// Middle Wares
app.use(cors());
app.use(express.json()); 

app.get('/', (req, res)=>{
    res.send('Bike Bikroy api is running');
});

const uri = `mongodb+srv://${process.env.dbUser}:${process.env.dbPassword}@database.sgb0d3l.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
        const productsCollection = client.db("bike-bikroy").collection("products");
    
        app.get("/categories", async (req, res) => {
            const query = {};
            const cursor = productsCollection.find(query);
            const categories = await cursor.toArray();
            res.send(categories);
          });
        
        app.get("/categories/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const products = await productsCollection.find(query).toArray();
            res.send(products);
        });
    
    
    }
    finally {
      
    }
  }
  


run().catch(err=> console.log(err));




app.listen(port, ()=>{
    console.log("Bike Bikroy server api is running");
});