import CustomPortModel from '../utils/CustomPortModel';

export default class FlowPortModel extends CustomPortModel {
  constructor(portName, alignment) {
    super(portName, alignment, 'flow');
  }

  deserialize(event, engine) {
    super.deserialize(event, engine);
  }
}
