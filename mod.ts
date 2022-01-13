// deno-lint-ignore-file no-namespace
type Label = string | (() => string);

class Logger {
  private readonly label: () => string;

  constructor(public readonly level = Defaults.level, label: Label = Defaults.label, public readonly name?: string) {
    if(!(label instanceof Function))
      this.label = () => label;
    else
      this.label = label;
  }

  public log(level: Logger.LogLevel, msg: string): boolean {
    const logIt = level <= this.level;

    if(logIt)
      Deno.stdout.writeSync(
        new TextEncoder().encode(
          // Label
          '[' + this.label() + '] ' +
          // Name (if any)
          (this.name === undefined ? '' : '[' + this.name + '] ') +
          // Level
          '[' + Logger.LogLevel[level] + '] ' +
          // Message
          msg
        )
      );
      
    return logIt;
  }

  public error(msg: string): boolean {
    return this.log(Logger.LogLevel.ERROR, msg);
  }

  public warning(msg: string): boolean {
    return this.log(Logger.LogLevel.WARNING, msg);
  }

  public info(msg: string): boolean {
    return this.log(Logger.LogLevel.INFO, msg);
  }

  public debug(msg: string): boolean {
    return this.log(Logger.LogLevel.DEBUG, msg);
  }
}

namespace Logger {
  /**
   * Each level will recieve logs for itself, and every level lower than itself.
   * 
   * ERROR < WARNING < INFO < DEBUG
   */
  export enum LogLevel {
    /** Use when logging an error. Level 0 */
    ERROR,
    /** Use when warning the user. Level 1 */
    WARNING,
    /** Use when logging general information. Level 2 */
    INFO,
    /** Use when logging information for debugging purposes. Level 3 */
    DEBUG
  }

  export const Labels = {
    UTC_DATE_TIME: () => new Date().toUTCString(),
    HH_MM_SS: () => new Date().toISOString().substring(11, 19),
    HH_MM: () => new Date().toISOString().substring(11, 16),
    ISO_STRING: () => new Date().toISOString()
  }

  export class Builder {
    private label: Label = Defaults.label;
    private level: Logger.LogLevel = Defaults.level;
    private name: string | undefined = undefined;

    public setLabel(label: Label): this {

      this.label = label;
      return this;
    }

    public setLevel(level: Logger.LogLevel): this {
      this.level = level;
      return this;
    }

    public setName(name: string): this {
      this.name = name;
      return this;
    }

    public build(): Logger {
      return new Logger(this.level, this.label, this.name);
    }
  }
}

class Defaults {
  public static label: Label = Logger.Labels.UTC_DATE_TIME;
  public static level = Logger.LogLevel.INFO;
}

export default Logger;