import { NodeModel } from '@projectstorm/react-diagrams';
import { FlowPortModel, TextPortModel, MessagePortModel } from '../../Ports/Models';
import CustomNodeModel from '../../lib/CustomNodeModel';

class OutgoingTextNodeModel extends CustomNodeModel {
  constructor(options = {}) {
    super({
      type: 'outgoingText'
    });
    this.title = options.title || 'Outgoing text node';

    this.addPort(new FlowPortModel('flowIn', 'left'));
    this.addPort(new FlowPortModel('flowOut', 'right'));
    // this.addPort(new MessagePortModel('incomingMsg', 'left'));
    this.addPort(new TextPortModel('outgoingText', 'left'));
    // this.addPort(new MessagePortModel('outgoingMsg', 'right'));
  }

  serialize() {
    return {
      ...super.serialize(),
      title: this.title
    };
  }
}

export default OutgoingTextNodeModel;
