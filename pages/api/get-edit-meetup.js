import { MongoClient, ObjectId } from "mongodb"
//  /api/new-meetup
//  POST /api/delete-meetup


async function handler(req, res) {
    if(req.method == "POST") {
        const id = req.body;

        const client = await MongoClient.connect('mongodb+srv://msalmansarwar:1ka2ka3ka4@cluster0.0iczgaa.mongodb.net/meetups?retryWrites=true&w=majority')
        const db = client.db(); //selects database

        const meetupsCollections = db.collection('meetups');  //selects collection if exists, otherwise create collection
        const result = await meetupsCollections.findOne({_id: ObjectId(id)}) 

        client.close();

        res.status(201).json(result)
    }
}

export default handler;