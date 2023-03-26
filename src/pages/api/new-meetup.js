import db from '../../utils/db';
//  /api/new-meetup
//  POST /api/new-meetup

async function handler(req, res) {
    if (req.method == 'POST') {
        try {
            console.log(req.body);
            const { title, image, address, description } = req.body;
            const query = `INSERT INTO meetups (title, image, address, description) 
                           VALUES ('${title}', '${image}', '${address}', '${description}');`;
            db.query(query, (error, result) => {
                if (error) {
                    throw error;
                } else {
                    res.status(201).json({ message: 'meetups inserted' });
                }
            });
        } catch (error) {
            console.log(error);
        }
    }
}

export default handler;
