'use strict'

import { qs, toggleActive } from './helpers.js';

//  View
export let that;
export default class heView {
    constructor(template) {
            that = this;
            this.template = template;
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
            this.init();
        }
        // 初始化綁定事件
    init() {
        this.updateNode();
        this.$addTaskButtons.addEventListener('click', this.toggleNewCard);
        this.$newConfirmButton.addEventListener('click', this.newConfirmButtonHandler);
        this.$newCancelButton.addEventListener('click', this.toggleNewCard);
        this.$newCancelButton.addEventListener('click', this.clearNewTodo);
        this.$newStar.addEventListener('click', this.bindNewStar);
        this.$stars.forEach(($star, i) => {
            $star.i = i;
            $star.addEventListener('click', this.toggleStared);
        })
        this.$pens.forEach(($pen, i) => {
            $pen.i = i;
            $pen.addEventListener('click', this.bindClickPen);
        })
        this.$navItems.forEach(($navItem, i) => {
            $navItem.i = i;
            $navItem.addEventListener('click', this.toggleNavItem);
        })
        this.$cancelButtons.forEach(($cancelButton, i) => {
            $cancelButton.i = i;
            $cancelButton.addEventListener('click', this.toggleCard);
        })
        this.$confirmButtons.forEach(($confirmButton, i) => {
            $confirmButton.i = i;
            $confirmButton.addEventListener('click', this.toggleCard);
        })
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
        this.$navItems.forEach(($navItem, i) => {
            $navItem.addEventListener('click', function(e) {
                listener(e, i);
            });
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
        this.$todoNames = this.$todoList.querySelectorAll('.todo-name');
        this.$checkboxes = this.$todoList.querySelectorAll('.checkbox');
    }
    renderTodos(todos) {
        this.$todoList.innerHTML = '';
        todos.forEach((todo, i) => {
            const todoTitle = todo.todoTitle;
            const todoComment = todo.todoComment;
            const todoDate = todo.todoDate;
            const todoTime = todo.todoTime;
            const isStared = todo.isStared;
            const isCompleted = todo.isCompleted;
            const item = `
            <div class="edit-area">
                    <div class="todo-bar ${isStared?'active':''}" data-id="${i}">
                        <div class="hover-dots">
                            <span>∙</span>
                            <span>∙</span>
                            <span>∙</span>
                        </div>
                        <label class="todo-title">
                        <input class="checkbox" type="checkbox" ${isCompleted?'checked':''}>
                        <input class="todo-name ${isStared?'active':''}" type="text" value="${todoTitle}" placeholder="Type Something Here…" disabled>
                    </label>
                        <div class="icon-wrapper">
                            <span class="star"><i class="fas fa-star ${isStared?'active':''}"></i><i class="far fa-star ${isStared?'':'active'}"></i></span>
                            <span class="pen"><i class="fas fa-pen"></i></span>
                            <span class="delete"><i class="fas fa-trash-alt" data-id="${i}"></i></span>
                        </div>
                        <div class="hint-icons">
                            <i class="far fa-calendar-alt ${todoDate?'active':''}"></i><span></span>
                            <i class="far fa-file"></i>
                            <i class="far fa-comment-dots ${todoComment?'active':''}"></i>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-body">
                            <div class="deadline">
                                <h3><i class="far fa-calendar-alt"></i>Deadline</h3>
                                <div class="input-wrapper">
                                    <input class="date" type="date" value="${todoDate}" placeholder="yyyy/mm/dd">
                                    <input class="time" type="time" value="${todoTime}" placeholder="hh:mm">
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
                            <button class="button-cancel"><i class="fas fa-times"></i>Cancel</button>
                            <button class="button-confirm"><i class="fas fa-plus"></i>Save</button>
                        </div>
                    </div>
                </div>
            `;
            const itemInProgress = `
            <div class="edit-area" style="${isCompleted?'display: none':''}">
                    <div class="todo-bar ${isStared?'active':''}" data-id="${i}">
                        <div class="hover-dots">
                            <span>∙</span>
                            <span>∙</span>
                            <span>∙</span>
                        </div>
                        <label class="todo-title">
                        <input class="checkbox" type="checkbox" ${isCompleted?'checked':''}>
                        <input class="todo-name ${isStared?'active':''}" type="text" value="${todoTitle}" placeholder="Type Something Here…" disabled>
                    </label>
                        <div class="icon-wrapper">
                            <span class="star"><i class="fas fa-star ${isStared?'active':''}"></i><i class="far fa-star ${isStared?'':'active'}"></i></span>
                            <span class="pen"><i class="fas fa-pen"></i></span>
                            <span class="delete"><i class="fas fa-trash-alt" data-id="${i}"></i></span>
                        </div>
                        <div class="hint-icons">
                            <i class="far fa-calendar-alt ${todoDate?'active':''}"></i><span></span>
                            <i class="far fa-file"></i>
                            <i class="far fa-comment-dots ${todoComment?'active':''}"></i>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-body">
                            <div class="deadline">
                                <h3><i class="far fa-calendar-alt"></i>Deadline</h3>
                                <div class="input-wrapper">
                                    <input class="date" type="date" value="${todoDate}" placeholder="yyyy/mm/dd">
                                    <input class="time" type="time" value="${todoTime}" placeholder="hh:mm">
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
                            <button class="button-cancel"><i class="fas fa-times"></i>Cancel</button>
                            <button class="button-confirm"><i class="fas fa-plus"></i>Save</button>
                        </div>
                    </div>
                </div>
            `;
            const itemCompleted = `
            <div class="edit-area" style="${isCompleted?'':'display: none'}">
                    <div class="todo-bar ${isStared?'active':''}" data-id="${i}">
                        <div class="hover-dots">
                            <span>∙</span>
                            <span>∙</span>
                            <span>∙</span>
                        </div>
                        <label class="todo-title">
                        <input class="checkbox" type="checkbox" ${isCompleted?'checked':''}>
                        <input class="todo-name ${isStared?'active':''}" type="text" value="${todoTitle}" placeholder="Type Something Here…" disabled>
                    </label>
                        <div class="icon-wrapper">
                            <span class="star"><i class="fas fa-star ${isStared?'active':''}"></i><i class="far fa-star ${isStared?'':'active'}"></i></span>
                            <span class="pen"><i class="fas fa-pen"></i></span>
                            <span class="delete"><i class="fas fa-trash-alt" data-id="${i}"></i></span>
                        </div>
                        <div class="hint-icons">
                            <i class="far fa-calendar-alt ${todoDate?'active':''}"></i><span></span>
                            <i class="far fa-file"></i>
                            <i class="far fa-comment-dots ${todoComment?'active':''}"></i>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-body">
                            <div class="deadline">
                                <h3><i class="far fa-calendar-alt"></i>Deadline</h3>
                                <div class="input-wrapper">
                                    <input class="date" type="date" value="${todoDate}" placeholder="yyyy/mm/dd">
                                    <input class="time" type="time" value="${todoTime}" placeholder="hh:mm">
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
                            <button class="button-cancel"><i class="fas fa-times"></i>Cancel</button>
                            <button class="button-confirm"><i class="fas fa-plus"></i>Save</button>
                        </div>
                    </div>
                </div>
            `;
            if (that.$navItems[0].classList.contains('active')) {
                that.$todoList.insertAdjacentHTML('afterbegin', item);
            }
            if (that.$navItems[1].classList.contains('active')) {
                that.$todoList.insertAdjacentHTML('afterbegin', itemInProgress);
            }
            if (that.$navItems[2].classList.contains('active')) {
                that.$todoList.insertAdjacentHTML('afterbegin', itemCompleted);
            }
        })
        that.init();
    }
    addNewTodo() {
        const todoTitle = that.$newTodoName.value;
        const todoComment = that.$newTodoComment.value;
        const todoDate = that.$newTodoDate.value;
        const todoTime = that.$newTodoTime.value;
        const isStared = that.$newStar.firstElementChild.classList.contains('active');
        const isCompleted = that.$newCheckbox.checked;
        if (todoTitle) {
            return {
                todoTitle,
                todoComment,
                todoDate,
                todoTime,
                isStared,
                isCompleted
            }
        }
    }
    editDone(index) {
        const todoTitle = that.$todoNames[index].value;
        const todoComment = that.$todoComments[index].value;
        const todoDate = that.$todoDates[index].value;
        const todoTime = that.$todoTimes[index].value;
        const isStared = that.$stars[index].firstElementChild.classList.contains('active');
        const isCompleted = that.$checkboxes[index].checked;
        return {
            todoTitle,
            todoComment,
            todoDate,
            todoTime,
            isStared,
            isCompleted
        }
    }
    clearNewTodo() {
        that.$newTodoName.value = '';
        that.$newTodoComment.value = '';
        that.$newTodoDate.value = '';
        that.$newTodoTime.value = '';
        let isStared = that.$newStar.firstElementChild.classList.contains('active');
        if (isStared) {
            toggleActive(that.$newStar.firstElementChild);
            toggleActive(that.$newStar.lastElementChild);
            toggleActive(that.$newTodoName);
            toggleActive(that.$newTodoBar);
        }
        let isCompleted = that.$newCheckbox.checked;
        if (isCompleted) {
            that.$newCheckbox.checked = !that.$newCheckbox.checked;
        }
    }
    todoCount(leftTodo) {
        this.$todoCounter.innerHTML = `${leftTodo} tasks left`
    }
    dragTodo() {}
    toggleNavItem() {
        that.clearAllNavItems();
        toggleActive(this);
    }
    bindNewStar() {
        toggleActive(this.firstElementChild);
        toggleActive(this.lastElementChild);
        toggleActive(that.$newTodoName);
        toggleActive(that.$newTodoBar);
    }
    toggleStar() {
        toggleActive(this.firstElementChild);
        toggleActive(this.lastElementChild);
        toggleActive(that.$todoBars[this.i]);
        toggleActive(that.$todoNames[this.i]);
    }
    bindClickPen() {
        that.clearAllCards();
        that.clearAllPens();
        toggleActive(this.firstElementChild);
        toggleActive(that.$editCards[this.i]);
        that.$todoNames[this.i].disabled = !that.$todoNames[this.i].disabled;
    }
    toggleNewCard() {
        toggleActive(that.$newTodoEditArea);
    }
    newConfirmButtonHandler() {
        const isTodoTitleEmpty = !(that.$newTodoName.value);
        if (isTodoTitleEmpty) {
            confirm('尚未輸入代辦事項名稱');
        } else {
            toggleActive(that.$newTodoEditArea);
        }
    }
    bindNewCardFooter() {
        toggleActive(that.$newTodoEditArea);
    }
    toggleCard() {
        toggleActive(that.$pens[this.i].firstElementChild);
        toggleActive(that.$editCards[this.i]);
        that.$todoNames[this.i].disabled = !that.$todoNames[this.i].disabled;
    }
    clearAllNavItems() {
        that.$navItems.forEach($navItem => $navItem.classList.remove('active'));
    }
    clearAllCards() {
        that.$editCards.forEach($editCard => $editCard.classList.remove('active'));
    }
    clearAllPens() {
        that.$pens.forEach($pen => {
            $pen.firstElementChild.classList.remove('active');
        })
    }
}