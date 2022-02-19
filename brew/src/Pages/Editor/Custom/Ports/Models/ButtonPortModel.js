import CustomPortModel from '../utils/CustomPortModel';

export default class ButtonPortModel extends CustomPortModel {
  constructor(portName, alignment) {
    super(portName, alignment, 'button');
  }
}
