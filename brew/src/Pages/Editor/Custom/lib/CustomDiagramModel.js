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

  getSelectedEntities() {
    return super.getSelectedEntities();
  }

  clearSelection() {
    super.clearSelection();
    this.engine.setSelected([]);
  }

  setSelection(selected) {
    this.engine.setSelected(selected);
  }
}
