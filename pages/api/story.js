import nextConnect from 'next-connect';
import middleware from '../../middleware/middleware';
import { getStoryById, updateStoryById, deleteStoryById } from "../../db/stories";


const handler = nextConnect();

handler.use(middleware);


// edit/update story
handler.patch(async (req, res) => {

    const storyData = req.body

    const storyId = storyData._id;
  
    const story = await getStoryById(req.db, storyId);

    const updatedStory = {...story, ...storyData};

    delete updatedStory._id
    const savedStory = await updateStoryById(req.db, storyId, updatedStory)

    res.json({ story: savedStory.value });

  });

// delete story
handler.delete(async (req, res) => {
    // if (!req.user) {
    //     res.status(401).end();
    //     return;
    // }
    const deleteResult = await deleteStoryById(req.db, req.body._id);
    res.json({ deleted: !!deleteResult.ok });
});


export default handler;

