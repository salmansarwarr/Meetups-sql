import { MongoClient } from "mongodb"
//  /api/new-meetup
//  POST /api/new-meetup


async function handler(req, res) {
    if(req.method == "POST") {
        const data = req.body;

        const client = await MongoClient.connect('mongodb+srv://msalmansarwar:1ka2ka3ka4@cluster0.0iczgaa.mongodb.net/meetups?retryWrites=true&w=majority')
        const db = client.db(); //selects database

        const meetupsCollections = db.collection('meetups');  //selects collection if exists, otherwise create collection
        const result = await meetupsCollections.insertOne(data)  //returns object e.g: { acknowledged: true, insertedId: new ObjectId("634a6d91eb2682c24a373e23") }
        console.log(result);

        client.close();

        res.status(201).json({message: 'meetups inserted'})
    }
}

export default handler;