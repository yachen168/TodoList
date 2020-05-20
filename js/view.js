import { qs, toggleActive } from './helpers.js';

//  View
export let that;
export default class View {
    constructor(template) {
            that = this;
            this.template = template;
            this.$todoList = document.querySelector('.todo-list');
            this.$addTaskButtons = document.querySelector('.add-todo');
            this.$todoCounter = document.querySelector('.todo-count');
            this.$newTodoBar = document.querySelector('.new-todo .todo-bar');
            this.$newTodoName = document.querySelector('.new-todo-name');
            this.$newTodoEditArea = document.querySelector('.new-todo-edit-area');
            this.$newTodoDate = document.querySelector('.new-date');
            this.$newTodoTime = document.querySelector('.new-time');
            this.$newStar = document.querySelector('.new-todo .star');
            this.$newTodoComment = document.querySelector('.add-comment');
            this.$newCardFooter = document.querySelector('.new-card-footer');
            this.$newCancelButton = document.querySelector('.new-button-cancel');
            this.$newConfirmButton = document.querySelector('.new-button-confirm');
            this.$navItems = document.querySelectorAll('.nav-item');
            this.init();
            this.updateNode();
        }
        // 初始化綁定事件
    init() {
            this.updateNode();
            this.$addTaskButtons.addEventListener('click', this.bindButtonAddTask);
            this.$newStar.addEventListener('click', this.bindNewStar);
            this.$stars.forEach(($star, i) => {
                $star.i = i;
                $star.addEventListener('click', this.bindStars);
            })
            this.$pens.forEach(($pen, i) => {
                $pen.i = i;
                $pen.addEventListener('click', this.bindClickPen);
            })
            this.$navItems.forEach(($navItem, i) => {
                $navItem.i = i;
                $navItem.addEventListener('click', this.bindClickNavItem);
            })
            this.$cardFooters.forEach(($cardFooter, i) => {
                $cardFooter.i = i;
                $cardFooter.addEventListener('click', this.bindCardFooter);
            })
            this.$newCardFooter.addEventListener('click', this.bindNewCardFooter);
            this.$newConfirmButton.addEventListener('click', this.addItem);
        }
        // 更新動態產生的節點
    updateNode() {
        this.$todoBars = this.$todoList.querySelectorAll('.todo-bar');
        this.$todoTitles = this.$todoList.querySelectorAll('.todo-title');
        this.$editCards = this.$todoList.querySelectorAll('.card');
        this.$todoNames = this.$todoList.querySelectorAll('.todo-name');
        this.$cardFooters = this.$todoList.querySelectorAll('.card-footer');
        this.$cancelButtons = this.$todoList.querySelectorAll('.button-cancel');
        this.$confirmButtons = this.$todoList.querySelectorAll('.button-confirm');
        this.$stars = this.$todoList.querySelectorAll('.star');
        this.$pens = this.$todoList.querySelectorAll('.pen');
        this.$todoNames = this.$todoList.querySelectorAll('.todo-name');
    }
    getTodos(todos) {
        todos.forEach((todo, i) => {
            let todoTitle = todo.title;
            let todoComment = todo.comment;
            let item = `
            <div class="edit-area">
                    <div class="todo-bar" data-id="${i}">
                        <div class="hover-dots">
                            <span>∙</span>
                            <span>∙</span>
                            <span>∙</span>
                        </div>
                        <label class="todo-title">
                        <input class="checkbox" type="checkbox">
                        <input class="todo-name" type="text" value="${todoTitle}" placeholder="Type Something Here…" disabled>
                    </label>
                        <div class="icon-wrapper">
                            <span class="star"><i class="fas fa-star"></i><i class="far fa-star active"></i></span>
                            <span class="pen"><i class="fas fa-pen"></i></span>
                        </div>
                        <div class="hint-icons">
                            <i class="far fa-calendar-alt"></i><span></span>
                            <i class="far fa-file"></i>
                            <i class="far fa-comment-dots"></i>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-body">
                            <div class="deadline">
                                <h3><i class="far fa-calendar-alt"></i>Deadline</h3>
                                <div class="input-wrapper">
                                    <input type="date" value="" placeholder="yyyy/mm/dd">
                                    <input type="time" value="" placeholder="hh:mm">
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
                                <textarea placeholder="Type your memo here...">${todoComment}</textarea>
                            </div>
                        </div>
                        <div class="card-footer">
                            <button class="button-cancel"><i class="fas fa-times"></i>Cancel</button>
                            <button class="button-confirm"><i class="fas fa-plus"></i>Save</button>
                        </div>
                    </div>
                </div>
            `
            that.$todoList.insertAdjacentHTML('beforeend', item);
            that.init();
        })
    }
    addItem() {
        let todoTitle = that.$newTodoName.value;
        let todoComment = that.$newTodoComment.value;
        let todoDate = that.$newTodoDate.value;
        let todoTime = that.$newTodoTime.value;
        let todo = `
        <div class="edit-area">
                <div class="todo-bar" data-id="">
                    <div class="hover-dots">
                        <span>∙</span>
                        <span>∙</span>
                        <span>∙</span>
                    </div>
                    <label class="todo-title">
                    <input class="checkbox" type="checkbox">
                    <input class="todo-name" type="text" value="${todoTitle}" placeholder="Type Something Here…" disabled>
                </label>
                    <div class="icon-wrapper">
                        <span class="star"><i class="fas fa-star"></i><i class="far fa-star active"></i></span>
                        <span class="pen"><i class="fas fa-pen"></i></span>
                    </div>
                    <div class="hint-icons">
                        <i class="far fa-calendar-alt"></i><span>${todoDate}</span>
                        <i class="far fa-file"></i>
                        <i class="far fa-comment-dots"></i>
                    </div>
                </div>
                <div class="card">
                    <div class="card-body">
                        <div class="deadline">
                            <h3><i class="far fa-calendar-alt"></i>Deadline</h3>
                            <div class="input-wrapper">
                                <input type="date" value="${todoDate}" placeholder="yyyy/mm/dd">
                                <input type="time" value="${todoTime}" placeholder="hh:mm">
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
                            <textarea placeholder="Type your memo here...">${todoComment}</textarea>
                        </div>
                    </div>
                    <div class="card-footer">
                        <button class="button-cancel"><i class="fas fa-times"></i>Cancel</button>
                        <button class="button-confirm"><i class="fas fa-plus"></i>Save</button>
                    </div>
                </div>
            </div>
        `
        that.$todoList.insertAdjacentHTML('beforeend', todo);
        that.$newTodoName.value = '';
        that.$newTodoComment.value = '';
        that.init();
    }

