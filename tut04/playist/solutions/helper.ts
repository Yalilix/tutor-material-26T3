import { getData } from "./dataStore.ts";
import { Song, User } from "./types.ts";

/**
 *
 * @param {string} userId
 * @returns {User | undefined} user
 */
export function findUser(userId: string): User | undefined {
  const data = getData();
  return data.users.find(user => user.userId === userId);
}

/**
 *
 * @param {string} songId
 * @returns {Song | undefined} song
 */
export function findSong(songId: string): Song | undefined {
  const data = getData();
  return data.songs.find(song => song.songId === songId);
}