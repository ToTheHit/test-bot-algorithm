import CustomPortModel from '../utils/CustomPortModel';

export default class TextPortModel extends CustomPortModel {
  constructor(portName, alignment) {
    super({ portName, alignment, type: 'text' });
  }

  // canLinkToPort(port) {
  //   if (this.options.alignment !== port.options.alignment && port.options.type === 'variable') {
  //     return true;
  //   }
  //
  //   return false;
  // }
}
