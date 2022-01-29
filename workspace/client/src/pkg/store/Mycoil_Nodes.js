const nodes = new Map();

function registerNode(node) {
  if (nodes.has(node.key)) {
    const message = `Duplicate atom key "${node.key}". This is a FATAL ERROR in
      production. But it is safe to ignore this warning if it occurred because of
      hot module replacement.`;
    console.warn(message);
  }

  nodes.set(node.key, node.state);
  return node.key;
}

function getNode(key) {
  return nodes.get(key);
}

function setNode(node) {
  nodes.set(node.key, node.state);
  return nodes.get(node.key);
}

function myAtom(mycoilValue) {
  return registerNode(mycoilValue);
}

export { myAtom, getNode, setNode };
