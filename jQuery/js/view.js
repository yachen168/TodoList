import template from './template.js';

export default class View {
    constructor() {
        this.todoList = $('.todo-list');
        this.addTaskButton = $('.add-todo');
        this.newTodoBar = $('.new-todo .todo-bar');
        this.newStar = $('.new-todo .star');
        this.newCheckbox = $('.new-todo .checkbox');
        this.newTodoName = $('.new-todo-name');
        this.newTodoEditArea = $('.new-todo-edit-area');
        this.newTodoDate = $('.new-date');
        this.newTodoTime = $('.new-time');
        this.newTodoComment = $('.add-comment');
        this.newCancelButton = $('.new-button-cancel');
        this.newConfirmButton = $('.new-button-confirm');
        this.navItems = $('.nav-item');
        this.todoCounter = $('.todo-count');
        this.nav = $('nav ul');

        this.addTaskButton.on('click', this.toggleNewCard.bind(this));
        this.newConfirmButton.on('click', this.newConfirmButtonHandler.bind(this));
        this.newCancelButton.on('click', this.toggleNewCard.bind(this));
        this.newCancelButton.on('click', this.clearNewTodo.bind(this));
        this.newStar.on('click', this.markNewTodo.bind(this));
        this.init();
    }
    init() {
        this.updateNode();
        this.pens.each((i, pen) => {
            $(pen).on('click', this.switchToggle.bind(this.editAreas, i));
            $(pen).on('click', this.toggleInput.bind(this.todoNames[i]));
        })
        this.navItems.each((i, navItem) => {
            $(navItem).on('click', this.switchToggle.bind(this.navItems, i));
        })
        this.cardFooters.each((i, cardFooter) => {
            $(cardFooter).on('click', this.switchToggle.bind(this.editAreas, i))
        })
        this.allInputs.on('click', this.autoSelected);
        this.allTextAreas.on('click', this.autoSelected);
    }
    updateNode() {
        this.todoBars = $('.todo-list .todo-bar');
        this.todoNames = $('.todo-list .todo-name');
        this.todoDates = $('.todo-list .date');
        this.todoTimes = $('.todo-list .time');
        this.todoComments = $('.todo-list .comment-content')
        this.cancelButtons = $('.todo-list .button-cancel');
        this.confirmButtons = $('.todo-list .button-confirm');
        this.cardFooters = $('.todo-list .card-footer');
        this.stars = $('.todo-list .star');
        this.pens = $('.todo-list .pen');
        this.deleteButtons = $('.todo-list .delete');
        this.checkboxes = $('.todo-list .checkbox');
        this.editAreas = $('.todo-list .edit-area');
        this.allInputs = $('input');
        this.allTextAreas = $('textarea');
    }
    bindNewConfirmButton(listener) {
        this.newConfirmButton.on('click', listener);
    }
    bindCancelEditButton(listener) {
        this.cancelButtons.each(function(i) {
            $(this).click(e => {
                listener(e, i);
            });
        })
    }
    bindConfirmEditButton(listener) {
        this.confirmButtons.each(function(i) {
            $(this).click(e => {
                listener(e, i);
            });
        })
    }
    bindDeleteButton(listener) {
        this.deleteButtons.on('click', function(e) {
            listener(e);
        });
    }
    bindStar(listener) {
        this.stars.on('click', function(e) {
            listener(e);
        });
    }
    bindCheckbox(listener) {
        this.checkboxes.on('click', function(e) {
            listener(e);
        });
    }
    switchState(listener) {
        this.nav.on('click', function(e) {
            if (e.target.matches('li')) {
                listener(e);
            }
        })
    }
    renderTodos(todos) {
        this.todoList.html(template.todoItem(todos));
        this.init();
    }
    renderCounter(leftTodo, completedTodo, state) {
        if (state === 'completed')
            this.todoCounter.html(template.completedCounter(completedTodo));
        else
            this.todoCounter.html(template.leftCounter(leftTodo));
    }
    addNewTodo() {
        console.log(this.newCheckbox);
        return {
            todoTitle: this.newTodoName.val(),
            todoComment: this.newTodoComment.val(),
            todoDate: this.newTodoDate.val(),
            todoTime: this.newTodoTime.val(),
            isStarred: this.newTodoBar.hasClass('active'),
            isCompleted: this.newCheckbox.prop('checked')
        }
    }
    newConfirmButtonHandler(e) {
        e.preventDefault();
        const isTodoTitleEmpty = $.trim(this.newTodoName.val());
        if (!isTodoTitleEmpty)
            alert('尚未輸入代辦事項名稱');
        else
            this.newTodoEditArea.toggleClass('active');
    }
    editDone(index) {
        return {
            todoTitle: $(this.todoNames[index]).val(),
            todoComment: $(this.todoComments[index]).val(),
            todoDate: $(this.todoDates[index]).val(),
            todoTime: $(this.todoTimes[index]).val(),
            isStarred: $(this.todoBars[index]).hasClass('active'),
            isCompleted: $(this.checkboxes[index]).prop('checked')
        }
    }
    clearNewTodo() {
        this.newTodoName.val('');
        this.newTodoComment.val('');
        this.newTodoDate.val('');
        this.newTodoTime.val('');
        this.newTodoBar.removeClass('active');
        this.newCheckbox.prop('checked', false);
    }
    autoSelected() {
        this.select();
    }
    markNewTodo() {
        this.newTodoBar.toggleClass('active');
    }
    switchToggle(index, e) {
        this.removeClass('active')
        $(this[index]).addClass('active')
    }
    toggleNewCard(e) {
        e.preventDefault();
        this.newTodoEditArea.toggleClass('active');
    }
    toggleInput() {
        this.disabled = !this.disabled;
    }
}