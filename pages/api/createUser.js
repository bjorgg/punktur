import { connectToDatabase } from "../../util/mongodb";

export default async function handler(req, res){
    const {db} = await connectToDatabase();

    const data = req.query;

    const response = await db.collection('users').insertOne(data)

    res.json(response);
}