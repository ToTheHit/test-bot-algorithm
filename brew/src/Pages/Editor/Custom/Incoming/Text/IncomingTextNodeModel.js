import { NodeModel } from '@projectstorm/react-diagrams';
import { FlowPortModel, TextPortModel, MessagePortModel, ButtonPortModel } from '../../Ports/Models';

class IncomingTextNodeModel extends NodeModel {
  constructor(options = {}) {
    super({
      ...options,
      type: 'incomingText'
    });
    this.title = options.title || 'Text node';

    this.addPort(new FlowPortModel('flowIn', 'left'));
    this.addPort(new FlowPortModel('flowOut', 'right'));
    this.addPort(new TextPortModel('comparisonText', 'left'));
    this.addPort(new ButtonPortModel('button', 'left'))
    // this.addPort(new MessagePortModel('outgoingMsg', 'right'));
  }

  serialize() {
    return {
      ...super.serialize(),
      title: this.title
    };
  }
}

export default IncomingTextNodeModel;
