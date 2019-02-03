import Notifier from '../observer/Notifier';
export default abstract class Mediator<V> extends Notifier {
    protected viewComponent: V;
    private mediatorName;
    private notificationInterests;
    private isWake;
    constructor(mediatorName: string, viewComponent: V);
    sleep(): void;
    wake(): void;
    getMediatorName(): string;
    setViewComponent(viewComponent: V): void;
    getViewComponent(): V;
    subscribeToNotifications(...notificationNames: string[]): void;
    unsubscribeToNotification(...notificationNames: string[]): void;
    handleSubscribedNotification(notificationName: string, ...args: any[]): void;
    abstract registerNotificationInterests(): void;
    protected abstract handleNotification(notificationName: string, ...args: any[]): void;
    onRegister(): void;
    onRemove(): void;
    readonly listNotificationInterests: string[];
    private updateMediator;
}
