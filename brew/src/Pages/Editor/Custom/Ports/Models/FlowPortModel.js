import CustomPortModel from '../utils/CustomPortModel';

export default class FlowPortModel extends CustomPortModel {
  constructor(portName, alignment) {
    super({
      portName,
      alignment,
      type: 'flow',
      maximumLinks: 1
    });
  }

  deserialize(event, engine) {
    super.deserialize(event, engine);
  }

  canLinkToPort(port) {
    if (!super.canLinkToPort(port)) {
      return false;
    }

    if (this.options.type !== port.options.type) {
      return false;
    }

    return true;
  }
}
