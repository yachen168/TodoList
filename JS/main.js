// fake data
let data = {
    lists: [{
        task: '吃飯',
        deadline: [],
        file: [],
        comment: '',
        isImportant: false,
        isCompleted: false
    }, {
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
    },
    addNewTask: () => {
        data.lists.push({
            task: '哈哈',
            deadline: [],
            file: [],
            comment: '',
            isImportant: false,
            isCompleted: false
        })
        return renderTasks();
    },
    updateOldTaskName: () => {
        const inputsOldTaskNames = document.querySelectorAll('.old-task-name');
        data.lists.forEach((item, i) => inputsOldTaskNames[i].value = item.task);
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
            <input class="old-task-name" type="text" disabled>
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
                <button class="buttonCancel"><i class="fas fa-times"></i>Cancel</button>
                <button class="buttonConfirm"><i class="fas fa-plus"></i>Save</button>
            </div>
        </div>
    </div>
        `;
    })
    taskItem.innerHTML = htmlString;
    methods.updateOldTaskName();
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
const inputNewTaskName = document.querySelector('.new-task-name');
const inputsOldTaskNames = document.querySelectorAll('.old-task-name');

stars.forEach((star, i) => star.addEventListener('click', () => {
    toggleClass(taskBars[i], 'task-bar-important');
    toggleClass(star, 'star-active');
    toggleClass(inputNewTaskName, 'task-name-important');
    // minus star of new task
    toggleClass(inputsOldTaskNames[i - 1], 'task-name-important');
}))

// ======== 點擊 +Add，出現新增事項編輯區  ========
const buttonAddNewTask = document.querySelector('.add-new-task');
const editNewTaskArea = document.querySelector('.edit-new-task-area');

buttonAddNewTask.addEventListener('click', () => {
    toggleClass(editNewTaskArea, 'edit-area-active');
});

// ======== 點擊鉛筆，出現該事項編輯區 ========
const pens = document.querySelectorAll('.task-item .fa-pen');
const oldTaskAreas = document.querySelectorAll('.edit-old-task-area');

pens.forEach((pen, i) => {
    pen.addEventListener('click', () => {
        toggleClass(oldTaskAreas[i], 'edit-area-active');
        toggleClass(pen, 'pen-active');
        inputsOldTaskNames[i].disabled = false;
    })
})

// 點擊取消，關閉編輯區
const cancelButtons = document.querySelectorAll('.buttonCancel');

cancelButtons.forEach((cancelButton, i) => cancelButton.addEventListener('click', () => {
    toggleClass(cancelButton.parentNode.parentNode.parentNode, 'edit-area-active');
    toggleClass(pens[i - 1], 'pen-active');
}))

// 點擊確定，關閉編輯區，並添加 task 至畫面
const confirmButtons = document.querySelectorAll('.buttonConfirm');

confirmButtons.forEach((confirmButton, i) => confirmButton.addEventListener('click', () => {
    toggleClass(confirmButton.parentNode.parentNode.parentNode, 'edit-area-active');
    toggleClass(pens[i - 1], 'pen-active');
}))



// ======== toggle css class ========
function toggleClass(nodeItem, cssClass) {
    nodeItem.classList.toggle(cssClass);
}