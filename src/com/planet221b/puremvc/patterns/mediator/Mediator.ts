import Notifier from '../observer/Notifier';

export default abstract class Mediator extends Notifier {
  protected viewComponent: any;
  private mediatorName: string;
  private notificationInterests: string[] = [];
  private isWake: boolean = true;

  constructor(mediatorName: string, viewComponent: any) {
    super();
    this.mediatorName = mediatorName || NAME;
    this.viewComponent = viewComponent;
  }

  public sleep(): void {
    this.isWake = false;
  }

  public wake(): void {
    this.isWake = true;
  }

  public getMediatorName(): string {
    return this.mediatorName;
  }

  public setViewComponent(viewComponent: any): void {
    this.viewComponent = viewComponent;
  }

  public getViewComponent(): any {
    return this.viewComponent;
  }

  public subscribeToNotifications(...notificationNames: string[]): void {
    for (const notificationName of notificationNames) {
      if (this.notificationInterests.indexOf(notificationName) !== -1) {
        return;
      }
      this.notificationInterests.push(notificationName);
    }
    this.updateMediator();
  }

  public unsubscribeToNotification(...notificationNames: string[]): void {
    for (const notificationName of notificationNames) {
      const notificationIndex: number = this.notificationInterests.indexOf(
        notificationName,
      );
      if (notificationIndex === -1) {
        return;
      }
      this.notificationInterests.splice(notificationIndex, 1);
    }
    this.updateMediator();
  }

  public handleSubscribedNotification(
    notificationName: string,
    ...args: any[]
  ): void {
    this.isWake && this.handleNotification(notificationName, ...args);
  }

  public abstract registerNotificationInterests(): string[];

  protected abstract handleNotification(
    notificationName: string,
    ...args: any[]
  ): void;

  public onRegister(): void {}

  public onRemove(): void {}

  get listNotificationInterests(): string[] {
    return this.notificationInterests;
  }

  private updateMediator(): void {
    this.facade.updateMediator(this);
  }
}

const NAME: string = 'Mediator';
