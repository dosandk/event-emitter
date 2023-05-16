// import ACTIONS from '../path';

export default class Emitter {
  static #instance;

  handlersMap = new Map();

  // actions = ACTIONS_TYPES;
  actions = {
    FOO: 'foo',
    BAR: 'bar-bar-bar'
  }

  // TODO: add constructor
  static get instance() {
    if (Emitter.#instance) {
      return Emitter.#instance;
    }

    Emitter.#instance = new Emitter();

    return Emitter.#instance;
  }

  dispatch(type = '', payload = {}) {
    for (const collection of this.handlersMap.values()) {
      if (collection[type]) {
        collection[type].forEach(handler => {
          handler(payload);
        });
      }
    }
  }

  subscribe(type = '', handler = () => {}, context = {}) {
    const bindHandler = handler.bind(context);

    if (this.handlersMap.has(context)) {
      const collection = this.handlersMap.get(context);

      if (collection[type]) {
        collection[type].push(bindHandler);
      } else {
        collection[type] = [bindHandler];
      }
    } else {
      this.handlersMap.set(context, {
        [type]: [bindHandler]
      });
    }
  }

  // TODO: rename to "unsubscribeAll"
  unsubscribe(context = {}) {
    this.handlersMap.delete(context);
  }

  // unsubscribe (type, handler, context) {}
}
