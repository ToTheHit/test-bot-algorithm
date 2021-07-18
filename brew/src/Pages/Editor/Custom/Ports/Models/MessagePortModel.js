import CustomPortModel from '../utils/CustomPortModel';

export default class MessagePortModel extends CustomPortModel {
  constructor(portName, alignment) {
    super(portName, alignment, 'message');
  }
}
