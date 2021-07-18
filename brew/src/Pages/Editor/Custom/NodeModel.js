import { NodeModel, PortModelAlignment } from '@projectstorm/react-diagrams';
import { DiamondPortModel } from './PortModel';

class CustomNodeModel extends NodeModel {
  constructor() {
    super({
      type: 'diamond'
    });
    this.addPort(new DiamondPortModel(PortModelAlignment.TOP));
    this.addPort(new DiamondPortModel(PortModelAlignment.LEFT));
    this.addPort(new DiamondPortModel(PortModelAlignment.BOTTOM));
    this.addPort(new DiamondPortModel(PortModelAlignment.RIGHT));
  }
}

export default CustomNodeModel;
