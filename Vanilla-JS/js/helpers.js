export function toggleActive(nodeItem) {
  nodeItem.classList.toggle('active');
}

export function clearAllClass(nodeItems) {
  nodeItems.forEach((nodeItem) => nodeItem.classList.remove('active'));
}

export function qs(selector,scope){
  return (scope||document).querySelector(selector);
}

export function qsAll(selector,scope){
  return (scope||document).querySelectorAll(selector);
}
