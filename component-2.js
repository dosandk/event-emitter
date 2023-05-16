import connect from './connect.js';

class Component2 {
  constructor (eventEmitter = {}) {
    this.title = "Component name Component #2"
    this.eventEmitter = eventEmitter;
    this.render();
    this.initListeners();
  }

  render () {
    this.element = document.createElement('div');

    this.element.innerHTML = `
      <div>
        <h1>Component #2</h1>
      </div>
    `;
  }

  fooHandler () {
    console.error('title', this.title);
  }

  initListeners() {
    const { FOO, BAR } = this.eventEmitter.actions;

    this.eventEmitter.subscribe(FOO, this.fooHandler, this);

    this.eventEmitter.subscribe(FOO, () => {
      console.log('another handler for "foo" event')
    }, this);

    this.eventEmitter.subscribe(BAR, event => {
      console.error(event);
    }, this);
  }

  destroy () {
    this.element = null;
  }
}

export default connect(Component2);
