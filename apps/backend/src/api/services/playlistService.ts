import axios from 'axios';
import stringify from 'json-stringify-safe';
import { cache } from 'utils/cache';

const { CACHE_EXPIRY } = process.env;
const exp = parseInt(CACHE_EXPIRY ?? '60');

const getSongsFromCache = async (playlist_id: string) => {
    try {
        const key = `songs-${playlist_id}`;
        const songsString = await cache.get(key);
        if (songsString) {
            const songs = JSON.parse(songsString);
            console.log('retrieved songs from cache');
            return songs;
        }
        console.log('songs not found in cache');
        return null;
    } catch (error) {
        throw error;
    }
};

const cacheSongs = async (songs: any, playlist_id: string) => {
    const key = `songs-${playlist_id}`;
    const songsString = stringify(songs);
    try {
        await cache.set(key, songsString, {
            EX: exp
        });
        console.log('songs set in cache');
        return key;
    } catch (error) {
        throw error;
    }
};

export const getPlaylistSongs = async (
    token: string,
    songs_endpoint: string,
    playlist_id: string
) => {
    try {
        const cachedSongs = await getSongsFromCache(playlist_id);
        if (cachedSongs) return cachedSongs;
        const response = await axios.get(songs_endpoint, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const { data: songs } = response;
        await cacheSongs(songs, playlist_id);
        return songs;
    } catch (error: unknown) {
        throw error;
    }
};
