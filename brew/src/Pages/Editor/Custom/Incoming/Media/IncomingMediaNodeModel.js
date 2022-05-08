import { NodeModel } from '@projectstorm/react-diagrams';
import { FlowPortModel } from '../../Ports/Models';
import CustomNodeModel from '../../lib/CustomNodeModel';

class IncomingMediaNodeModel extends CustomNodeModel {
  constructor(options = {}) {
    super({
      ...options,
      type: 'incomingMedia'
    });

    this.title = options.title || 'Media node';

    this.addPort(new FlowPortModel('flowIn', 'left'));
    this.addPort(new FlowPortModel('flowOut', 'right'));
  }

  serialize() {
    return {
      ...super.serialize(),
      title: this.title
    };
  }

  deserialize(event, engine) {
    super.deserialize(event, engine);
  }
}

export default IncomingMediaNodeModel;
