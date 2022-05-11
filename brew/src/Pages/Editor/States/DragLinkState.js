import {
  AbstractDisplacementState,
  Action,
  InputType
} from '@projectstorm/react-canvas-core';

import { nearby } from '../lib/common';
import CustomNodeModel from '../Custom/lib/CustomNodeModel';
import CustomPortModel from '../Custom/Ports/utils/CustomPortModel';

/**
 * This State is responsible for handling link creation events.
 */
export default class DragLinkState extends AbstractDisplacementState {
  constructor(options = {}) {
    super({
      name: 'drag-link',
      ...options
    });

    this.registerAction(
      new Action({
        type: InputType.MOUSE_DOWN,
        fire: event => {
          const model = this.engine.getMouseElement(event.event);

          if (!(model instanceof CustomPortModel)) {
            this.eject();

            return;
          }
          this.port = model;
          this.link = this.port.createLinkModel();
          // if no link is given, just eject the state
          if (!this.link) {
            this.eject();

            return;
          }
          this.link.setSelected(true);
          this.link.setSourcePort(this.port);
          this.engine.getModel().addLink(this.link);
          this.port.reportPosition();
        }
      })
    );

    this.registerAction(
      new Action({
        type: InputType.MOUSE_UP,
        fire: event => {
          const targetEntity = this.engine.getMouseElement(event.event);

          /*
           * Disallows creation under nodes
           */
          if (targetEntity instanceof CustomNodeModel) {
            this.link.remove();
            this.engine.repaintCanvas();

            return;
          }

          /*
           * Do double check for ports: target -> source and source -> target
           */
          if (targetEntity instanceof CustomPortModel) {
            if (
              this.port.canLinkToPort(targetEntity) &&
              targetEntity.canLinkToPort(this.port) &&
              this.port.getParent().getID() !== targetEntity.getParent().getID()
            ) {
              this.link.setTargetPort(targetEntity);
              targetEntity.reportPosition();
            } else {
              this.link.remove();
              this.engine.repaintCanvas();

              return;
            }
          } else {
            this.link.remove();
            this.engine.repaintCanvas();

            return;
          }

          if (this.isNearbySourcePort(event.event)) {
            this.link.remove();
            this.engine.repaintCanvas();

            return;
          }
          if (this.isDuplicatePort(targetEntity)) {
            this.link.remove();
            this.engine.repaintCanvas();

            return;
          }

          const linksBefore = [];

          /*
           * Links length is 2 because the port includes the current link
           */
          if (this.port.getMaximumLinks() === 1 && Object.keys(this.port.getLinks()).length === 2) {
            const linkId = Object.keys(this.port.getLinks())[0];
            const link = this.port.getLinks()[linkId];

            linksBefore.push({
              id: linkId,
              points: link.getPoints(),
              targetEntity: {
                node: link.getTargetPort()?.getParent().getID(),
                port: link.getTargetPort()?.getID()
              },
              sourceEntity: {
                node: link.getSourcePort()?.getParent().getID(),
                port: link.getSourcePort()?.getID()
              }
            });
            link.remove();
          }

          /*
           * Links length is 2 because the port includes the current link
           */
          if (targetEntity.getMaximumLinks() === 1 && Object.keys(targetEntity.getLinks()).length === 2) {
            const linkId = Object.keys(targetEntity.getLinks())[0];
            const link = targetEntity.getLinks()[linkId];

            linksBefore.push({
              id: linkId,
              points: link.getPoints(),
              targetEntity: {
                node: link.getTargetPort()?.getParent().getID(),
                port: link.getTargetPort()?.getID()
              },
              sourceEntity: {
                node: link.getSourcePort()?.getParent().getID(),
                port: link.getSourcePort()?.getID()
              }
            });
            link.remove();
          }

          const sourceAfter = [{
            id: this.link.getID(),
            points: this.link.getPoints(),
            targetEntity: {
              node: this.link.getTargetPort()?.getParent().getID(),
              port: this.link.getTargetPort()?.getID()
            },
            sourceEntity: {
              node: this.link.getSourcePort()?.getParent().getID(),
              port: this.link.getSourcePort()?.getID()
            }
          }];

          this.fireEvent(linksBefore, sourceAfter);

          this.engine.repaintCanvas();
        }
      })
    );
  }

  /*
   * Event is fired to be on the command manager, so the user can undo
   * and redo it.
   */
  fireEvent = (before, after) => {
    this.engine.fireEvent({
      before,
      after
    }, 'linkAdded');
  };

  isNearbySourcePort(event) {
    const point = this.engine.getRelativeMousePoint(event);

    const sourcePort = this.link.getSourcePort();

    const sourcePortSize = sourcePort.width;
    const sourcePortPosition = sourcePort.getPosition();

    return nearby(point, sourcePortPosition, sourcePortSize);
  }

  isDuplicatePort(targetEntity) {
    if (Object.keys(targetEntity.getLinks()).length > 1) {
      const targetLinks = targetEntity.getLinks();

      let count = 0;

      Object.keys(targetLinks).forEach(linkId => {
        if (
          targetLinks[linkId].getSourcePort().getID() === this.port.getID() ||
          targetLinks[linkId].getTargetPort().getID() === this.port.getID()
        ) {
          count += 1;
        }
      });

      return count === 2;
    }

    return false;
  }

  /*
   * Updates link's points upon mouse move.
   */
  fireMouseMoved(event) {
    const portPos = this.port.getPosition();
    const zoomLevelPercentage = this.engine.getModel().getZoomLevel() / 100;
    const engineOffsetX = this.engine.getModel().getOffsetX() / zoomLevelPercentage;
    const engineOffsetY = this.engine.getModel().getOffsetY() / zoomLevelPercentage;
    const initialXRelative = this.initialXRelative / zoomLevelPercentage;
    const initialYRelative = this.initialYRelative / zoomLevelPercentage;
    const linkNextX = portPos.x - engineOffsetX + (initialXRelative - portPos.x) + event.virtualDisplacementX;
    const linkNextY = portPos.y - engineOffsetY + (initialYRelative - portPos.y) + event.virtualDisplacementY;

    this.link.getLastPoint().setPosition(linkNextX, linkNextY);
    this.engine.repaintCanvas();
  }
}
