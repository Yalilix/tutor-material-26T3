import { describe, test, expect, beforeEach } from 'vitest';
import { addUser, addSong, addToPlaylist, listPlaylist, clear } from "./playlist.ts";

interface SongId {
  songId: string;
}

interface UserId {
  userId: string;
}

beforeEach(() => {
  clear();
});

describe('addUser tests', () => {
  test('addUser Success', () => {
    expect(addUser('valid@mail.com', 'mypassword')).toStrictEqual({ userId: expect.any(String) })
  });

  test('addUser invalid email', () => {
    expect(addUser('invalidemail', 'password')).toStrictEqual({ error: expect.any(String) });
  });

  test('addUser empty password', () => {
    expect(addUser('valid@mail.com', '')).toStrictEqual({ error: expect.any(String) });
  });
});


describe('addSong tests', () => {
  test('addSong Success', () => {
    expect(addSong('name', 'artist', 1)).toStrictEqual({ songId: expect.any(String) });
  });

  test('addSong empty name', () => {
    expect(addSong('', 'artist', 1)).toStrictEqual({ error: expect.any(String) });
  });

  test('addSong empty artist', () => {
    expect(addSong('name', '', 1)).toStrictEqual({ error: expect.any(String) });
  });

  test('addSong duration too small', () => {
    expect(addSong('name', 'artist', -1)).toStrictEqual({ error: expect.any(String) });
  });

  test('addSong duration too large', () => {
    expect(addSong('name', 'artist', 11)).toStrictEqual({ error: expect.any(String) });
  });
});

describe('addToPlaylist tests', () => {
  test('addToPlaylist Success', () => {
    const user = addUser('valid@mail.com', 'mypassword');
    expect.assert('userId' in user);
    const userId = user.userId;

    const song = addSong('name', 'artist', 1) as { songId: string };
    const songId = song.songId;

    expect(addToPlaylist(userId, songId)).toStrictEqual({})
  });

  test('addToPlaylist Invalid userId', () => {
    const songId = (addSong('name', 'artist', 1) as SongId).songId;
    expect(addToPlaylist('0', songId)).toStrictEqual({ error: expect.any(String) })
  });

  test('addToPlaylist Invalid songId', () => {
    const userId = (addUser('valid@mail.com', 'mypassword') as UserId).userId;
    expect(addToPlaylist(userId, '0')).toStrictEqual({ error: expect.any(String) })
  });

  test('addToPlaylist song already in playlist', () => {
    const user = addUser('valid@mail.com', 'mypassword') as UserId;
    const song = addSong('name', 'artist', 1) as SongId;
    addToPlaylist(user.userId, song.songId)
    expect(addToPlaylist(user.userId, song.songId)).toStrictEqual({ error: expect.any(String) })
  });
});


describe('listPlaylist tests', () => {
  test('listPlaylist Success', () => {
    const user = addUser('valid@mail.com', 'mypassword')
    expect.assert('userId' in user);
    const userId = user.userId;

    const song = addSong('name', 'artist', 1);
    expect.assert('songId' in song)

    addToPlaylist(userId, song.songId);
    expect(listPlaylist(userId)).toStrictEqual([{
      "artist": "artist",
      "duration": 1,
      "name": "name",
      "songId": expect.any(String),
    }]);
  });

  test('listPlaylist invalid userId', () => {
    expect(listPlaylist('1')).toStrictEqual({ error: expect.any(String) });
  });
});
