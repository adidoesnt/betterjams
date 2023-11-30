import axios from 'axios';
import { cache } from 'utils/cache';
import { v4 as uuidv4 } from 'uuid';

const { CACHE_EXPIRY } = process.env;
const exp = parseInt(CACHE_EXPIRY ?? '60');

export const cacheToken = async (token: string) => {
    const id = uuidv4();
    const key = `token-${id}`;
    try {
        console.log('token set in cache');
        await cache.set(key, token, {
            EX: exp
        });
        return key;
    } catch (error: unknown) {
        throw error;
    }
};

export const getAuthTokenKey = async (
    client_id: string,
    client_secret: string,
    code: string,
    redirect_uri: string,
    token_endpoint: string
) => {
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
            token_endpoint ?? '',
            {},
            authOptions
        );
        const { data } = axiosResponse;
        const { access_token } = data;
        return await cacheToken(access_token);
    } catch (error: unknown) {
        throw error;
    }
};
