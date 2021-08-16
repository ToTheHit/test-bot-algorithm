import {
  PortModel, DefaultLinkModel
} from '@projectstorm/react-diagrams';
import EditorStore from '../../../../../mobx/EditorStore';

const { updateLinkPort } = EditorStore;

export default class CustomPortModel extends PortModel {
  constructor(portName, alignment, type) {
    super({
      type,
      name: portName,
      alignment,
      maximumLinks: 1,
      isConnected: false
    });
  }

  createLinkModel() {
    const linkModel = new DefaultLinkModel();

    linkModel.registerListener({
      sourcePortChanged(event) {
        // console.log('>>> sourcePortChanged', this);
        updateLinkPort(event.port);
      },
      targetPortChanged(event) {
        // console.log('>>> targetPortChanged', this);
        updateLinkPort(event.port);
      }
    });

    return linkModel;
  }

  removeLink(link) {
    super.removeLink(link);
  }

  addLink(link) {
    super.addLink(link);
  }

  canLinkToPort(port) {
    const links = Object.values(this.getLinks() || {});

    if (this.options.type !== port.options.type && port.options.type !== 'variable') {
      return false;
    }

    if (this.options.alignment !== port.options.alignment && Object.keys(port.links).length < 1) {
      if (links.length > 1) {
        links[0].remove();
      }

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

    return link;
  }
}
