// helpers.js
export function qs(scope, selector) {
    return (scope || document).querySelector(selector);
}

export function toggleActive(nodeItem) {
    nodeItem.classList.toggle('active');
}

export function clearAllClass(nodeItems) {
    nodeItems.forEach(nodeItem => nodeItem.classList.remove('active'));
}