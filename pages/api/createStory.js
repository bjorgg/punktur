import { connectToDatabase } from "../../util/mongodb";

export default async function handler(req, res) {
    const { db } = await connectToDatabase();
    const data = Object.assign({}, req.body);
    
        const doc = await db.collection('stories').insertOne(data);
    
        if (doc.insertedCount > 0) {
            res.json(JSON.stringify(doc.ops[0]));
        } else {
            res.error({error: 'Failed to post the story'})
        }

}
