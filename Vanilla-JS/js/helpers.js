// helpers.js
export function toggleActive(nodeItem) {
    nodeItem.classList.toggle('active');
}

export function clearAllClass(nodeItems) {
    nodeItems.forEach(nodeItem => nodeItem.classList.remove('active'));
}