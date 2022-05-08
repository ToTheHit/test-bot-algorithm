import {
  DiagramModel
} from '@projectstorm/react-diagrams';

export default class CustomDiagramModel extends DiagramModel {
  constructor(engine) {
    super();
    this.engine = engine;
  }

  getDiagramEngine() {
    return this.engine;
  }
}
