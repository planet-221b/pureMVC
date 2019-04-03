import SimpleCommand from '../patterns/command/SimpleCommand';
import View from './View';

export default class Controller {
  public static removeController(key: string): void {
    delete this.instanceMap[key];
  }

  public static getInstance(key: string): Controller {
    if (!key) {
      return null;
    }

    if (!this.instanceMap[key]) {
      this.instanceMap[key] = new Controller(key);
    }

    return this.instanceMap[key];
  }

  private static instanceMap: { [key: string]: Controller } = {};

  private commandMap: { [key: string]: (new () => SimpleCommand)[] } = {};
  private multitonKey: string;
  private view: View;

  constructor(key: string) {
    if (Controller.instanceMap[key]) {
      throw new Error(MULTITON_MSG);
    }

    this.multitonKey = key;
    this.initializeController();
  }

  public registerCommand<T extends SimpleCommand>(
    notificationName: string,
    commandClassRef: new () => T,
  ): void {
    if (!this.commandMap[notificationName]) {
      this.commandMap[notificationName] = [];
      this.view.registerObserver(notificationName, this.executeCommand, this);
    }
    this.commandMap[notificationName].push(commandClassRef);
  }
  public registerCommandOnce<T extends SimpleCommand>(
    notificationName: string,
    commandClassRef: new () => T,
  ): void {
    if (!this.commandMap[notificationName]) {
      this.commandMap[notificationName] = [];
      this.view.registerObserver(notificationName, this.executeCommand, this);
      this.view.registerObserver(
        notificationName,
        this.removeCommand.bind(this, notificationName, commandClassRef),
        this,
      );
    }
    this.commandMap[notificationName].push(commandClassRef);
  }

  public hasCommand<T extends SimpleCommand>(
    notificationName: string,
    commandClassRef: new () => T,
  ): boolean {
    return (
      this.hasAnyCommand(notificationName) &&
      this.commandMap[notificationName].indexOf(commandClassRef) !== -1
    );
  }

  public hasAnyCommand(notificationName: string): boolean {
    return (
      this.commandMap[notificationName] !== undefined &&
      this.commandMap[notificationName].length !== 0
    );
  }

  public removeCommands(notificationName: string): void {
    if (this.hasAnyCommand(notificationName)) {
      this.view.removeObserver(notificationName, this.executeCommand, this);
      delete this.commandMap[notificationName];
    }
  }
  public removeCommand<T extends SimpleCommand>(
    notificationName: string,
    commandClassRef: new () => T,
  ): void {
    if (this.hasCommand(notificationName, commandClassRef)) {
      this.commandMap[notificationName].splice(
        this.commandMap[notificationName].indexOf(commandClassRef),
        1,
      );
    }
  }

  protected initializeController(): void {
    this.view = View.getInstance(this.multitonKey);
  }

  protected executeCommand(notificationName: string, ...args: any[]): void {
    const commandClassRefs: (new () => SimpleCommand)[] = this.commandMap[
      notificationName
    ];
    if (!commandClassRefs || commandClassRefs.length === 0) {
      return;
    }
    for (const commandClassRef of commandClassRefs) {
      const commandInstance: SimpleCommand = new commandClassRef();
      commandInstance.initializeNotifier(this.multitonKey);
      commandInstance.execute(notificationName, ...args);
    }
  }
}

const MULTITON_MSG: string =
  'controller key for this Multiton key already constructed';
