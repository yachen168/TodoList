import { qs, toggleActive, clearAllClass } from './helpers.js';

export let that;
export default class View {
    constructor() {
        that = this;
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
        this.init();
    }
    init() {
        this.updateNode();
        this.$addTaskButtons.addEventListener('click', this.toggleNewCard);
        this.$newConfirmButton.addEventListener('click', this.newConfirmButtonHandler);
        this.$newCancelButton.addEventListener('click', this.toggleNewCard);
        this.$newCancelButton.addEventListener('click', this.clearNewTodo);
        this.$newStar.addEventListener('click', this.markNewTodo);
        this.$pens.forEach(($pen, i) => {
            $pen.i = i;
            $pen.addEventListener('click', this.penEventHandler);
        })
        this.$navItems.forEach(($navItem, i) => {
            $navItem.i = i;
            $navItem.addEventListener('click', this.navItemEventHandler);
        })
        this.$allInputs.forEach($input => {
            $input.addEventListener('click', this.autoSelected);
        })
        this.$allTextareas.forEach($textarea => {
            $textarea.addEventListener('click', this.autoSelected);
        })
        this.$cancelButtons.forEach(($cancelButton, i) => {
            $cancelButton.i = i;
            $cancelButton.addEventListener('click', this.toggleEditCard);
        })
        this.$confirmButtons.forEach(($confirmButton, i) => {
            $confirmButton.i = i;
            $confirmButton.addEventListener('click', this.toggleEditCard);
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
        this.$stars = this.$todoList.querySelectorAll('.star');
        this.$pens = this.$todoList.querySelectorAll('.pen');
        this.$deleteButtons = this.$todoList.querySelectorAll('.delete');
        this.$checkboxes = this.$todoList.querySelectorAll('.checkbox');
        this.$editAreas = this.$todoList.querySelectorAll('.edit-area');
        this.$allInputs = document.querySelectorAll('input');
        this.$allTextareas = document.querySelectorAll('textarea');
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
        this.$deleteButtons.forEach(($deleteButton, i) => {
            $deleteButton.addEventListener('click', function(e) {
                listener(e, i);
            });
        })
    }
    bindStar(listener) {
        this.$stars.forEach(($star, i) => {
            $star.addEventListener('click', function(e) {
                listener(e, i);
            });
        })
    }
    bindCheckbox(listener) {
        this.$checkboxes.forEach(($checkbox, i) => {
            $checkbox.addEventListener('click', function(e) {
                listener(e, i);
            });
        })
    }
    bindNavItem(listener) {
        this.$nav.addEventListener('click', function(e) {
            if (e.target.matches('li')) {
                listener();
            }
        })
    }
    renderTodos(todos) {
        this.$todoList.innerHTML = '';
        todos.forEach((todo, i) => {
            const todoTitle = todo.todoTitle;
            const todoComment = todo.todoComment;
            const todoDate = todo.todoDate;
            const todoTime = todo.todoTime;
            const isStarred = todo.isStarred;
            const isCompleted = todo.isCompleted;
            const item = `
            <form class="edit-area">
                    <div class="todo-bar ${isStarred?'active':''}" data-id="${i}">
                        <div class="hover-dots">
                            <span>∙</span>
                            <span>∙</span>
                            <span>∙</span>
                        </div>
                        <label class="todo-title">
                            <input class="checkbox" type="checkbox" ${isCompleted?'checked':''}>
                            <input class="todo-name" type="text" value="${todoTitle}" placeholder="Type Something Here…" disabled>
                        </label>
                        <div class="icon-wrapper">
                            <span class="star"><i class="far fa-star"></i></span>
                            <span class="pen"><i class="fas fa-pen"></i></span>
                            <span class="delete"><i class="fas fa-trash-alt" data-id="${i}"></i></span>
                        </div>
                        <div class="hint-icons">
                            <i class="far fa-calendar-alt ${todoDate?'active':''}"><span class="hint-date">${todoDate}</span></i>
                            <i class="far fa-file"></i>
                            <i class="far fa-comment-dots ${todoComment?'active':''}"></i>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-body">
                            <div class="deadline">
                                <h3><i class="far fa-calendar-alt"></i>Deadline</h3>
                                <div class="input-wrapper">
                                    <input class="date" type="date" value="${todoDate}">
                                    <input class="time" type="time" value="${todoTime}">
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
                                <textarea class="comment-content" placeholder="Type your memo here...">${todoComment}</textarea>
                            </div>
                        </div>
                        <div class="card-footer">
                            <button type="submit" class="button-cancel"><i class="fas fa-times"></i>Cancel</button>
                            <button type="submit" class="button-confirm"><i class="fas fa-plus"></i>Save</button>
                        </div>
                    </div>
                </form>
            `;
            const itemInProgress = `
            <form class="edit-area ${isCompleted?'d-none':''}">
                    <div class="todo-bar ${isStarred?'active':''}" data-id="${i}">
                        <div class="hover-dots">
                            <span>∙</span>
                            <span>∙</span>
                            <span>∙</span>
                        </div>
                        <label class="todo-title">
                            <input class="checkbox" type="checkbox" ${isCompleted?'checked':''}>
                            <input class="todo-name" type="text" value="${todoTitle}" placeholder="Type Something Here…" disabled>
                        </label>
                        <div class="icon-wrapper">
                            <span class="star"><i class="far fa-star"></i></span>
                            <span class="pen"><i class="fas fa-pen"></i></span>
                            <span class="delete"><i class="fas fa-trash-alt" data-id="${i}"></i></span>
                        </div>
                        <div class="hint-icons">
                            <i class="far fa-calendar-alt ${todoDate?'active':''}"><span class="hint-date">${todoDate}</span></i>
                            <i class="far fa-file"></i>
                            <i class="far fa-comment-dots ${todoComment?'active':''}"></i>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-body">
                            <div class="deadline">
                                <h3><i class="far fa-calendar-alt"></i>Deadline</h3>
                                <div class="input-wrapper">
                                    <input class="date" type="date" value="${todoDate}">
                                    <input class="time" type="time" value="${todoTime}">
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
                                <textarea class="comment-content" placeholder="Type your memo here...">${todoComment}</textarea>
                            </div>
                        </div>
                        <div class="card-footer">
                            <button type="submit" class="button-cancel"><i class="fas fa-times"></i>Cancel</button>
                            <button type="submit" class="button-confirm"><i class="fas fa-plus"></i>Save</button>
                        </div>
                    </div>
                </form>
            `;
            const itemCompleted = `
            <form class="edit-area ${isCompleted?'':'d-none'}">
                    <div class="todo-bar ${isStarred?'active':''}" data-id="${i}">
                        <div class="hover-dots">
                            <span>∙</span>
                            <span>∙</span>
                            <span>∙</span>
                        </div>
                        <label class="todo-title">
                            <input class="checkbox" type="checkbox" ${isCompleted?'checked':''}>
                            <input class="todo-name ${isStarred?'active':''}" type="text" value="${todoTitle}" placeholder="Type Something Here…" disabled>
                        </label>
                        <div class="icon-wrapper">
                            <span class="star"><i class="far fa-star"></i></span>
                            <span class="pen"><i class="fas fa-pen"></i></span>
                            <span class="delete"><i class="fas fa-trash-alt" data-id="${i}"></i></span>
                        </div>
                        <div class="hint-icons">
                            <i class="far fa-calendar-alt ${todoDate?'active':''}"><span class="hint-date">${todoDate}</span></i>
                            <i class="far fa-file"></i>
                            <i class="far fa-comment-dots ${todoComment?'active':''}"></i>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-body">
                            <div class="deadline">
                                <h3><i class="far fa-calendar-alt"></i>Deadline</h3>
                                <div class="input-wrapper">
                                    <input class="date" type="date" value="${todoDate}">
                                    <input class="time" type="time" value="${todoTime}">
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
                                <textarea class="comment-content" placeholder="Type your memo here...">${todoComment}</textarea>
                            </div>
                        </div>
                        <div class="card-footer">
                            <button type="submit" class="button-cancel"><i class="fas fa-times"></i>Cancel</button>
                            <button type="submit" class="button-confirm"><i class="fas fa-plus"></i>Save</button>
                        </div>
                    </div>
                </form>
            `;
            if (that.$navItems[0].classList.contains('active')) {
                that.$todoList.insertAdjacentHTML('beforeend', item);
            }
            if (that.$navItems[1].classList.contains('active')) {
                that.$todoList.insertAdjacentHTML('beforeend', itemInProgress);
            }
            if (that.$navItems[2].classList.contains('active')) {
                that.$todoList.insertAdjacentHTML('beforeend', itemCompleted);
            }
        })
        that.init();
    }
    renderCounter(leftTodo, completedTodo) {
        if (that.$navItems[0].classList.contains('active')) {
            that.$todoCounter.innerHTML = (leftTodo > 1) ? `${leftTodo} tasks left` : `${leftTodo} task left`;
        }
        if (that.$navItems[1].classList.contains('active')) {
            that.$todoCounter.innerHTML = (leftTodo > 1) ? `${leftTodo} tasks left` : `${leftTodo} task left`;
        }
        if (that.$navItems[2].classList.contains('active')) {
            that.$todoCounter.innerHTML = (completedTodo > 1) ? `${completedTodo} tasks completed` : `${completedTodo} task completed`;
        }
    }
    addNewTodo() {
        if (that.$newTodoName.value) {
            return {
                todoTitle: that.$newTodoName.value,
                todoComment: that.$newTodoComment.value,
                todoDate: that.$newTodoDate.value,
                todoTime: that.$newTodoTime.value,
                isStarred: that.$newTodoBar.classList.contains('active'),
                isCompleted: that.$newCheckbox.checked
            }
        }
    }
    editDone(index) {
        return {
            todoTitle: that.$todoNames[index].value,
            todoComment: that.$todoComments[index].value,
            todoDate: that.$todoDates[index].value,
            todoTime: that.$todoTimes[index].value,
            isStarred: that.$todoBars[index].classList.contains('active'),
            isCompleted: that.$checkboxes[index].checked
        }
    }
    clearNewTodo() {
        that.$newTodoName.value = '';
        that.$newTodoComment.value = '';
        that.$newTodoDate.value = '';
        that.$newTodoTime.value = '';
        let isStarred = that.$newTodoBar.classList.contains('active');
        if (isStarred) {
            toggleActive(that.$newTodoBar);
        }
        let isCompleted = that.$newCheckbox.checked;
        if (isCompleted) {
            that.$newCheckbox.checked = !that.$newCheckbox.checked;
        }
    }
    autoSelected() {
        this.select();
    }
    markNewTodo() {
        toggleActive(that.$newTodoBar);
    }
    navItemEventHandler() {
        clearAllClass(that.$navItems);
        toggleActive(this);
    }
    newConfirmButtonHandler(e) {
        e.preventDefault();
        const isTodoTitleEmpty = !(that.$newTodoName.value);
        if (isTodoTitleEmpty)
            alert('尚未輸入代辦事項名稱');
        else
            toggleActive(that.$newTodoEditArea);
    }
    penEventHandler() {
        clearAllClass(that.$editAreas);
        toggleActive(that.$editAreas[this.i]);
        that.$todoNames[this.i].disabled = !that.$todoNames[this.i].disabled;
    }
    toggleNewCard(e) {
        e.preventDefault();
        toggleActive(that.$newTodoEditArea);
    }
    toggleEditCard() {
        toggleActive(that.$editCards[this.i]);
        that.$todoNames[this.i].disabled = !that.$todoNames[this.i].disabled;
    }
}