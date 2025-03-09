import { ObjectId } from 'mongodb';

class DbAdapter {
  constructor(db) {
    this.db = db;
  }
}

class MongoDbAdapter extends DbAdapter {
  async find(tName, query, options = {}) {
    /** @type {import('mongodb').Db} db */
    const db = this.db;
    const col = db.collection(tName);
    const cursor = col.find(query);
    if (options.skip > 0) {
      cursor.skip(options.skip);
    }
    if (options.limit > 0) {
      cursor.limit(options.limit);
    }
    return cursor.toArray();
  }
  /**
   * Insert an object
   * @param {string} tName Name of table
   * @param {any} obj data of object to be insert
   */
  async insertObject(tName, obj) {
    /** @type {import('mongodb').Db} db */
    const db = this.db;
    const col = db.collection(tName);
    return col.insertOne(obj);
  }

  /**
   * Update an object
   * @param {string} tName Name of table
   * @param {string} id id of updating object
   * @param {any} changes changes
   */
  async updateObject(tName, id, changes) {
    /** @type {import('mongodb').Db} db */
    const db = this.db;
    const col = db.collection(tName);
    return col.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          ...changes,
        },
      }
    );
  }
}

export {
  DbAdapter,
  MongoDbAdapter,
};
