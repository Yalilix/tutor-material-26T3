import { DataStore } from "./types.ts";

const dataStore: DataStore = {
  users: [],
  songs: []
}

/**
 * returns the datastore
 * @returns {DataStore} dataStore
 */
export function getData(): DataStore {
  return dataStore;
}

// users is an array of User objects
// {
//     userId: String,
//     email: String,
//     password: String,
//     playlist: Song[],
//     dateCreated: String
// }

// songs is an array of Song objects
// {
//     songId: String,
//     name: String,
//     artist: String,
//     duration: Integer
// }
