import connect from './connect.js';

class Component1 {
  constructor (eventEmitter = {}) {
    this.eventEmitter = eventEmitter;
    this.render();

    this.initListeners();
  }

  render () {
    this.element = document.createElement('div');

    this.element.innerHTML = `
      <div>
        <h1>Component #1</h1>

        <button>Click me!</button>
      </div>
    `;
  }

  initListeners() {
    const btn = this.element.querySelector('button');

    const { FOO, BAR } = this.eventEmitter.actions;

    btn.addEventListener('click', () => {
      console.error('click');

      this.eventEmitter.dispatch(FOO, {
        data: 'foo event'
      });

      this.eventEmitter.dispatch(BAR, {
        data: 'bar event'
      });
    });
  }

  destroy () {
    this.element = null;
  }
}

export default connect(Component1);
