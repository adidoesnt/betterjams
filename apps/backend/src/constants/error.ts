export const ERR = {
    INTERNAL: {
        status: 500,
        message: 'internal server error'
    },
    MISSING_SCOPE: {
        status: 500,
        message: 'scope not set in environment'
    },
    MISSING_CODE: {
        status: 401,
        message: 'missing code upon redirect'
    },
    STATE_MISMATCH: {
        status: 401,
        message: 'state mismatch upon redirect'
    },
    AXIOS_ERROR: {
        status: 500,
        message: 'axios error'
    },
    MISSING_KEY: {
        status: 400,
        message: 'missing cache key'
    },
    NOT_FOUND: {
        status: 404,
        message: 'not found'
    }
};
