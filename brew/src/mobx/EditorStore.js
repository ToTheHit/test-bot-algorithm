import { observable, action, makeObservable } from 'mobx';

class Store {
  nodes = [];
  links = [];

  constructor() {
    makeObservable(this, {
      nodes: observable,
      links: observable,
      serialize: action
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
}

const store = new Store();

export default store;
