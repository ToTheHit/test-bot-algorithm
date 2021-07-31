import { NodeModel } from '@projectstorm/react-diagrams';
import { VariablePortModel } from '../../Ports/Models';

class VariableNodeModel extends NodeModel {
  constructor() {
    super({
      type: 'variableNode'
    });

    this.addPort(new VariablePortModel('out', 'right'));
  }
}

export default VariableNodeModel;
