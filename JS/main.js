// fake data
let data = {
    lists: [{
        id: 1,
        task: '吃飯',
        deadline: [],
        file: [],
        comment: '',
        isImportant: false,
        completed: false
    }, {
        id: 2,
        task: '睡覺',
        deadline: [],
        file: [],
        comment: '',
        isImportant: false,
        isCompleted: false
    }]
}

let methods = {
    getNumTasksLeft: () => {
        return data.lists.length;
    }
}

// ======== render tasks 畫面 ========
const taskItem = document.querySelector('.task-item');

function renderTasks() {
    let htmlString = '';
    data.lists.forEach((item, i) => {
        htmlString = htmlString + `
        <div class="task-bar" data-id="${i+1}">
        <label>
            <input class="checkbox" type="checkbox">
            <h2>${ item.task }</h2>
        </label>
        <div class="icon-wrapper">
            <i class="fas fa-star"></i>
            <i class="fas fa-pen"></i>
        </div>
    </div>
    <div class="edit-old-task-area">
        <div class="card">
            <div class="card-body">
                <div class="deadline">
                    <h3><i class="far fa-calendar-alt"></i>Deadline</h3>
                    <div class="input-wrapper">
                        <input type="text" placeholder="yyyy/mm/dd">
                        <input type="text" placeholder="hh:mm">
                    </div>
                </div>
                <div class="file">
                    <h3><i class="far fa-file"></i>File</h3>
                    <button class="plus">+</button>
                </div>
                <div class="comment">
                    <h3><i class="far fa-comment-dots"></i>Comment</h3>
                    <textarea placeholder="Type your memo here..."></textarea>
                </div>
            </div>
            <div class="card-footer">
                <button class="cancel"><i class="fas fa-times"></i>Cancel</button>
                <button class="addTask"><i class="fas fa-plus"></i>Save</button>
            </div>
        </div>
    </div>
        `;
    })

    taskItem.innerHTML = htmlString;
}

// ======== render how many tasks left ========
const numsTasksLeft = document.querySelector('.numbers-tasks-left');

function renderNumsTasksLeft() {
    numsTasksLeft.innerText = `${methods.getNumTasksLeft()} tasks left`;

}

renderTasks();
renderNumsTasksLeft();


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