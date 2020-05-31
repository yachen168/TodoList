import { qs, toggleActive, clearAllClass } from './helpers.js';

export let that;
export default class View {
    constructor() {
        that = this;
        this.$todoList = $('.todo-list');
        this.$addTaskButtons = $('.add-todo');
        this.$newTodoBar = $('.new-todo .todo-bar');
        this.$newStar = $('.new-todo .star');
        this.$newCheckbox = $('.new-todo .checkbox');
        this.$newTodoName = $('.new-todo-name');
        this.$newTodoEditArea = $('.new-todo-edit-area');
        this.$newTodoDate = $('.new-date');
        this.$newTodoTime = $('.new-time');
        this.$newTodoComment = $('.add-comment');
        this.$newCancelButton = $('.new-button-cancel');
        this.$newConfirmButton = $('.new-button-confirm');
        this.$navItems = $('.nav-item');
        this.$todoCounter = $('.todo-count');
        this.$nav = $('nav ul');
        this.$addTaskButtons.click(this.toggleNewCard);
        this.$newStar.click(this.markNewTodo);
        this.$newConfirmButton.click(this.newConfirmButtonHandler);
        this.$newCancelButton.click(this.toggleNewCard);
        this.$newCancelButton.click(this.clearNewTodo);
        this.init();
    }
    init() {
        this.updateNode();
        this.$pens.each((i, $pen) => {
            // $pen.i = i;
            $pen.addEventListener('click', this.penEventHandler);
        })
        this.$navItems.each((i, $navItem) => {
            $navItem.addEventListener('click', this.navItemEventHandler);
        })
        this.$allInputs.each((i, $input) => {
            $input.addEventListener('click', this.autoSelected);
        })
        this.$allTextareas.each((i, $textarea) => {
            $textarea.addEventListener('click', this.autoSelected);
        })
        this.$cancelButtons.each((i, $cancelButton) => {
            $cancelButton.i = i;
            $cancelButton.addEventListener('click', this.toggleEditCard);
        })
        this.$confirmButtons.each((i, $confirmButton) => {
            $confirmButton.i = i;
            $confirmButton.addEventListener('click', this.toggleEditCard);
        })
    }
    updateNode() {
        this.$todoBars = $('.todo-list .todo-bar');
        this.$todoTitles = $('.todo-list .todo-title');
        this.$editCards = $('.todo-list .card');
        this.$todoNames = $('.todo-list .todo-name');
        this.$todoDates = $('.todo-list .date');
        this.$todoTimes = $('.todo-list .time');
        this.$todoComments = $('.todo-list .comment-content')
        this.$cancelButtons = $('.todo-list .button-cancel');
        this.$confirmButtons = $('.todo-list .button-confirm');
        this.$stars = $('.todo-list .star');
        this.$pens = $('.todo-list .pen');
        this.$deleteButtons = $('.todo-list .delete');
        this.$checkboxes = $('.todo-list .checkbox');
        this.$editAreas = $('.todo-list .edit-area');
        this.$allInputs = $('input');
        this.$allTextareas = $('textarea');
    }
    bindNewConfirmButton(listener) {
        this.$newConfirmButton.click(listener);
    }
    bindCancelEditButton(listener) {
        this.$cancelButtons.each(function(i) {
            $(this).click(e => {
                listener(e, i);
            });
        })
    }
    bindConfirmEditButton(listener) {
        this.$confirmButtons.each(function(i) {
            $(this).click(e => {
                listener(e, i);
            });
        })
    }
    bindDeleteButton(listener) {
        this.$deleteButtons.each(function(i) {
            $(this).click(e => {
                listener(e, i);
            });
        })
    }
    bindStar(listener) {
        this.$stars.each(function(i) {
            $(this).click(e => {
                listener(e, i);
            });
        })
    }
    bindCheckbox(listener) {
        this.$checkboxes.each(function(i) {
            $(this).click(e => {
                listener(e, i);
            });
        })
    }
    bindNavItem(listener) {
        this.$nav.click(function(e) {
            if (e.target.matches('li')) {
                listener();
            }
        })
    }
    renderTodos(todos) {
        this.$todoList.html('');
        $.each(todos, (i, todo) => {
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
                that.$todoList.append(item);
            }
            if (that.$navItems[1].classList.contains('active')) {
                that.$todoList.append(itemInProgress);
            }
            if (that.$navItems[2].classList.contains('active')) {
                that.$todoList.append(itemCompleted);
            }
        })
        that.init();
    }
    renderCounter(leftTodo, completedTodo) {
        if (that.$navItems[0].classList.contains('active')) {
            that.$todoCounter.html((leftTodo > 1) ? `${leftTodo} tasks left` : `${leftTodo} task left`);
        }
        if (that.$navItems[1].classList.contains('active')) {
            that.$todoCounter.html((leftTodo > 1) ? `${leftTodo} tasks left` : `${leftTodo} task left`);
        }
        if (that.$navItems[2].classList.contains('active')) {
            that.$todoCounter.html((completedTodo > 1) ? `${completedTodo} tasks completed` : `${completedTodo} task completed`);
        }
    }
    addNewTodo() {
        if (that.$newTodoName.val()) {
            return {
                todoTitle: that.$newTodoName.val(),
                todoComment: that.$newTodoComment.val(),
                todoDate: that.$newTodoDate.val(),
                todoTime: that.$newTodoTime.val(),
                isStarred: that.$newTodoBar.hasClass('active'),
                isCompleted: that.$newCheckbox.attr('checked')
            }
        }
        this.clearNewTodo();
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
        that.$newTodoName.val('');
        that.$newTodoComment.val('');
        that.$newTodoDate.val('');
        that.$newTodoTime.val('');
        let isStarred = that.$newTodoBar.hasClass('active');
        if (isStarred) {
            that.$newTodoBar.toggleClass('active');
        }
        let isCompleted = that.$newCheckbox.prop('checked');
        if (isCompleted) {
            that.$newCheckbox.prop('checked', false)
        }
    }
    autoSelected() {
        this.select();
    }
    markNewTodo() {
        that.$newTodoBar.toggleClass('active');
    }
    navItemEventHandler() {
        clearAllClass(that.$navItems);
        toggleActive(this);
    }
    newConfirmButtonHandler(e) {
        e.preventDefault();
        const isTodoTitleEmpty = !(that.$newTodoName.val());
        if (isTodoTitleEmpty)
            alert('尚未輸入代辦事項名稱');
        else
            that.$newTodoEditArea.toggleClass('active');
    }
    penEventHandler() {
        clearAllClass(that.$editAreas);
        toggleActive(that.$editAreas[this.i]);
        that.$todoNames[this.i].disabled = !that.$todoNames[this.i].disabled;
    }
    toggleNewCard(e) {
        e.preventDefault();
        that.$newTodoEditArea.toggleClass('active');
    }
    toggleEditCard() {
        toggleActive(that.$editCards[this.i]);
        that.$todoNames[this.i].disabled = !that.$todoNames[this.i].disabled;
    }
}