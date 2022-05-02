import { NodeModel } from '@projectstorm/react-diagrams';
import { FlowPortModel } from '../Ports/Models';
import CustomNodeModel from '../lib/CustomNodeModel';

class StartNodeModel extends CustomNodeModel {
  constructor() {
    super({
      type: 'startNode'
    });

    this.addPort(new FlowPortModel('flowOut', 'right'));
  }
}

export default StartNodeModel;
