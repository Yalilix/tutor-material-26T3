import { format } from "date-fns";
import { v4 as uuidv4 } from 'uuid';
import validator from 'validator';

import { getData } from "./dataStore.js";
import { findSong, findUser } from "./helper.js";

/**
 * Registers a user with an email and password
 * @param {string} email
 * @param {string} password
 * @returns {{userId: string} | {error: string}}
 */
export function addUser(email, password) {
  // check if password is empty
  if (password === "") {
    return { error: 'empty password' };
  }

  // validate the email
  if (!validator.isEmail(email)) {
    return { error: 'invalid email' };
  }

  // generate a random string for the userId
  const userId = uuidv4();

  // get the date now in the format
  // 'WEEKDAY - hh:mm:ss [am/pm]". e.g. 'Saturday - 06:03:54 pm'
  const date = format(new Date(), "EEEE - hh:mm:ss aaa");

  const data = getData();

  const newUser = {
    userId: userId,
    email: email,
    password: password,
    playlist: [],
    dateCreated: date
  }

  data.users.push(newUser);

  return { userId };
}

/**
 * Adds a new song to the database
 * @param {string} name
 * @param {string} artist
 * @param {number} duration
 * @returns {{songId: string} | {error: string}}
 */
export function addSong(name, artist, duration) {
  if (name === '') {
    return { error: 'empty song name' };
  }
  if (artist === '') {
    return { error: 'empty artist name' };
  }
  if (duration > 10 || duration < 0) {
    return { error: 'duration is less than 0 or greater than 10' };
  }

  const data = getData();

  // generate a random string for the userId
  const songId = uuidv4();

  data.songs.push({ name, artist, duration, songId });
  return { songId };
}

/**
 * Adds a song to a users playlist
 * @param {string} userId
 * @param {string} songId
 * @returns {{} | {error: string}}
 */
export function addToPlaylist(userId, songId) {
  const user = findUser(userId);
  if (!user) {
    return { error: 'user id is invalid' };
  }

  const song = findSong(songId);
  if (!song) {
    return { error: 'song id is invalid' };
  }

  if (user.playlist.includes(song)) {
    return { error: 'song is already in users playlist' };
  }

  user.playlist.push(song);
  return {};
}

/**
 * Lists all of the songs in a users playlist
 * @param {string} userId
 * @returns {Song[] | {error: string}} playlist
 */
export function listPlaylist(userId) {
  const user = findUser(userId);
  if (!user) {
    return { error: 'user id is invalid' };
  }
  return user.playlist;
}

/**
 * Returns the program to its original state
 * @returns {{}}
 */
export function clear() {
  const data = getData();
  data.songs = [];
  data.users = [];
  return {};
}
