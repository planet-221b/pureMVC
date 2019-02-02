/**
 * Created by sargis on 7/4/17.
 */
import SimpleCommand from '../command/SimpleCommand';
import Mediator from '../mediator/Mediator';
import Proxy from '../proxy/Proxy';
export default class Facade {
    static getInstance(key: string): Facade;
    static hasCore(key: string): boolean;
    static removeCore(key: string): void;
    protected static instanceMap: {
        [key: string]: Facade;
    };
    private model;
    private view;
    private controller;
    private multitonKey;
    constructor(key: string);
    initializeFacade(): void;
    registerCommand<T extends SimpleCommand>(notificationName: string, commandClassRef: new () => T): void;
    removeCommands(notificationName: string): void;
    removeCommand<T extends SimpleCommand>(notificationName: string, commandClassRef: new () => T): void;
    hasAnyCommand(notificationName: string): boolean;
    hasCommand<T extends SimpleCommand>(notificationName: string, commandClassRef: new () => T): boolean;
    registerProxy<T extends Proxy>(proxy: T): void;
    retrieveProxy<T extends Proxy>(proxyName: string): T;
    removeProxy<T extends Proxy>(proxyName: string): T;
    hasProxy(proxyName: string): boolean;
    registerMediator<T extends Mediator>(mediator: T): void;
    updateMediator<T extends Mediator>(mediator: T): void;
    retrieveMediator<T extends Mediator>(mediatorName: string): T;
    removeMediator<T extends Mediator>(mediatorName: string): T;
    hasMediator(mediatorName: string): boolean;
    sendNotification(notificationName: string, ...args: any[]): void;
    notifyObservers(notificationName: string, ...args: any[]): void;
    initializeNotifier(key: string): void;
    protected initializeController(): void;
    protected initializeModel(): void;
    protected initializeView(): void;
}
