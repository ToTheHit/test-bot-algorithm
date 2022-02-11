import { NodeModel } from '@projectstorm/react-diagrams';
import { FlowPortModel } from '../Ports/Models';

class StartNodeModel extends NodeModel {
  constructor() {
    super({
      type: 'startNode'
    });

    this.addPort(new FlowPortModel('flowOut', 'right'));
  }
}

export default StartNodeModel;
