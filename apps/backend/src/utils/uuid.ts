import { v4 as uuidv4 } from 'uuid';

export const generateRandomString = (length?: number) => {
    const uuid = uuidv4().replace(/-/g, '');
    return uuid.substring(0, length ?? 16);
};
