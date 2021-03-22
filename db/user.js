import { ObjectID, ObjectId } from 'mongodb';
import normalizeEmail from 'validator/lib/normalizeEmail';

function formatUser(user) {
  if(!user) return null

  if(!Array.isArray(user.likedStories)){
    user.likedStories = []
  }

  return user
}

export async function findUserById(db, userId) {
  return db.collection('users').findOne({
    _id: ObjectId(userId),
  }).then(formatUser);
}

export async function findUserByEmail(db, email) {
  email = normalizeEmail(email);
  return db.collection('users').findOne({
    email,
  }).then(formatUser);
}

export async function findUserByName(db, username) {
  return db.collection('users').findOne({
    username,
  }).then(formatUser);
}

export async function insertUser(db, {
  email, password, username,
}) {
  return db
    .collection('users')
    .insertOne({
      email,
      password,
      username,
    })
    .then(({ ops }) => ops[0]);
}

// export async function updateUserById(db, id, update) {
//   return db.collection('users').findOneAndUpdate(
//     { _id: ObjectID(id) },
//     { $set: update },
//     { returnOriginal: false },
//   ).then(({ value }) => value);
// }

export async function updateUserById(db, id, update) {
  const result = await db.collection('users').findOneAndUpdate(
    { _id: ObjectID(id) },
    { $set: update },
    { returnOriginal: false },
  );
  await db.collection('stories').updateMany(
    { user_id: id.toString() },
    { $set: { author: update.username }},
  );

  return result;
}

export async function deleteUserById(db, id) {
  return db.collection('users').findOneAndDelete(
    { _id: ObjectID(id) },
  );
}
