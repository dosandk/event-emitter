import connect from './connect.js';

class Component3 {
  constructor (eventEmitter = {}) {
    this.eventEmitter = eventEmitter;
    this.render();
    this.initListeners();
  }

  render () {
    this.element = document.createElement('div');

    this.element.innerHTML = `
      <div>
        <h1>Component #3</h1>

        <button>Destroy me!</button>
      </div>
    `;
  }

  initListeners() {
    const { FOO, BAR } = this.eventEmitter.actions;

    this.eventEmitter.subscribe(FOO, event => {
      console.log('Component #3: ', event)
    }, this);

    this.eventEmitter.subscribe(BAR, event => {
      console.error('Component #3', event);
    }, this);

    const destroyBtn = this.element.querySelector('button');

    destroyBtn.addEventListener('click', event => {
      this.destroy();
    });
  }

  destroy () {
    this.element.remove();
    this.element = null;
    console.log('parent destroy');
  }
}

export default connect(Component3);
