import { ObjectID } from "mongodb";

const convertMongoData = (data) => JSON.parse(JSON.stringify(data));

export async function getStories(db, limit, genres) {
    // if genres are specified then filter by those genres
    const searchCriteria = genres !== undefined
        ? { genres: { $all: genres } }
        : {};

    const stories = await db
        .collection("stories")
        .find(searchCriteria)
        .sort({ _id: -1 }) // newest story shows first
        .limit(limit)
        .toArray();
    return convertMongoData(stories);
}

export async function getStoriesByUser(db, id, limit) {
    const stories = await db
        .collection("stories")
        .find({ user_id: id.toString() })
        .sort({ _id: -1 }) // newest story shows first
        .limit(limit)
        .toArray();
    return convertMongoData(stories);
}

export async function getStoryById(db, id) {
    const story = await db.collection("stories").findOne(
        {
            _id: ObjectID(id),
        },
        {
            projection: {
                title: 1,
                text: 1,
                html: 1,
                author: 1,
                genres: 1,
                likes: 1,
            },
        }
    );
    return convertMongoData(story);
}

export async function updateStoryById(db, id, update) {
    return db.collection('stories').findOneAndUpdate(
      { _id: ObjectID(id) },
      { $set: update,},
      { returnOriginal: false },
    )
  }

  export async function insertStory(db, {
    title, text, html, genres, author, user_id, publishDate,
  }) {
    return db
      .collection('stories')
      .insertOne({
        title, 
        text,
        html, 
        genres, 
        author, 
        user_id,
        publishDate
      })
      .then(({ ops }) => ops[0]);
  }

  export async function deleteStoryById(db, id) {
    return db.collection('stories').findOneAndDelete(
      { _id: ObjectID(id) },
    );
  }