import { sign } from 'jsonwebtoken';

export const getJWTtoken = (payload: any, sercet: string, options: any = { expiresIn: '24h' }) => {
    return sign(payload, sercet, options);
}