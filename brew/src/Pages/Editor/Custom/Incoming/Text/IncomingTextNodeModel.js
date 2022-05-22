import { FlowPortModel, TextPortModel, ButtonPortModel } from '../../Ports/Models';
import CustomNodeModel from '../../lib/CustomNodeModel';

class IncomingTextNodeModel extends CustomNodeModel {
  constructor(options = {}) {
    super({
      data: {
        title: '',
        description: '',
        ...options
      },
      type: 'incomingText'
    });

    this.addPort(new FlowPortModel('flowIn', 'left'));
    this.addPort(new FlowPortModel('flowOut', 'right'));
    this.addPort(new TextPortModel('comparisonText', 'left'));
    this.addPort(new ButtonPortModel('button', 'left'));
  }
}

export default IncomingTextNodeModel;
