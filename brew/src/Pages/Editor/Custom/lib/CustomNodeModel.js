import { NodeModel } from '@projectstorm/react-diagrams';
import { Command } from '../../Actions/lib';

export default class CustomNodeModel extends NodeModel {
  constructor(options = {}) {
    super(options);
  }

  setPosition(pointX, pointY) {
    const { x, y } = { ...this.position };

    const command = new Command(
      () => {
        super.setPosition(pointX, pointY);
      },
      () => {
        super.setPosition(x, y);
      }
    );

    command.execute();

    // eslint-disable-next-line no-undef
    // window.commandManager.addCommand(command);
  }
}
