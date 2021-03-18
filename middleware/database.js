import { connectToDatabase } from "../util/mongodb";

export default async function database(req, res, next) {
    const { db, client } = await connectToDatabase();
    req.dbClient = client;
    req.db = db;
    return next();
}
