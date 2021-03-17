import { connectToDatabase } from "../../util/mongodb";

export default async function handler(req, res) {
    const { db } = await connectToDatabase();
    let data = req.body;
    data = JSON.parse(data);
    let doc = await db.collection('users').insertOne(data);

    if (doc.insertedCount > 0) {
        res.json(JSON.stringify(doc.ops[0]));
    } else {
        res.error({error: 'Failed to create user'})
    }
}
