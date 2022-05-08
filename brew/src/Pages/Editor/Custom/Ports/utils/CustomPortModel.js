import {
  PortModel
} from '@projectstorm/react-diagrams';
import { SimpleLinkModel } from '../../Links/Models';
// import EditorStore from '../../../../../mobx/EditorStore';

// const { updateLinkPort } = EditorStore;

export default class CustomPortModel extends PortModel {
  constructor({
    portName, alignment, type, ...options
  }) {
    super({
      type,
      name: portName,
      alignment,
      maximumLinks: 1,
      isConnected: false,
      ...options
    });
  }

  updatePortStatus() {
    this.options.isConnected = Object.keys(this.getLinks()).length > 0;
  }

  createLinkModel() {
    const linkModel = new SimpleLinkModel();

    linkModel.registerListener({
      // sourcePortChanged(event) {
      //   updateLinkPort(event.entity, event.port);
      // },
      // targetPortChanged(event) {
      //   updateLinkPort(event.entity, event.port);
      // }
    });

    return linkModel;
  }

  removeLink(link) {
    super.removeLink(link);
    link.getTargetPort()?.updatePortStatus();
    link.getSourcePort()?.updatePortStatus();
  }

  addLink(link) {
    super.addLink(link);
    link.getTargetPort()?.updatePortStatus();
    link.getSourcePort()?.updatePortStatus();
  }

  // Проверяем только направление портов
  canLinkToPort(port, doubleCheck = false) {
    const reversedPortAlignment = {
      left: 'right',
      right: 'left'
    };

    // console.log('canLinkToPort #1', this.options.type !== port.options.type, port.options.type !== 'variable');

    // if (this.options.type !== port.options.type && port.options.type !== 'variable') {
    //   return false;
    // }

    // console.log('canLinkToPort #2',
    //   reversedPortAlignment[this.options.alignment] === port.options.alignment,
    //   Object.keys(port.links).length);
    // if (Object.keys(port.links).length) {
    //   console.log('canLinkToPort #3.1', port.links[Object.keys(port.links)[0]].getSourcePort());
    //   console.log('canLinkToPort #3.2', port.links[Object.keys(port.links)[0]].getTargetPort());
    // }

    if (
      reversedPortAlignment[this.options.alignment] === port.options.alignment
      // Object.keys(port.links).length === (doubleCheck ? 1 : 0)
    ) {
      return true;
    }

    return false;
  }

  getId() {
    return this.options.id;
  }

  link(port, factory) {
    const link = this.createLinkModel(factory);

    link.setSourcePort(this);
    link.setTargetPort(port);

    this.updatePortStatus(true);
    port.updatePortStatus(true);

    return link;
  }

  deserialize(event) {
    super.deserialize(event);

    // if (Object.keys(this.links).length > 0) {
    //   updateLinkPort(this.links[0], this);
    // }
  }

  getMainLink() {
    const links = Object.values(this.getLinks());

    return links.length > 0 ? links[0] : null;
  }
}
