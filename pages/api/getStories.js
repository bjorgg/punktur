import { connectToDatabase } from "../../util/mongodb";
import { getStories } from "../../db/stories";

export default async function handler(req, res) {
  let genres;
  if (typeof req.query.genres === 'string') {
    genres = [req.query.genres];
  } else {
    genres = req.query.genres;
  }
  
  const { db } = await connectToDatabase();
  const stories = await getStories(db, 20, genres);
  // console.log(stories);

  res.json(JSON.stringify(stories));
}
