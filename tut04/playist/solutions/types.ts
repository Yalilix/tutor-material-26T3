export interface DataStore {
  users: User[],
  songs: Song[],
}

export interface User {
  userId: string;
  email: string;
  password: string;
  playlist: Song[],
  dateCreated: string;
}

export interface Song {
  name: string;
  artist: string;
  duration: number;
  songId: string;
}

export interface ErrorReturn {
  error: string;
}

export type EmptyObject = Record<string,never>;
