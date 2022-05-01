import CustomLinkModel from '../utils/CustomLinkModel';

export default class SimpleLinkModel extends CustomLinkModel {
  constructor() {
    super({
      type: 'simpleLink'
    });
  }

  setSourcePort(port) {
    super.setSourcePort(port);
    port.updatePortStatus();
  }

  setTargetPort(port) {
    super.setTargetPort(port);
    port.updatePortStatus();
  }

}
