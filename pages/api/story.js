import nextConnect from 'next-connect';
import middleware from '../../middleware/middleware';
import { getStoryById, updateStoryById } from "../../db/stories";


const handler = nextConnect();

handler.use(middleware);

// handler.get(async (req, res) => {
//     const data = JSON.parse(req.body);
//     const doc = await db.collection('stories').insertOne(data);

//     if (doc.insertedCount > 0) {
//         res.json(JSON.stringify(doc.ops[0]));
//     } else {
//         res.error({error: 'Failed to post the story'})
//     }
// }),


handler.patch(async (req, res) => {
    const storyData = req.body
  
    const story = await getStoryById(req.db, storyData._id);
    console.log(story)
    if (storyData.title) {
        story.title = storyData.title
    }
    if (storyData.text) {
        story.text = storyData.text
    }
    if (storyData.genres) {
        story.genres = storyData.genres
    }
    console.log(story)
    delete story._id
    await updateStoryById(req.db, storyData._id, story)

    res.json({ story: story });
  });

export default handler;

