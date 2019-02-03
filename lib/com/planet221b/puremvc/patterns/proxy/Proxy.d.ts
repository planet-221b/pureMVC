import Notifier from '../observer/Notifier';
export default class Proxy<M> extends Notifier {
    private proxyName;
    private data;
    constructor(proxyName: string, data: M);
    getProxyName(): string;
    onRegister(): void;
    onRemove(): void;
    vo: M;
}
