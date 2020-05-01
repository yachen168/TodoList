// ======== 點擊 nav-item，切換樣式  ========
const navItems = document.querySelectorAll('.nav-item');

navItems.forEach(navItem => {
    navItem.addEventListener('click', () => {
        navItems.forEach(navItem => navItem.classList.remove('nav-item-active'));
        toggleClass(navItem, 'nav-item-active');
    })
})

// ======== 點擊星星，標記重要待辦事項 =======
const stars = document.querySelectorAll('.fa-star');
const taskBars = document.querySelectorAll('.task-bar');

stars.forEach((star, i) => star.addEventListener('click', () => {
    toggleClass(taskBars[i], 'task-bar-important');
    toggleClass(star, 'star-active');
}))

// ======== 點擊 +Add，出現新增事項編輯區  ========
const addNewTask = document.querySelector('.add-new-task');
const editNewTaskArea = document.querySelector('.edit-new-task-area');

addNewTask.addEventListener('click', () => {
    toggleClass(editNewTaskArea, 'edit-area-active');
});

// ======== 點擊鉛筆，出現該事項編輯區 ========
const pens = document.querySelectorAll('.task-item .fa-pen');
const oldTaskAreas = document.querySelectorAll('.edit-old-task-area');

pens.forEach((pen, i) => {
    pen.addEventListener('click', () => {
        toggleClass(oldTaskAreas[i], 'edit-area-active');
        toggleClass(pen, 'pen-active');
    })
})

// 點擊取消，關閉編輯區
const cancelButtons = document.querySelectorAll('.cancel');

cancelButtons.forEach(cancelButton => cancelButton.addEventListener('click', () => {
    toggleClass(cancelButton.parentNode.parentNode.parentNode, 'edit-area-active');
}))


// ======== toggle css class ========
function toggleClass(nodeItem, cssClass) {
    nodeItem.classList.toggle(cssClass);
}