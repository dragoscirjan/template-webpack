class Logger {
  log() {
    console.log(`Hello Test Babel ${this.constructor.name}`);
  }
}

new Logger().log();
