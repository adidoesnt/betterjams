import { getUserPlaylists, getUserProfile } from 'api/services/userService';
import { ERR } from 'constants/error';
import { RequestWithToken } from 'constants/express';
import { MSG } from 'constants/message';
import { Request, Response } from 'express';

const { PROFILE_ENDPOINT } = process.env;

const profile_endpoint = PROFILE_ENDPOINT ?? '';

export const profileController = async (
    request: RequestWithToken,
    response: Response
) => {
    const { token } = request;
    try {
        const profile = await getUserProfile(token, profile_endpoint);
        const { status, message } = MSG.OK;
        return response.status(status).json({
            message,
            profile
        });
    } catch (error) {
        console.error(error);
        const { status, message } = ERR.AXIOS_ERROR;
        return response.status(status).json({
            message
        });
    }
};

export const playlistController = async (
    request: RequestWithToken,
    response: Response
) => {
    const { token } = request;
    try {
        const playlists = await getUserPlaylists(token, profile_endpoint);
        const { status, message } = MSG.OK;
        return response.status(status).json({
            message,
            playlists
        });
    } catch (error) {
        console.error(error);
        const { status, message } = ERR.AXIOS_ERROR;
        return response.status(status).json({
            message
        });
    }
};
