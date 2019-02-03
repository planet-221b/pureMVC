import Proxy from '../patterns/proxy/Proxy';
export default class Model {
    static getInstance(key: string): Model;
    static removeModel(key: string): void;
    private static instanceMap;
    private multitonKey;
    private proxyMap;
    constructor(key: string);
    registerProxy<M, T extends Proxy<M>>(proxy: T): void;
    retrieveProxy<M, T extends Proxy<M>>(proxyName: string): T;
    hasProxy(proxyName: string): boolean;
    removeProxy<M, T extends Proxy<M>>(proxyName: string): T;
    protected initializeModel(): void;
}
