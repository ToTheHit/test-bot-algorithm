import { observable, action, makeObservable } from "mobx";

class Store {
  nodes = [];
  links = [];
  portStatus = {};
  portsByLink = {}

  constructor() {
    makeObservable(this, {
      nodes: observable,
      links: observable,
      portStatus: observable,
      updateNode: action,
      updateLink: action,
      updateLinkPort: action,
      serialize: action
    });
  }

  serialize = () => ({
    store: {
      nodes: JSON.parse(JSON.stringify(this.nodes)),
      links: JSON.parse(JSON.stringify(this.links)),
      portStatus: JSON.parse(JSON.stringify(this.portStatus)),
      portsByLink: JSON.parse(JSON.stringify(this.portsByLink))
    }
  })

  deserialize = (data = {}) => {
    const {
      nodes = [],
      links = [],
      portStatus = {},
      portsByLink = {}
    } = data;

    this.nodes = nodes;
    this.links = links;
    this.portStatus = portStatus;
    this.portsByLink = portsByLink;
  }

  updateNode = (node) => {
    this.nodes[node.options.id] = node;
  }

  updateLink = (link, isCreated) => {
    if (isCreated) {
      this.links[link.options.id] = link;
    } else {
      delete this.links[link.options.id];
      this.portsByLink[link.options.id].forEach(portId => {
        this.portStatus[portId] -= 1;
      })

      delete this.portsByLink[link.options.id];
    }
  }

  updateLinkPort = (link, port) => {
    if (port) {
      if (this.portStatus[port.options.id] === undefined) {
        this.portStatus[port.options.id] = 0;
      }

      this.portStatus[port.options.id] += 1;

      if (!this.portsByLink[link.options.id]) {
        this.portsByLink[link.options.id] = [];
      }

      this.portsByLink[link.options.id].push(port.options.id);
    }

  }
}

const store = new Store();
export default store;
