import { ERR } from '@constants/error';
import { Request, Response } from 'express';
import { generateRandomString } from 'utils/uuid';
import querystring from 'querystring';
import { Buffer } from 'buffer';
import axios from 'axios';
import { MSG } from '@constants/message';

let token;

const {
    SCOPE: scope,
    CLIENT_ID: client_id,
    CLIENT_SECRET: client_secret,
    REDIRECT_URI: redirect_uri,
    AUTH_ENDPOINT,
    TOKEN_ENDPOINT
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
    const clientCredentials = Buffer.from(
        `${client_id}:${client_secret}`
    ).toString('base64');
    const authorisation = `Basic ${clientCredentials}`;
    const contentType = 'application/x-www-form-urlencoded';
    const authOptions = {
        params: {
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: redirect_uri
        },
        headers: {
            'content-type': contentType,
            Authorization: authorisation
        }
    };
    try {
        const axiosResponse = await axios.post(
            TOKEN_ENDPOINT ?? '',
            {},
            authOptions
        );
        const { data } = axiosResponse;
        const { access_token } = data;
        token = access_token;
        console.log('Received token');
        return response.redirect('./success');
    } catch (error) {
        console.error(error);
        const { status, message } = ERR.AXIOS_ERROR;
        return response.status(status).json({
            message
        });
    }
};

export const successController = (_: Request, response: Response) => {
    const { status, message } = MSG.OK;
    return response.status(status).json({
        message
    });
};
