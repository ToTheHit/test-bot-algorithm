import { VariablePortModel } from '../../Ports/Models';
import CustomNodeModel from '../../lib/CustomNodeModel';

class VariableNodeModel extends CustomNodeModel {
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
      title: this.value
    };
  }

  deserialize(event) {
    super.deserialize(event);
    this.value = event.data.value;
    // TODO: update title after redesign editor
    this.title = event.data.value;
  }
}

export default VariableNodeModel;
