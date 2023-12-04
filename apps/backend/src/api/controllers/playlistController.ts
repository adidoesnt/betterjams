import { getPlaylistSongs } from 'api/services/playlistService';
import { ERR } from 'constants/error';
import { RequestWithToken } from 'constants/express';
import { MSG } from 'constants/message';
import { Response } from 'express';

const { SONGS_ENDPOINT_PREFIX } = process.env;
const songs_endpoint_prefix = SONGS_ENDPOINT_PREFIX ?? '';

export const songsController = async (
    request: RequestWithToken,
    response: Response
) => {
    const { token } = request;
    try {
        const { query } = request;
        const { playlist_id } = query;
        if (!playlist_id) {
            const { status, message } = ERR.BAD_REQUEST;
            return response.status(status).json({
                message
            });
        }
        const uri = `${songs_endpoint_prefix}/${playlist_id}/tracks`;
        const songs = await getPlaylistSongs(token, uri);
        const { status, message } = MSG.OK;
        return response.status(status).json({
            message,
            songs
        });
    } catch (error) {
        console.error(error);
        const { status, message } = ERR.AXIOS_ERROR;
        return response.status(status).json({
            message
        });
    }
};