    removeTodoItem() {}
    editTodoItem() {}
    markTodo() {}
    dragTodo() {}
    bindClickNavItem() {
        that.clearClass();
        toggleActive(this);
    }
    bindNewStar() {
        toggleActive(this.firstElementChild);
        toggleActive(this.lastElementChild);
        toggleActive(that.$newTodoName);
        toggleActive(that.$newTodoBar);
    }
    bindStars() {
        toggleActive(this.firstElementChild);
        toggleActive(this.lastElementChild);
        toggleActive(that.$todoBars[this.i]);
        toggleActive(that.$todoNames[this.i]);
    }
    bindClickPen() {
        toggleActive(this.firstElementChild);
        toggleActive(that.$editCards[this.i]);
        that.$todoNames[this.i].disabled = !that.$todoNames[this.i].disabled;
    }
    bindButtonAddTask() {
        toggleActive(that.$newTodoEditArea);
        that.$newTodoName.disabled = !that.$newTodoName.disabled;
    }
    bindNewCardFooter() {
        toggleActive(that.$newTodoEditArea);
    }
    bindCardFooter() {
        toggleActive(that.$pens[this.i].firstElementChild);
        toggleActive(that.$editCards[this.i]);
        that.$todoNames[this.i].disabled = !that.$todoNames[this.i].disabled;
    }
    clearClass() {
        that.$navItems.forEach($navItem => $navItem.classList.remove('active'));
    }
}