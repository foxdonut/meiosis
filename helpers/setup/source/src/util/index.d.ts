export function get(object: any, path: Array<string>): any;

export function setMutate(object: any, path: Array<string>, value: any): any;

export function setImmutable<T>(object: T, path: Array<string>, value: any): T;
