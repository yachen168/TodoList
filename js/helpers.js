// helpers.js
export function qs(selector, scope) {
    return (scope || document).querySelector(selector);
}

export function toggleActive(nodeItem) {
    nodeItem.classList.toggle('active');
}