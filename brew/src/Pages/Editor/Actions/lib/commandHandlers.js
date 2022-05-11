import { SimpleLinkModel } from '../../Custom/Links/Models';

const commandHandlers = ({ engine, editComponentConfiguration }) => {
  const adjustLink = (link, nodes = []) => {
    const nodeList = [
      ...Object.values(
        engine
          .getModel()
          .getActiveNodeLayer()
          .getModels()
      ),
      ...nodes
    ];

    /**
     * Port instance could have changed in consequence of component
     * configuration edit.
     */
    let sourcePort = link.getSourcePort();

    if (sourcePort) {
      const node = nodeList.find(
        n => n.getID() ===
          link
            .getSourcePort()
            .getParent()
            .getID()
      );

      sourcePort = node.getPort(sourcePort.getName());

      link.setSourcePort(sourcePort);
      sourcePort.addLink(link);
    }

    let targetPort = link.getTargetPort();

    if (targetPort) {
      const node = nodeList.find(
        n => n.getID() ===
          link
            .getTargetPort()
            .getParent()
            .getID()
      );

      targetPort = node.getPort(targetPort.getName());

      link.setTargetPort(targetPort);
      targetPort.addLink(link);
    }

    return link;
  };

  return {
    /**
     * Component added handler. Occurs when a component is added or
     * pasted.
     */
    componentsAdded: ({ nodes }) => {
      engine.commands.add({
        execute: () => {
          nodes.forEach(node => engine.getModel().addNode(node));
        },
        undo: () => {
          nodes.forEach(node => node.remove());
        }
      });
    },
    linkPointAdded: ({ link, point, index }) => {
      engine.commands.add({
        execute: () => {
          link.addPoint(point, index);
        },
        undo: () => {
          link.removePoint(point);
        }
      });
    },

    /**
     * Component configuration edit handler.
     */
    componentEdited: ({ node, configurations, links }) => {
      engine.commands.add({
        execute: () => {
          editComponentConfiguration(node, configurations.after);
        },
        undo: () => {
          editComponentConfiguration(node, configurations.before);

          links.before.forEach(link => engine.getModel().addLink(adjustLink(link)));
        }
      });
    },

    /**
     * Link added handler. Occurs on new links or bifurcations.
     */
    linkAdded: ({ before, after }) => {
      const controlLink = (from, to) => {
        from.forEach(linkData => {
          const oldLink = engine.getModel().getLink(linkData.id);

          oldLink.remove();
        });

        to.forEach(linkData => {
          const sourcePort = engine.getModel()
            .getNode(linkData.sourceEntity.node)
            .getPortFromID(linkData.sourceEntity.port);
          const targetPort = engine.getModel()
            .getNode(linkData.targetEntity.node)
            .getPortFromID(linkData.targetEntity.port);

          const link = new SimpleLinkModel({ id: linkData.id });

          link.setSourcePort(sourcePort);
          link.setTargetPort(targetPort);
          link.setPoints(linkData.points);

          engine.getModel().addLink(link);
        });
      };

      engine.commands.add({
        execute: () => {
          controlLink(before, after);
        },
        undo: () => {
          controlLink(after, before);
        }
      });
    },

    /**
     * Link changed handler. Occurs when a link is extended.
     */
    linkChanged: ({ before, after }) => {
      const handleLinkChanged = from => {
        const link = engine.getModel().getLink(from.id);

        // Update link points
        link.setPoints(from.points);
        const port = !!from.targetEntity.port &&
          engine.getModel().getNode(from.targetEntity.node)?.getPortFromID(from.targetEntity.port);

        link.setTargetPort(port || null);
      };

      engine.commands.add({
        execute: () => {
          handleLinkChanged(after);
        },
        undo: () => {
          handleLinkChanged(before);
        }
      });
    },
    /**
     * Node's options changed handler
     */
    nodeOptionsUpdated: ({ before, after }) => {
      const handleOptionsChanged = from => {
        const node = engine.getModel().getNode(from.id);

        node.options = { ...from, selected: false };
      };

      engine.commands.add({
        execute: () => {
          handleOptionsChanged(after);
        },
        undo: () => {
          handleOptionsChanged(before);
        }
      });
    },
    variableOptionsUpdated: ({ before, after }) => {
      const handleOptionsChanged = ({ id, options }) => {
        const diagramEngine = engine.getModel().engine;

        diagramEngine.updateVariableOptions(id, options, false);
      };

      engine.commands.add({
        execute: () => {
          handleOptionsChanged(after);
        },
        undo: () => {
          handleOptionsChanged(before);
        }
      });
    },
    /**
     * Components and links removal handler.
     */
    entitiesRemoved: ({
      nodes = [], links = [], points = [], variables = []
    }) => {
      engine.commands.add({
        execute: () => {
          // Removes all links
          links.forEach(link => engine.getModel().getLink(link.id).remove());

          // Removes all nodes
          nodes.forEach(node => node.remove());

          // Remove all points
          points.forEach(({ data }) => data.remove());

          variables.forEach(variable => engine.getModel().engine.removeVariable(variable.id, false));
        },
        undo: () => {
          variables.forEach(variable => engine.getModel().engine.addVariable(variable));

          // Adds all nodes
          nodes.forEach(node => engine.getModel().addNode(node));

          links
            .forEach(linkData => {
              const sourcePort = engine.getModel().getNode(linkData.sourceEntity.node)
                .getPortFromID(linkData.sourceEntity.port);
              const targetPort = engine.getModel().getNode(linkData.targetEntity.node)
                .getPortFromID(linkData.targetEntity.port);

              const link = new SimpleLinkModel({ id: linkData.id });

              link.setSourcePort(sourcePort);
              link.setTargetPort(targetPort);
              link.setPoints(linkData.points);

              engine.getModel().addLink(link);

              link.getSourcePort()?.updatePortStatus();
              link.getTargetPort()?.updatePortStatus();
              engine.getModel().addLink(link);
            });

          points.forEach(({ linkID, data }) => engine.getModel().getLink(linkID).addPoint(data));
        }
      });
    },

    /**
     * Components and links move handler.
     */
    entitiesMoved: ({ nodes, links }) => {
      const handleEntitiesMoved = state => {
        // Updates all moved nodes position
        nodes[state].forEach(({ id, position }) => {
          const node = engine.getModel().getNode(id);

          node.setPosition(position.x, position.y);
        });

        // Updates all moved links points
        links[state].forEach(({ id, points }) => {
          const link = engine.getModel().getLink(id);

          const linkPoints = link.getPoints();

          linkPoints.forEach(point => {
            point.setPosition(points[point.getID()].position.x, points[point.getID()].position.y);
          });
        });
      };

      engine.commands.add({
        execute: () => {
          handleEntitiesMoved('after');
        },
        undo: () => {
          handleEntitiesMoved('before');
        }
      });
    }
  };
};

export default commandHandlers;
