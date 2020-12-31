import { ObjectID } from 'typeorm';
import { Omit } from './../interfaces/utli/omit.interface';

export function clone<T = any>(obj: T): T {
    return JSON.parse(JSON.stringify(obj));
}

export function omit(array: Array<any>, uselesskeys: Array<string>) {
    const res = array.map((obj: any) => {
        return Object.keys(obj).reduce((acc: any, key: string) => {
            return uselesskeys.includes(key) ? acc : { ...acc, [key]: obj[key] }
        }, {})
    })
    return res;
}