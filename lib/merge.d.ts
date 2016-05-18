interface Merger {
    (target: any, ...sources: Array<any>): any;
}
declare const defaultMerge: Merger;
export { Merger, defaultMerge };
