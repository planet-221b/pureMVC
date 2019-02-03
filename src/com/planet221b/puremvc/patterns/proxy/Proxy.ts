import Notifier from '../observer/Notifier';

export default class Proxy<M> extends Notifier {
  private proxyName: string;
  private data: M;
  constructor(proxyName: string, data: M) {
    super();
    this.proxyName = proxyName || NAME;
    this.data = data;
  }

  public getProxyName(): string {
    return this.proxyName;
  }

  public onRegister(): void {}

  public onRemove(): void {}

  get vo(): M {
    return this.data;
  }
  set vo(data: M) {
    this.data = data;
  }
}

const NAME: string = 'Proxy';
