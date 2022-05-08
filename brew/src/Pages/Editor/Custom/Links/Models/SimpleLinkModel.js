import { DefaultLinkModel } from '@projectstorm/react-diagrams';
import { Point } from '@projectstorm/geometry';
import { snap } from '../../../lib/common';
import { SimplePointModel } from '../../Points/Models';

export default class SimpleLinkModel extends DefaultLinkModel {
  constructor(options = {}) {
    super({
      type: 'simpleLink',
      ...options
    });
    this.points = [
      new SimplePointModel({ link: this, number: 1 }),
      new SimplePointModel({ link: this, number: 2 })
    ];
  }

  getGridSize() {
    return this.getParent()
      .getParent()
      .getOptions().gridSize;
  }

  remove() {
    if (this.sourcePort) {
      this.sourcePort.removeLink(this);
      this.sourcePort = null;
    }
    if (this.targetPort) {
      this.targetPort.removeLink(this);
      this.targetPort = null;
    }
    super.remove();
  }

  setSourcePort(port) {
    const tempPort = port || this.getTargetPort();

    super.setSourcePort(port);
    tempPort?.updatePortStatus();
  }

  setTargetPort(port) {
    const tempPort = port || this.getTargetPort();

    super.setTargetPort(port);
    // const sourcePort = this.getSourcePort();
    // const targetPort = this.getTargetPort();
    // const model = this.getParent().getParent();

    tempPort?.updatePortStatus();

    // if (sourcePort?.options.name === 'flowIn' && targetPort?.options.name === 'flowOut') {
    //   console.log('%%% REVERSE %%%');
    //   // console.log('>>> #1', targetPort.getID());
    //   // console.log('>>> #2', model.getNode(this.getSourcePort().getParent().getID()));
    //   const source = model.getNode(this.getTargetPort().getParent().getID()).getPortFromID(targetPort.getID());
    //   const target = model.getNode(this.getSourcePort().getParent().getID()).getPortFromID(sourcePort.getID());
    //
    //   console.log('### source', sourcePort.getLinks());
    //   console.log('### target', targetPort.getLinks());
    //   // this.setSourcePort(null);
    //   // this.setTargetPort(null);
    //   this.clearPort(sourcePort);
    //   this.clearPort(targetPort);
    //   this.getPoints().forEach(point => this.removePoint(point));
    //
    //   this.setSourcePort(source);
    //   // console.log('>> this #1', this);
    //   this.setTargetPort(target);
    //   // console.log('>> this #2', this);
    //   console.log('### source', sourcePort.getLinks());
    //   console.log('### target', targetPort.getLinks());
    //
    //   console.log(this);
    // }
  }

  getMiddlePoint() {
    if (!this.hasMiddlePoint()) {
      return null;
    }

    return this.getPoints()[1];
  }

  getSecondPoint() {
    return this.getPoints()[1];
  }

  getSecondLastPoint() {
    const points = this.getPoints();

    return points[points.length - 2];
  }

  hasMiddlePoint() {
    return this.getPoints().length === 3;
  }

  getFirstPosition() {
    return snap(
      this.getFirstPoint().getPosition(),
      this.getGridSize()
    );
  }

  getSecondPosition() {
    return snap(
      this.getSecondPoint().getPosition(),
      this.getGridSize()
    );
  }

  getMiddlePosition() {
    if (!this.hasMiddlePoint()) {
      return null;
    }

    return snap(
      this.getMiddlePoint().getPosition(),
      this.getGridSize()
    );
  }

  getSecondLastPosition() {
    return snap(
      this.getSecondLastPoint().getPosition(),
      this.getGridSize()
    );
  }

  getLastPosition() {
    return snap(
      this.getLastPoint().getPosition(),
      this.getGridSize()
    );
  }

  point(x, y, index) {
    const point = super.point(x, y, index);

    this.getParent().getParent().getDiagramEngine().getEngine()
      .fireEvent({ point, link: this, index }, 'linkPointAdded');

    return point;
  }

  removePoint(pointModel) {
    super.removePoint(pointModel);
  }

  generatePoint(x, y) {
    return new SimplePointModel({
      link: this,
      position: new Point(x, y)
    });
  }
}
