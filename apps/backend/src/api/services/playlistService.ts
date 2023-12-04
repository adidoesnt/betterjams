import axios from 'axios';

export const getPlaylistSongs = async (
    token: string,
    songs_endpoint: string
) => {
    try {
        const response = await axios.get(songs_endpoint, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const { data: songs } = response;
        return songs;
    } catch (error: unknown) {
        throw error;
    }
};
