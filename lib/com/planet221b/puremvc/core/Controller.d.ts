import SimpleCommand from '../patterns/command/SimpleCommand';
export default class Controller {
    static removeController(key: string): void;
    static getInstance(key: string): Controller;
    private static instanceMap;
    private commandMap;
    private multitonKey;
    private view;
    constructor(key: string);
    registerCommand<T extends SimpleCommand>(notificationName: string, commandClassRef: new () => T): void;
    registerCommandOnce<T extends SimpleCommand>(notificationName: string, commandClassRef: new () => T): void;
    hasCommand<T extends SimpleCommand>(notificationName: string, commandClassRef: new () => T): boolean;
    hasAnyCommand(notificationName: string): boolean;
    removeCommands(notificationName: string): void;
    removeCommand<T extends SimpleCommand>(notificationName: string, commandClassRef: new () => T): void;
    protected initializeController(): void;
    protected executeCommand(notificationName: string, ...args: any[]): void;
}
