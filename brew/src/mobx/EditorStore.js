import { observable, action, makeObservable } from "mobx";

class Store {
  nodes = [];
  links = [];
  portStatus = {};

  constructor() {
    makeObservable(this, {
      nodes: observable,
      links: observable,
      portStatus: observable,
      updateNode: action,
      updateLink: action,
      updateLinkPort: action
    });
  }

  updateNode = (node) => {
    this.nodes[node.options.id] = node;
  }

  updateLink = (link, isCreated) => {
    if (isCreated) {
      this.links[link.options.id] = link;
    } else {
      delete this.links[link.options.id];
      this.portStatus[link.sourcePort.options.id] -= 1;
      if (link.targetPort) {
        this.portStatus[link.targetPort.options.id] -= 1;
      }
    }
  }

  updateLinkPort = port => {
    if (this.portStatus[port.options.id] === undefined) {
      this.portStatus[port.options.id] = 0;
    }
    this.portStatus[port.options.id] += 1;
  }
}

const store = new Store();
export default store;
