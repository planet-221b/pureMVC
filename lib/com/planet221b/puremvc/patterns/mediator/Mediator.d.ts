import Notifier from '../observer/Notifier';
export default abstract class Mediator extends Notifier {
    protected viewComponent: any;
    private mediatorName;
    private notificationInterests;
    private isWake;
    constructor(mediatorName: string, viewComponent: any);
    sleep(): void;
    wake(): void;
    getMediatorName(): string;
    setViewComponent(viewComponent: any): void;
    getViewComponent(): any;
    subscribeToNotifications(...notificationNames: string[]): void;
    unsubscribeToNotification(...notificationNames: string[]): void;
    handleSubscribedNotification(notificationName: string, ...args: any[]): void;
    abstract registerNotificationInterests(): string[];
    protected abstract handleNotification(notificationName: string, ...args: any[]): void;
    onRegister(): void;
    onRemove(): void;
    readonly listNotificationInterests: string[];
    private updateMediator;
}
