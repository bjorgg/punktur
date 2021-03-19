import { connectToDatabase } from "../../util/mongodb";

export default async function handler(req, res) {
    const { db } = await connectToDatabase();
    let data = req.body;
    data = JSON.parse(data);
    // if (req.method === 'POST') {
        const doc = await db.collection('stories').insertOne(data);
    
        if (doc.insertedCount > 0) {
            res.json(JSON.stringify(doc.ops[0]));
        } else {
            res.error({error: 'Failed to post the story'})
        }
    // } else if (req.method === 'PATCH'){
    //     const myQuery = {id: req.query.id}
    //     const newValues = {$set: data}
    //     const doc = await db.collection('stories').updateOne(myQuery, newValues);
    // }
}
