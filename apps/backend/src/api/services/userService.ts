import axios from 'axios';
import { cache } from 'utils/cache';
import { v4 as uuidv4 } from 'uuid';
import stringify from 'json-stringify-safe';

const { CACHE_EXPIRY } = process.env;
const exp = parseInt(CACHE_EXPIRY ?? '60');

export const cacheProfile = async (profile: any, token: string) => {
    const key = `profile-${token}`;
    const profileString = stringify(profile);
    try {
        console.log('token set in cache');
        await cache.set(key, profileString, {
            EX: exp
        });
        return key;
    } catch (error: unknown) {
        throw error;
    }
};

export const getProfileFromCache = async (token: string) => {
    try {
        const key = `profile-${token}`;
        const profileString = await cache.get(key);
        if (profileString) {
            const profile = JSON.parse(profileString);
            console.log('retrieved profile from cache');
            return profile;
        }
        console.log('profile not found in cache');
        return null;
    } catch (error) {
        throw error;
    }
};

export const getUserProfile = async (
    token: string,
    profile_endpoint: string
) => {
    try {
        const cachedProfile = await getProfileFromCache(token);
        if (cachedProfile) return cachedProfile;
        const response = await axios.get(profile_endpoint, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const { data: profile } = response;
        await cacheProfile(profile, token);
        return profile;
    } catch (error: unknown) {
        throw error;
    }
};

export const getUserPlaylists = async (
    token: string,
    playlists_endpoint: string
) => {
    try {
        const response = await axios.get(playlists_endpoint, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const { data: playlists } = response;
        return playlists;
    } catch (error: unknown) {
        throw error;
    }
};
