import { ERR } from 'constants/error';
import { Request, Response } from 'express';
import { generateRandomString } from 'utils/uuid';
import querystring from 'querystring';
import { MSG } from 'constants/message';
import { getAuthTokenKey } from 'api/services/authService';
import { cache } from 'utils/cache';

export let token: string;

const {
    SCOPE: scope,
    CLIENT_ID: client_id,
    CLIENT_SECRET: client_secret,
    REDIRECT_URI: redirect_uri,
    AUTH_ENDPOINT,
    TOKEN_ENDPOINT,
    SUCCESS_ENDPOINT
} = process.env;

export const loginController = async (_: Request, response: Response) => {
    const state = generateRandomString();
    if (!scope) {
        const { INTERNAL, MISSING_SCOPE } = ERR;
        const { status, message } = INTERNAL;
        const { message: internalMessage } = MISSING_SCOPE;
        console.error(internalMessage);
        return response.status(status).json({
            message
        });
    }
    const qs = querystring.stringify({
        response_type: 'code',
        client_id: client_id,
        scope: scope,
        redirect_uri: redirect_uri,
        state: state
    });
    const uri = `${AUTH_ENDPOINT}?${qs}`;
    return response.redirect(uri);
};

export const redirectController = async (
    request: Request,
    response: Response
) => {
    const { query } = request;
    const { code, state } = query;
    if (!code) {
        const { status, message } = ERR.MISSING_CODE;
        return response.status(status).json({
            message
        });
    }
    if (!state) {
        const { status, message } = ERR.STATE_MISMATCH;
        return response.status(status).json({
            message
        });
    }
    try {
        const key = await getAuthTokenKey(
            client_id ?? '',
            client_secret ?? '',
            code as string,
            redirect_uri ?? '',
            TOKEN_ENDPOINT ?? ''
        );
        console.log(`Received key: ${key}`);
        const qs = querystring.stringify({
            key
        });
        // change to redirect to frontend
        return response.redirect(`${SUCCESS_ENDPOINT}?${qs}`);
    } catch (error) {
        console.error(error);
        const { status, message } = ERR.AXIOS_ERROR;
        return response.status(status).json({
            message
        });
    }
};

export const tokenController = async (request: Request, response: Response) => {
    const { query } = request;
    const { key } = query;
    if (!key) {
        const { status, message } = ERR.MISSING_KEY;
        return response.status(status).json({
            message
        });
    }
    const token = await cache.get(key as string);
    if (!token) {
        const { status, message } = ERR.MISSING_KEY;
        return response.status(status).json({
            message
        });
    }
    const { status, message } = MSG.OK;
    return response.status(status).json({
        message,
        token
    });
};
