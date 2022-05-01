import { observable, action, makeObservable } from 'mobx';

const defaultMenuOptions = {
  anchorPoint: {
    x: 0,
    y: 0
  },
  type: '', // Type menu which need open/close
  isToggled: false
};

class Store {
  nodes = [];
  links = [];
  menu = defaultMenuOptions;

  constructor() {
    makeObservable(this, {
      nodes: observable,
      links: observable,
      menu: observable,
      serialize: action,
      toggleMenu: action,
      deserialize: action
    });
  }

  serialize = () => ({
    store: {
      nodes: JSON.parse(JSON.stringify(this.nodes)),
      links: JSON.parse(JSON.stringify(this.links))
    }
  })

  deserialize = (data = {}) => {
    const {
      nodes = [],
      links = []
    } = data;

    this.nodes = nodes;
    this.links = links;
  }

  /**
   * @param {boolean} isToggled
   * @param {{x: number, y: number}} anchorPoint
   * @param {string} type
   */
  toggleMenu = (isToggled = false, anchorPoint = { x: 0, y: 0 }, type = '') => {
    if (isToggled) {
      this.menu = {
        anchorPoint,
        type, // Type menu which need open/close
        isToggled
      };
    } else {
      this.menu = defaultMenuOptions;
    }
  }
}

const store = new Store();

export default store;
