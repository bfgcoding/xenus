export interface Logger {
  info: Function;
  warn: Function;
  error: Function;
  verbose?: Function;
  debug?: Function;
  fatal?: Function;
}

export class DefaultLogger implements Logger {
  info(msg: string) {
    console.log(msg);
  }

  warn(msg: string) {
    console.log(msg);
  }

  error(msg: string) {
    console.log(msg);
  }
}
