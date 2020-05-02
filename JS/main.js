// fake data
let data = {
    NumTasksLeft: 0,
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
        data.NumTasksLeft = data.lists.length;
        return data.NumTasksLeft;
    },
    addNewTask: () => {
        data.lists.push({
            task: '看電視',
            deadline: [],
            file: [],
            comment: '',
            isImportant: false,
            isCompleted: false
        })
        renderNumsTasksLeft();
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
        <div class="old-task-bar" data-id="${i+1}">
        <label>
            <input class="checkbox" type="checkbox">
            <input class="old-task-name" type="text" disabled>
        </label>
        <div class="icon-wrapper">
            <i class="fas fa-star old-task-star"></i>
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
                    <label class="upload_cover">
                        <input class="upload_input" type="file">
                        <span class="upload_icon">+</span>
                    </label>
                </div>
                <div class="comment">
                    <h3><i class="far fa-comment-dots"></i>Comment</h3>
                    <textarea placeholder="Type your memo here..."></textarea>
                </div>
            </div>
            <div class="card-footer">
                <button class="buttonCancelEdit"><i class="fas fa-times"></i>Cancel</button>
                <button class="buttonConfirmEdit"><i class="fas fa-plus"></i>Save</button>
            </div>
        </div>
    </div>
        `;
    })
    taskItem.innerHTML = htmlString;
    methods.updateOldTaskName();

    // ======== 點擊鉛筆，出現該事項編輯區 ========
    const oldTaskAreas = document.querySelectorAll('.edit-old-task-area');
    const pens = document.querySelectorAll('.task-item .fa-pen');
    pens.forEach((pen, i) => {
        pen.addEventListener('click', () => {
            toggleClass(oldTaskAreas[i], 'edit-area-active');
            toggleClass(pen, 'pen-active');
            inputsOldTaskNames[i].disabled = false;
        })
    })

    // 點擊取消，關閉 old task 編輯區
    const cancelEditButtons = document.querySelectorAll('.buttonCancelEdit');

    cancelEditButtons.forEach((cancelEditButton, i) => cancelEditButton.addEventListener('click', () => {
        toggleClass(cancelEditButton.parentNode.parentNode.parentNode, 'edit-area-active');
        toggleClass(pens[i], 'pen-active');
    }))

    // 點擊「確定編輯」，更新原有 task
    const confirmEditButtons = document.querySelectorAll('.buttonConfirmEdit');
    confirmEditButtons.forEach((confirmEditButton, i) => {
        confirmEditButton.addEventListener('click', (e) => {
            toggleClass(confirmEditButtons[i].parentNode.parentNode.parentNode, 'edit-area-active');
            toggleClass(pens[i], 'pen-active');
        })
    })

    // ======== 點擊 old task 星星，標記重要待辦事項 =======
    const oldTaskStars = document.querySelectorAll('.old-task-star');
    const oldTaskBars = document.querySelectorAll('.old-task-bar');
    const inputsOldTaskNames = document.querySelectorAll('.old-task-name');
    oldTaskStars.forEach((oldTaskStar, i) => {
        if (data.lists[i].isImportant) {
            oldTaskBars[i].classList.add('task-bar-important');
            inputsOldTaskNames[i].classList.add('task-name-important');
            oldTaskStars[i].classList.add('star-active');
        }
        oldTaskStar.addEventListener('click', () => {
            data.lists[i].isImportant = !data.lists[i].isImportant;
            toggleClass(oldTaskBars[i], 'task-bar-important');
            toggleClass(oldTaskStar, 'star-active');
            toggleClass(inputsOldTaskNames[i], 'task-name-important');
        })
    })
}

// ======== render 剩餘 task ========
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

// ======== 點擊 +Add，出現新增事項編輯區  ========
const buttonAddNewTask = document.querySelector('.add-new-task');
const editNewTaskArea = document.querySelector('.edit-new-task-area');

buttonAddNewTask.addEventListener('click', () => {
    toggleClass(editNewTaskArea, 'edit-area-active');
});

// 點擊確定「新增」，關閉編輯區，並添加 task 至畫面
const confirmAddButton = document.querySelector('.buttonConfirmAdd');
const pens = document.querySelectorAll('.task-item .fa-pen');

confirmAddButton.addEventListener('click', () => {
    toggleClass(confirmAddButton.parentNode.parentNode.parentNode, 'edit-area-active');
    toggleClass(pens[0], 'pen-active');
    methods.addNewTask();
})


// 點擊取消，關閉 new task 編輯區
const cancelAddButton = document.querySelector('.buttonCancelAdd');

cancelAddButton.addEventListener('click', () => {
    toggleClass(cancelAddButton.parentNode.parentNode.parentNode, 'edit-area-active');
})


// checkbox (已完成)，更改 isCompleted 狀態為 true
const checkboxes = document.querySelectorAll('.task-item .checkbox');

checkboxes.forEach((checkbox, i) => checkbox.addEventListener('click', () => {
    data.lists[i].isCompleted = !data.lists[i].isCompleted;
    console.log(data.lists[i].isCompleted);
}))


// ======== 點擊 new task 星星，標記重要待辦事項 =======
const newTaskStar = document.querySelector('.new-task-star');
const mewTaskBar = document.querySelector('.new-task-bar');
const inputNewTaskName = document.querySelector('.new-task-name');

newTaskStar.addEventListener('click', () => {
    toggleClass(mewTaskBar, 'task-bar-important');
    toggleClass(inputNewTaskName, 'task-name-important');
})

// ======== toggle css class ========
function toggleClass(nodeItem, cssClass) {
    nodeItem.classList.toggle(cssClass);
}