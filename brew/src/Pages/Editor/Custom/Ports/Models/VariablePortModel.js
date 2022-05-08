import CustomPortModel from '../utils/CustomPortModel';

export default class VariablePortModel extends CustomPortModel {
  constructor(portName, alignment) {
    super({
      portName,
      alignment,
      type: 'variable',
      maximumLinks: Infinity
    });
  }

  canLinkToPort(port) {
    if (this.options.alignment !== port.options.alignment && port.options.type !== 'flow') {
      return true;
    }

    return false;
  }

  deserialize(event, engine) {
    super.deserialize(event, engine);
  }
}
