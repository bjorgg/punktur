import nextConnect from 'next-connect';
import middleware from '../../middleware/middleware';
import { getStoryById, updateStoryById, deleteStoryById } from "../../db/stories";


const handler = nextConnect();

handler.use(middleware);


// edit story
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
    if (storyData.html) {
        story.html = storyData.html
    }
    if (storyData.genres) {
        story.genres = storyData.genres
    }
    if (storyData.publishDate) {
        story.publishDate = storyData.publishDate
    }
    
    delete story._id
    const updatedStory = await updateStoryById(req.db, storyData._id, story)

    res.json({ story: updatedStory.value });
  });

// delete story
handler.delete(async (req, res) => {
    if (!req.user) {
        res.status(401).end();
        return;
    }
    const deleteResult = await deleteStoryById(req.db, req.body._id);
    res.json({ deleted: !!deleteResult.ok });
});


export default handler;

