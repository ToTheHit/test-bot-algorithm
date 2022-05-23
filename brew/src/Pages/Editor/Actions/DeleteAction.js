import { Action, InputType } from '@projectstorm/react-canvas-core';
import { PointModel } from '@projectstorm/react-diagrams';
import CustomNodeModel from '../Custom/lib/CustomNodeModel';
import { SimpleLinkModel } from '../Custom/Links/Models';
import { SimplePointModel } from '../Custom/Points/Models';

/**
 * Handles delete actions.
 */
export default class DeleteAction extends Action {
  constructor() {
    super({
      type: InputType.KEY_DOWN,
      fire: ({ event }) => {
        if (this.engine.getModel().isLocked()) {
          return;
        }

        if (this.matchesInput(event)) {
          event.preventDefault();
          this.handleAction();
        }
      }
    });
  }

  matchesInput = event => event.code === 'Delete';

  handleAction = () => {
    const entities = this.engine
      .getModel()
      .getSelectedEntities()
      // TODO: remove 'instanceof' after accept PR
      .filter(entity => !entity.isLocked() && (entity.allowedRemove || entity instanceof PointModel));

    if (entities.length > 0) {
      this.fireEvent(entities);

      entities.forEach(model => model.remove());

      this.engine.repaintCanvas();
    }
  };

  /**
   * Event is fired to be on the command manager, so the user can undo
   * and redo it.
   */
  fireEvent = entities => {
    // All selected nodes
    const nodes = entities.filter(
      model => model instanceof CustomNodeModel
    );

    // All selected links
    const links = entities.filter(
      model => model instanceof SimpleLinkModel
    );

    const points = entities.filter(
      model => model instanceof SimplePointModel
    );

    // All links from selected nodes
    const nodesLinks = nodes.reduce(
      (arr, node) => [...arr, ...node.getAllLinks()],
      []
    );

    const linksSource = [...nodesLinks, ...links].map(link => ({
      id: link.getID(),
      points: link.getPoints(),
      targetEntity: {
        node: link.getTargetPort()?.getParent().getID(),
        port: link.getTargetPort()?.getID()
      },
      sourceEntity: {
        node: link.getSourcePort()?.getParent().getID(),
        port: link.getSourcePort()?.getID()
      }
    }));

    const pointsSource = points.map(point => ({
      data: point,
      linkID: point.getParent().getID()
    }));

    this.engine.fireEvent(
      { nodes, links: linksSource, points: pointsSource },
      'entitiesRemoved'
    );
  };
}
