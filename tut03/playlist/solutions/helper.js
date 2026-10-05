import { getData } from "./dataStore.js";

/**
 *
 * @param {string} userId
 * @returns {Object | undefined} user
 */
export function findUser(userId) {
  const data = getData();
  return data.users.find(user => user.userId === userId);
}

/**
 *
 * @param {string} songId
 * @returns {Object | undefined} song
 */
export function findSong(songId) {
  const data = getData();
  return data.songs.find(song => song.songId === songId);
}