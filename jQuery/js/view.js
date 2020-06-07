import template from './template.js';

export default class View {
    constructor() {
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
        this.$newCardFooter = $('.new-todo .new-card-footer');
        this.$newCancelButton = $('.new-button-cancel');
        this.$newConfirmButton = $('.new-button-confirm');
        this.$navItems = $('.nav-item');
        this.$todoCounter = $('.todo-count');
        this.$nav = $('nav ul');

        this.$addTaskButtons.on('click', this.toggleNewCard.bind(this));
        this.$newConfirmButton.on('click', this.newConfirmButtonHandler.bind(this));
        this.$newCancelButton.on('click', this.toggleNewCard.bind(this));
        this.$newCancelButton.on('click', this.clearNewTodo.bind(this));
        this.$newStar.on('click', this.markNewTodo.bind(this));
        this.init();
    }
    init() {
        this.updateNode();
        this.$pens.each((i, $pen) => {
            $pen.addEventListener('click', this.switchToggle.bind(this.$editAreas, i));
            $pen.addEventListener('click', this.toggleInput.bind(this.$todoNames[i]));
        })
        this.$navItems.each((i, $navItem) => {
            $navItem.addEventListener('click', this.switchToggle.bind(this.$navItems, i));
        })
        this.$cardFooters.each((i, $cardFooter) => {
            $cardFooter.addEventListener('click', this.switchToggle.bind(this.$editAreas, i))
        })
        this.$allInputs.each((i, $input) => {
            $input.addEventListener('click', this.autoSelected);
        })
        this.$allTextAreas.each((i, $textArea) => {
            $textArea.addEventListener('click', this.autoSelected);
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
        this.$cardFooters = $('.todo-list .card-footer');
        this.$stars = $('.todo-list .star');
        this.$pens = $('.todo-list .pen');
        this.$deleteButtons = $('.todo-list .delete');
        this.$checkboxes = $('.todo-list .checkbox');
        this.$editAreas = $('.todo-list .edit-area');
        this.$allInputs = $('input');
        this.$allTextAreas = $('textarea');
    }
    bindNewConfirmButton(listener) {
        this.$newConfirmButton.on('click', listener);
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
        this.$deleteButtons.on('click', function(e) {
            listener(e);
        });
    }
    bindStar(listener) {
        this.$stars.on('click', function(e) {
            listener(e);
        });
    }
    bindCheckbox(listener) {
        this.$checkboxes.on('click', function(e) {
            listener(e);
        });
    }
    switchState(listener) {
        this.$nav.on('click', function(e) {
            if (e.target.matches('li')) {
                listener(e);
            }
        })
    }
    renderTodos(todos) {
        this.$todoList.html(template.todoItem(todos));
        this.init();
    }
    renderCounter(leftTodo, completedTodo, state) {
        if (state === 'completed')
            this.$todoCounter.html(template.completedCounter(completedTodo));
        else
            this.$todoCounter.html(template.leftCounter(leftTodo));
    }
    addNewTodo() {
        return {
            todoTitle: this.$newTodoName.val(),
            todoComment: this.$newTodoComment.val(),
            todoDate: this.$newTodoDate.val(),
            todoTime: this.$newTodoTime.val(),
            isStarred: this.$newTodoBar.hasClass('active'),
            isCompleted: this.$newCheckbox.checked
        }
    }
    newConfirmButtonHandler(e) {
        e.preventDefault();
        const isTodoTitleEmpty = $.trim(this.$newTodoName.val());
        if (!isTodoTitleEmpty)
            alert('尚未輸入代辦事項名稱');
        else
            this.$newTodoEditArea.toggleClass('active');
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
        this.$newTodoName.val('');
        this.$newTodoComment.val('');
        this.$newTodoDate.val('');
        this.$newTodoTime.val('');
        this.$newTodoBar.removeClass('active');
        this.$newCheckbox.checked = false;
    }
    autoSelected() {
        this.select();
    }
    markNewTodo() {
        this.$newTodoBar.toggleClass('active');
    }
    switchToggle(index, e) {
        this.removeClass('active')
        this[index].classList.add('active')
    }
    toggleNewCard(e) {
        e.preventDefault();
        this.$newTodoEditArea.toggleClass('active');
    }
    toggleInput() {
        this.disabled = !this.disabled;
    }
}