import { NodeModel } from '@projectstorm/react-diagrams';

export default class CustomNodeModel extends NodeModel {
  constructor(options = {}) {
    super({
      ...options,
      _updatedOn: Date.now()
    });
  }

  getAllLinks() {
    return Object.values(this.getPorts())
      .map(port => {
        return Object.values(port.getLinks());
      })
      .filter(link => !!link && link.length > 0)
      .reduce(
        (arr, link) => [...arr, ...link], // TODO: need optimization?
        []
      );
  }

  updateOptions(options) {
    const beforeOptions = this.options;

    this.options = {
      ...this.options,
      ...options,
      _updatedOn: Date.now()
    };

    this.getParentCanvasModel().engine.getEngine().fireEvent({
      before: beforeOptions,
      after: this.options
    }, 'nodeOptionsUpdated');
    this.getParentCanvasModel().getDiagramEngine().repaintCanvas();
  }
}
