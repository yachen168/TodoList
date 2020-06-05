import { toggleActive, clearAllClass } from './helpers.js';

export default class View {
    constructor() {
        this.$todoList = document.querySelector('.todo-list');
        this.$addTaskButtons = document.querySelector('.add-todo');
        this.$newTodoBar = document.querySelector('.new-todo .todo-bar');
        this.$newStar = document.querySelector('.new-todo .star');
        this.$newCheckbox = document.querySelector('.new-todo .checkbox');
        this.$newTodoName = document.querySelector('.new-todo-name');
        this.$newTodoEditArea = document.querySelector('.new-todo-edit-area');
        this.$newTodoDate = document.querySelector('.new-date');
        this.$newTodoTime = document.querySelector('.new-time');
        this.$newTodoComment = document.querySelector('.add-comment');
        this.$newCardFooter = document.querySelector('.new-todo .new-card-footer');
        this.$newCancelButton = document.querySelector('.new-button-cancel');
        this.$newConfirmButton = document.querySelector('.new-button-confirm');
        this.$navItems = document.querySelectorAll('.nav-item');
        this.$todoCounter = document.querySelector('.todo-count');
        this.$nav = document.querySelector('nav ul');
        this.$addTaskButtons.addEventListener('click', this.toggleNewCard.bind(this));
        this.$newConfirmButton.addEventListener('click', this.newConfirmButtonHandler.bind(this));
        this.$newCancelButton.addEventListener('click', this.toggleNewCard.bind(this));
        this.$newCancelButton.addEventListener('click', this.clearNewTodo.bind(this));
        this.$newStar.addEventListener('click', this.markNewTodo.bind(this));
        this.init();
    }
    init() {
        this.updateNode();
        this.$pens.forEach(($pen, i) => {
            $pen.addEventListener('click', this.switchToggle.bind(this.$editAreas, i));
            $pen.addEventListener('click', this.toggleInput.bind(this.$todoNames[i]));
        })
        this.$navItems.forEach(($navItem, i) => {
            $navItem.addEventListener('click', this.switchToggle.bind(this.$navItems, i));
        })
        this.$allInputs.forEach($input => {
            $input.addEventListener('click', this.autoSelected);
        })
        this.$allTextAreas.forEach($textArea => {
            $textArea.addEventListener('click', this.autoSelected);
        })
        this.$cardFooters.forEach(($cardFooter, i) => {
            $cardFooter.addEventListener('click', this.switchToggle.bind(this.$editAreas, i))
        })
    }
    updateNode() {
        this.$todoBars = this.$todoList.querySelectorAll('.todo-bar');
        this.$todoTitles = this.$todoList.querySelectorAll('.todo-title');
        this.$editCards = this.$todoList.querySelectorAll('.card');
        this.$todoNames = this.$todoList.querySelectorAll('.todo-name');
        this.$todoDates = this.$todoList.querySelectorAll('.date');
        this.$todoTimes = this.$todoList.querySelectorAll('.time');
        this.$todoComments = this.$todoList.querySelectorAll('.comment-content')
        this.$cancelButtons = this.$todoList.querySelectorAll('.button-cancel');
        this.$confirmButtons = this.$todoList.querySelectorAll('.button-confirm');
        this.$cardFooters = this.$todoList.querySelectorAll('.card-footer');
        this.$stars = this.$todoList.querySelectorAll('.star');
        this.$pens = this.$todoList.querySelectorAll('.pen');
        this.$deleteButtons = this.$todoList.querySelectorAll('.delete');
        this.$checkboxes = this.$todoList.querySelectorAll('.checkbox');
        this.$editAreas = this.$todoList.querySelectorAll('.edit-area');
        this.$allInputs = document.querySelectorAll('input');
        this.$allTextAreas = document.querySelectorAll('textarea');
    }
    bindNewConfirmButton(listener) {
        this.$newConfirmButton.addEventListener('click', listener);
    }
    bindCancelEditButton(listener) {
        this.$cancelButtons.forEach(($cancelButton, i) => {
            $cancelButton.addEventListener('click', function(e) {
                listener(e, i);
            });
        })
    }
    bindConfirmEditButton(listener) {
        this.$confirmButtons.forEach(($confirmButton, i) => {
            $confirmButton.addEventListener('click', function(e) {
                listener(e, i);
            });
        })
    }
    bindDeleteButton(listener) {
        this.$deleteButtons.forEach($deleteButton => {
            $deleteButton.addEventListener('click', function(e) {
                listener(e);
            });
        })
    }
    bindStar(listener) {
        this.$stars.forEach($star => {
            $star.addEventListener('click', function(e) {
                listener(e);
            });
        })
    }
    bindCheckbox(listener) {
        this.$checkboxes.forEach($checkbox => {
            $checkbox.addEventListener('click', function(e) {
                listener(e);
            });
        })
    }
    switchState(listener) {
        this.$nav.addEventListener('click', function(e) {
            if (e.target.matches('li')) {
                listener(e);
            }
        })
    }
    renderTodos(stateFilter) {
        this.$todoList.innerHTML = '';
        stateFilter.forEach(todo => {
            const item = `
            <form class="edit-area">
                    <div class="todo-bar ${todo.isStarred?'active':''}" data-id="${todo.todoId}">
                        <div class="hover-dots">
                            <span>∙</span>
                            <span>∙</span>
                            <span>∙</span>
                        </div>
                        <label class="todo-title">
                            <input class="checkbox" data-id="${todo.todoId}" type="checkbox" ${todo.isCompleted?'checked':''}>
                            <input class="todo-name" type="text" value="${todo.todoTitle}" placeholder="Type Something Here…" disabled>
                        </label>
                        <div class="icon-wrapper">
                            <span class="star"><i class="far fa-star" data-id="${todo.todoId}"></i></span>
                            <span class="pen"><i class="fas fa-pen"></i></span>
                            <span class="delete"><i class="fas fa-trash-alt" data-id="${todo.todoId}"></i></span>
                        </div>
                        <div class="hint-icons">
                            <i class="far fa-calendar-alt ${todo.todoDate?'active':''}"><span class="hint-date">${todo.todoDate}</span></i>
                            <i class="far fa-file"></i>
                            <i class="far fa-comment-dots ${todo.todoComment?'active':''}"></i>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-body">
                            <div class="deadline">
                                <h3><i class="far fa-calendar-alt"></i>Deadline</h3>
                                <div class="input-wrapper">
                                    <input class="date" type="date" value="${todo.todoDate}">
                                    <input class="time" type="time" value="${todo.todoTime}">
                                </div>
                            </div>
                            <div class="file">
                                <h3><i class="far fa-file"></i>File</h3>
                                <label class="upload">
                                    <input class="upload-input" type="file">
                                    <span class="upload-icon">+</span>
                                </label>
                            </div>
                            <div class="comment">
                                <h3><i class="far fa-comment-dots"></i>Comment</h3>
                                <textarea class="comment-content" placeholder="Type your memo here...">${todo.todoComment}</textarea>
                            </div>
                        </div>
                        <div class="card-footer">
                            <button type="submit" class="button-cancel"><i class="fas fa-times"> Cancel </i></button>
                            <button type="submit" class="button-confirm" data-id="${todo.todoId}"><i class="fas fa-plus"> Save </i></button>
                        </div>
                    </div>
                </form>
            `;
            this.$todoList.insertAdjacentHTML('beforeend', item);
        })
        this.init();
    }
    renderCounter(leftTodo, completedTodo, state) {
        if (state === 'completed') {
            this.$todoCounter.innerHTML = (completedTodo > 1) ? `${completedTodo} tasks completed` : `${completedTodo} task completed`;
        } else {
            this.$todoCounter.innerHTML = (leftTodo > 1) ? `${leftTodo} tasks left` : `${leftTodo} task left`;
        }
    }
    addNewTodo() {
        return {
            todoTitle: this.$newTodoName.value,
            todoComment: this.$newTodoComment.value,
            todoDate: this.$newTodoDate.value,
            todoTime: this.$newTodoTime.value,
            isStarred: this.$newTodoBar.classList.contains('active'),
            isCompleted: this.$newCheckbox.checked
        }
    }
    newConfirmButtonHandler(e) {
        e.preventDefault();
        const isTodoTitleEmpty = this.$newTodoName.value.trim();
        if (!isTodoTitleEmpty)
            alert('尚未輸入代辦事項名稱');
        else
            toggleActive(this.$newTodoEditArea);
    }
    editDone(index) {
        return {
            todoTitle: this.$todoNames[index].value,
            todoComment: this.$todoComments[index].value,
            todoDate: this.$todoDates[index].value,
            todoTime: this.$todoTimes[index].value,
            isStarred: this.$todoBars[index].classList.contains('active'),
            isCompleted: this.$checkboxes[index].checked
        }
    }
    clearNewTodo() {
        this.$newTodoName.value = '';
        this.$newTodoComment.value = '';
        this.$newTodoDate.value = '';
        this.$newTodoTime.value = '';
        this.$newTodoBar.classList.remove('active');
        this.$newCheckbox.checked = false;
    }
    autoSelected() {
        this.select();
    }
    markNewTodo() {
        toggleActive(this.$newTodoBar);
    }
    switchToggle(index) {
        clearAllClass(this)
        toggleActive(this[index]);
    }
    toggleNewCard(e) {
        e.preventDefault();
        toggleActive(this.$newTodoEditArea);
    }
    toggleInput() {
        this.disabled = !this.disabled;
    }
}