import { NodeModel } from '@projectstorm/react-diagrams';
import { FlowPortModel, TextPortModel, MessagePortModel } from '../../Ports/Models';

class TextNodeModel extends NodeModel {
  constructor(options = {}) {
    super({
      type: 'incomingText'
    });
    this.title = options.title || 'Text node';

    this.addPort(new FlowPortModel('flowIn', 'left'));
    this.addPort(new FlowPortModel('flowOut', 'right'));
    // this.addPort(new MessagePortModel('incomingMsg', 'left'));
    this.addPort(new TextPortModel('comparisonText', 'left'));
    // this.addPort(new MessagePortModel('outgoingMsg', 'right'));
  }

  serialize() {
    return {
      ...super.serialize(),
      title: this.title
    };
  }
}

export default TextNodeModel;
