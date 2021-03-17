import { connectToDatabase } from "../../util/mongodb";

export default async function handler(req, res) {
    const { db } = await connectToDatabase();
    let data = req.body;
    data = JSON.parse(data);
    let doc = await db.collection("users").findOne({ email: data.email, password: data.password });
    console.log(doc)
    if (doc) {
        res.json(true);
    } else {
        res.json(false);
    }
}
