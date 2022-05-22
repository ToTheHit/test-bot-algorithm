import { FlowPortModel } from '../../Ports/Models';
import CustomNodeModel from '../../lib/CustomNodeModel';

class IncomingMediaNodeModel extends CustomNodeModel {
  constructor(options = {}) {
    super({
      data: {
        title: '',
        description: '',
        ...options
      },
      type: 'incomingMedia'
    });

    this.addPort(new FlowPortModel('flowIn', 'left'));
    this.addPort(new FlowPortModel('flowOut', 'right'));
  }
}

export default IncomingMediaNodeModel;
