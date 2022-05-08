import {
  State,
  Action,
  InputType,
  DragCanvasState,
  SelectingState
} from '@projectstorm/react-canvas-core';
import {  PortModel } from '@projectstorm/react-diagrams';
import MoveItemsState from './MoveItemsState';
import DragLinkState from './DragLinkState';

export default class States extends State {
  constructor() {
    super({
      name: 'diagram-states'
    });
    this.childStates = [new SelectingState()];

    this.dragItems = new MoveItemsState();
    this.dragCanvas = new DragCanvasState();
    this.dragNewLink = new DragLinkState();
    // this.dragItems = new DragDiagramItemsState();
    // this.dragPoints = new DragDiagramItemsState();
    // this.dragNewLink = new DragLinkState();

    this.registerAction(
      new Action({
        type: InputType.MOUSE_DOWN,
        fire: event => {
          const element = this.engine.getActionEventBus().getModelForEvent(event);

          // the canvas was clicked on, transition to the dragging canvas state
          if (!element) {
            this.transitionWithEvent(this.dragCanvas, event);
          }
          // initiate dragging a new link
          else if (element instanceof PortModel) {
            this.transitionWithEvent(this.dragNewLink, event);
          // } else if (element instanceof PointModel) {
          //   this.transitionWithEvent(this.dragPoints, event);
          }
          // move the items (and potentially link points)
          else {
            this.transitionWithEvent(this.dragItems, event);
          }
        }
      })
    );
  }
}
