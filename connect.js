import EventEmitter from "./event-emitter.js";

export default function connect(classToWrap) {
  return class extends classToWrap {
    // NOTE: DI via params
    constructor(...args) {
      args.push(EventEmitter.instance);

      super(...args);
    }

    // NOTE: destroy all component events
    destroy () {
      super.destroy();

      this.eventEmitter.unsubscribe(this);
    }
  };
}
