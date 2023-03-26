import db from '../../utils/db';
//  /api/new-meetup
//  POST /api/new-meetup

async function handler(req, res) {
    if (req.method == 'POST') {
        try {
            console.log(req.body['0']._id);
            const id = req.body['0']._id;
            const { title, image, address, description } = req.body;
            const query = `UPDATE meetups 
                           SET title = '${title}', 
                               image = '${image}', 
                               address = '${address}', 
                               description = '${description}' 
                           WHERE _id = ${id}`;
            db.query(query, (error, result) => {
                if (error) {
                    throw error;
                } else {
                    res.status(201).json({ message: 'meetup updated' });
                }
            });
        } catch (error) {
            console.log(error);
        }
    }
}

export default handler;
