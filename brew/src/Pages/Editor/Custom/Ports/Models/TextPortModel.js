import CustomPortModel from '../utils/CustomPortModel';

export default class TextPortModel extends CustomPortModel {
  constructor(portName, alignment) {
    super(portName, alignment, 'text');
  }
}
