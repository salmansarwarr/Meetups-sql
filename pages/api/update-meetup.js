import { MongoClient, ObjectId } from "mongodb"
//  /api/new-meetup
//  POST /api/update-meetup


async function handler(req, res) {
    if(req.method == "POST") {
        const toUpdate = {
            title: req.body.title,
            image: req.body.image,
            address: req.body.address,
            description: req.body.description
        }

        const client = await MongoClient.connect('mongodb+srv://msalmansarwar:1ka2ka3ka4@cluster0.0iczgaa.mongodb.net/meetups?retryWrites=true&w=majority')
        const db = client.db(); //selects database

        const meetupsCollections = db.collection('meetups');  //selects collection if exists, otherwise create collection
        const result = await meetupsCollections.updateOne({_id: ObjectId(req.body._id)}, {$set: toUpdate})
        console.log(result);
        
        client.close();

        res.status(201).json({message: 'meetups updated'})
    }
}

export default handler;