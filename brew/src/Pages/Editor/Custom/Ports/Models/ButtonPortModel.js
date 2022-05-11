import CustomPortModel from '../utils/CustomPortModel';

export default class ButtonPortModel extends CustomPortModel {
  constructor(portName, alignment) {
    super({
      portName,
      alignment,
      type: 'button',
      maximumLinks: Infinity
    });
  }

  canLinkToPort(port) {
    if (this.options.alignment !== port.options.alignment && port.options.type !== 'flow') {
      return true;
    }

    return false;
  }
}
