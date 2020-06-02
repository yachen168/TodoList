// helpers.js
export function toggleActive(nodeItem) {
    nodeItem.classList.toggle('active');
    // console.log(nodeItem)
}

export function clearAllClass(nodeItems) {
    nodeItems.each((i, nodeItem) => nodeItem.classList.remove('active'));
}