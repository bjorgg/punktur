import { connectToDatabase } from "../../util/mongodb";

export default async function handler(req, res){
    const {db} = await connectToDatabase();
    console.log('HAALOS')
    const data = req.query;

    const response = await db.collection('stories').aggregate([
        {
            $search: {
                serach: {
                    query: req.query.term,
                    path: ["title"]
                }
            }
        }, {
            $limit: 20
        }
    ])

    res.json(response);
}