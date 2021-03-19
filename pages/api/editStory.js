import { connectToDatabase } from "../../util/mongodb";

export default async function handler(req, res) {
    const { db } = await connectToDatabase();
    // let data = req.body;
    // data = JSON.parse(data);


    const doc = await db.collection('stories').updateOne({ _id: req.params.id }, { $set: req.body });
    
            if (req.body.title) {
                doc.title = req.body.title
            }
            if (req.body.text) {
                doc.text = req.body.text
            }
            if (req.body.genres) {
                doc.genres = req.body.genres
            }
        
            res.send((doc)?{msg:'success'}:{msg:'error'})
    // const doc = await db.collection('stories').updateOne({ _id: req.params.id }, { $set: req.body }, () => {

    //     if (req.body.title) {
    //         doc.title = req.body.title
    //     }
    //     if (req.body.text) {
    //         doc.text = req.body.text
    //     }
    //     if (req.body.genres) {
    //         doc.genres = req.body.genres
    //     }
    
    //     res.send((doc)?{msg:'success'}:{msg:'error'})

    // });

}
