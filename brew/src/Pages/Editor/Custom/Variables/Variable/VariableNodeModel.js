import { VariablePortModel } from '../../Ports/Models';
import CustomNodeModel from '../../lib/CustomNodeModel';

class VariableNodeModel extends CustomNodeModel {
  constructor(options = {}) {
    super({
      data: { ...options },
      type: 'variableNode'
    });
    this.addPort(new VariablePortModel('out', 'right'));
  }

  serialize() {
    return {
      ...super.serialize(),
      data: this.options.data
    };
  }

  deserialize(event) {
    this.options.data = event.data.data;
    super.deserialize(event);
  }

  updateOptions(options) {
    /**
     * Update variable template and all nodes of this variable
     */
    this.getParentCanvasModel().getDiagramEngine().updateVariableOptions(this.options.data.id, options);
  }
}

export default VariableNodeModel;
