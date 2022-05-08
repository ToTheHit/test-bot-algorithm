import { NodeModel } from '@projectstorm/react-diagrams';
import { FlowPortModel, TextPortModel, ButtonPortModel } from '../../Ports/Models';
import CustomNodeModel from '../../lib/CustomNodeModel';

class IncomingTextNodeModel extends CustomNodeModel {
  constructor(options = {}) {
    super({
      ...options,
      type: 'incomingText'
    });
    this.title = options.title || 'Text node';

    this.addPort(new FlowPortModel('flowIn', 'left'));
    this.addPort(new FlowPortModel('flowOut', 'right'));
    this.addPort(new TextPortModel('comparisonText', 'left'));
    this.addPort(new ButtonPortModel('button', 'left'));
  }

  serialize() {
    return {
      ...super.serialize(),
      title: this.title
    };
  }
}

export default IncomingTextNodeModel;
