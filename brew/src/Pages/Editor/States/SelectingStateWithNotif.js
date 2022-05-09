import {
  State,
  Action,
  InputType
} from '@projectstorm/react-canvas-core';

import SelectionBoxStateWithNotif from './SelectionBoxStateWithNotif';

export default class SelectingStateWithNotif extends State {
  constructor() {
    super();
    this.keys = ['shift'];

    this.registerAction(
      new Action({
        type: InputType.MOUSE_DOWN,
        fire: event => {
          const element = this.engine.getActionEventBus().getModelForEvent(event);

          if (!element) {
            this.transitionWithEvent(new SelectionBoxStateWithNotif(), event);
          } else {
            element.setSelected(true);
            this.engine.repaintCanvas();
          }
        }
      })
    );

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
