import db from '../../utils/db';
//  /api/new-meetup
//  POST /api/new-meetup

async function handler(req, res) {
    if (req.method == 'POST') {
        try {
            const id = req.body;
            const query = `DELETE FROM meetups WHERE _id = ${id};`;
            db.query(query, (error, result) => {
                if (error) {
                    throw error;
                } else {
                    res.status(201).json({ message: 'meetup deleted' });
                }
            });
        } catch (error) {
            console.log(error);
        }
    }
}

export default handler;
