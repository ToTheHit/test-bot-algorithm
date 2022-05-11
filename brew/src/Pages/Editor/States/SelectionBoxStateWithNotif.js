import {
  State,
  Action,
  InputType,
  DragCanvasState,
  SelectingState,
  SelectionBoxState
} from '@projectstorm/react-canvas-core';

export default class SelectionBoxStateWithNotif extends SelectionBoxState {
  constructor() {
    super();

    this.registerAction(
      new Action({
        type: InputType.MOUSE_UP,
        fire: () => {
          const selectedEntities = this.engine.getModel().getSelectedEntities();

          this.engine.getModel().setSelection(selectedEntities);
        }
      })
    );
  }
}
