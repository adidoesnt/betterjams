import { ERR } from '@constants/error';
import { Request, Response } from 'express';
import { generateRandomString } from 'utils/uuid';
import querystring from 'querystring';
import { MSG } from '@constants/message';

const {
    SCOPE: scope,
    CLIENT_ID: client_id,
    REDIRECT_URI: redirect_uri,
    AUTH_ENDPOINT
} = process.env;

export const loginController = async (request: Request, response: Response) => {
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

export const redirectController = (request: Request, response: Response) => {
    const { status, message } = MSG.OK;
    return response.status(status).json({
        message
    });
};
