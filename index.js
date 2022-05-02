const express = require('express');
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 5000;
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const res = require('express/lib/response');

app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.rfwzc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {

    try {
        await client.connect();
        const serviceCollection = client.db('Carphone-warehouse').collection('service');

        app.get('/service', async (req, res) => {
            const query = {};
            const cursor = serviceCollection.find(query);
            const services = await cursor.toArray();
            res.send(services);
        });

        app.get('/service/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const service = await serviceCollection.findOne(query);
            res.send(service);
        });

        //POST ADD IN MY ITEMS.
        app.post('/service', async (req, res) => {
            const newService = req.body;
            const result = await serviceCollection.insertOne(newService);
            res.send(result);
        });

        // app.get('/service', async(req, res)=>{
        //     const id = req.params.id;
        //     const query = {_id: ObjectId(id)};
        //     const items = await serviceCollection.findOne(query);
        //     res.send(items)
        // })

        // update user quentity and setup
        app.put('/service/:id', async (req, res) => {
            const id = req.params.id;
            const updateUser = req.body.Quantity;
            console.log(req.body.Quantity)
            const filter = { _id: ObjectId(id) };
            const options = { upsert: true };
            const updatedDoc = {
                $set: { Quantity: updateUser }
            }
            const result = await serviceCollection.updateOne(filter, updatedDoc, options);
            res.send(result)
        });



        // delete a user
        app.delete('/service/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await ItemCollection.deleteOne(query);
            res.send(result)
        });


    }


    finally {

    }

}
run().catch(console.dir)



app.get('/', (req, res) => {
    res.send('running this website');
});



app.listen(port, () => {
    console.log('excemple app lisingin', port);
});