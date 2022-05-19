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

  serialize() {
    return {
      ...super.serialize(),
      data: this.options.data
    };
  }

  deserialize(event, engine) {
    super.deserialize(event, engine);
  }
}

export default IncomingMediaNodeModel;
