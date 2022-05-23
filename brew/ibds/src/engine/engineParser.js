// const engine = require('./tpl.json');

const parser = engine => {
  const parsedEngine = {};
  let nodes = {};
  let links = {};

  for (const layer of engine.layers) {
    switch (layer.type) {
      case 'diagram-nodes':
        nodes = layer.models;
        break;
      case 'diagram-links':
        links = layer.models;
        break;
      default:
        break;
    }
  }

  const getNextNodeIdByLink = (currentId, link) => {
    if (!link) {
      return null;
    }

    return link.target === currentId ? link.source : link.target;
  };

  for (const nodeId of Object.keys(nodes)) {
    const currentNode = nodes[nodeId];

    // Пропускаем ноды со значениями, так как они нужны только для хранения value
    if (currentNode.type === 'variableNode') {
      continue;
    }
    if (currentNode.type === 'startNode') {
      parsedEngine.start = {
        type: 'text',
        direction: 'outgoing',
        maxWaitingTime: 5000,
        content: '/start',
        nextId: getNextNodeIdByLink(currentNode.id, links[currentNode.ports[0].links[0]])
      };
      continue;
    }

    let nextId = null;
    let content = null;
    const buttons = [];

    for (const port of currentNode.ports) {
      if (port.name === 'flowOut' && port.links.length > 0) {
        nextId = getNextNodeIdByLink(currentNode.id, links[port.links[0]]);
      } else if (['outgoingText', 'comparisonText'].includes(port.name)) {
        const node = getNextNodeIdByLink(currentNode.id, links[port.links[0]]);

        content = nodes[node]?.data.value || null;
      } else if (port.type === 'button' && port.links.length > 0) {
        for (const link of port.links) {
          // const node = getNextNodeIdByLink(currentNode.id, links[link]);

          buttons.push(nodes[getNextNodeIdByLink(currentNode.id, links[link])].data.value);
        }
      }
    }
    parsedEngine[currentNode.id] = {
      type: currentNode.type,
      // TODO: Проверять тип до этого. Если его нет в списке доступных, то выбрасывать ошибку
      direction: ['incomingText', 'incomingMedia'].includes(currentNode.type) ? 'incoming' : 'outgoing',
      maxWaitingTime: 5000,
      content,
      nextId,
      buttons
    };
  }

  return parsedEngine;
};

export default parser;
