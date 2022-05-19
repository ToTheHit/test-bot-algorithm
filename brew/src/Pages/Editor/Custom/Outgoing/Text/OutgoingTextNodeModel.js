import { FlowPortModel, TextPortModel } from '../../Ports/Models';
import CustomNodeModel from '../../lib/CustomNodeModel';

class OutgoingTextNodeModel extends CustomNodeModel {
  constructor(options = {}) {
    super({
      data: {
        title: '',
        description: '',
        ...options
      },
      type: 'outgoingText'
    });

    this.addPort(new FlowPortModel('flowIn', 'left'));
    this.addPort(new FlowPortModel('flowOut', 'right'));
    // this.addPort(new MessagePortModel('incomingMsg', 'left'));
    this.addPort(new TextPortModel('outgoingText', 'left'));
    // this.addPort(new MessagePortModel('outgoingMsg', 'right'));
  }

  serialize() {
    return {
      ...super.serialize(),
      data: this.options.data
    };
  }
}

export default OutgoingTextNodeModel;
