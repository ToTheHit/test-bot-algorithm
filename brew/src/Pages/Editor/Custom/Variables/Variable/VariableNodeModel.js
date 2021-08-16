import { NodeModel } from '@projectstorm/react-diagrams';
import { VariablePortModel } from '../../Ports/Models';

class VariableNodeModel extends NodeModel {
  constructor(options = {}) {
    super({
      type: 'variableNode'
    });
    this.value = options.value;
    this.title = options.title || 'Variable Node';
    this.addPort(new VariablePortModel('out', 'right'));
  }

  serialize() {
    return {
      ...super.serialize(),
      value: this.value,
      title: this.title
    };
  }
}

export default VariableNodeModel;
