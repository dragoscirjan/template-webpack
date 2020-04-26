
class LoggerTs {
  log() {
    console.log(`Hello Test Babel ${this.constructor.name}`);
  }
}

new LoggerTs().log();
