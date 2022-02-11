import CustomPortModel from '../utils/CustomPortModel';

export default class VariablePortModel extends CustomPortModel {
  constructor(portName, alignment) {
    super(portName, alignment, 'variable');
  }

  canLinkToPort(port) {
    if (this.options.alignment !== port.options.alignment && port.options.type !== 'message') {
      return true;
    }

    return false;
  }

  deserialize(event, engine) {
    super.deserialize(event, engine);
  }
}
