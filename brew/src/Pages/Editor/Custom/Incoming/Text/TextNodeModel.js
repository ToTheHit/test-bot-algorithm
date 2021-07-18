import { NodeModel } from '@projectstorm/react-diagrams';
import { FlowPortModel, TextPortModel, MessagePortModel } from '../../Ports/Models';

class TextNodeModel extends NodeModel {
  constructor() {
    super({
      type: 'incomingText'
    });

    this.addPort(new FlowPortModel('flowIn', 'left'));
    this.addPort(new FlowPortModel('flowOut', 'right'));
    this.addPort(new TextPortModel('incomingText', 'left'));
    this.addPort(new TextPortModel('comparisonText', 'left'));
    this.addPort(new MessagePortModel('outgoingMsg', 'right'));
  }
}

export default TextNodeModel;
