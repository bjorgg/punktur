import { ObjectId } from 'mongodb';
import normalizeEmail from 'validator/lib/normalizeEmail';

export async function findUserById(db, userId) {
  return db.collection('users').findOne({
    _id: ObjectId(userId),
  }).then((user) => user || null);
}

export async function findUserByEmail(db, email) {
  email = normalizeEmail(email);
  return db.collection('users').findOne({
    email,
  }).then((user) => user || null);
}

export async function findUserByName(db, username) {
  return db.collection('users').findOne({
    username,
  }).then((user) => user || null);
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