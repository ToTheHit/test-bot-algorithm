import {
  DiagramModel
} from '@projectstorm/react-diagrams';
import { Command } from '../../Actions/lib';

export default class CustomDiagramModel extends DiagramModel {
  removeLink(link) {
    const command = new Command(
      () => super.removeLink(link),
      () => super.addLink(link)
    );

    // @ts-ignore
    // eslint-disable-next-line no-undef
    // window.commandManager.addCommand(command);

    return super.removeLink(link);
  }

  addLink(link) {
    const command = new Command(
      () => super.addLink(link),
      () => super.removeLink(link)
    );

    // @ts-ignore
    // eslint-disable-next-line no-undef
    // window.commandManager.addCommand(command);

    return super.addLink(link);
  }

  addNode(node) {
    const command = new Command(
      () => super.addNode(node),
      () => super.removeNode(node)
    );

    // @ts-ignore
    // eslint-disable-next-line no-undef
    // window.commandManager.addCommand(command);

    return super.addNode(node);
  }

  removeNode(node) {
    const command = new Command(
      () => super.removeNode(node),
      () => super.addNode(node)
    );

    // @ts-ignore
    // eslint-disable-next-line no-undef
    // window.commandManager.addCommand(command);

    return super.removeNode(node);
  }

  addAll(...models) {
    return super.addAll(...models);
  }
}
