import { toggleActive, clearAllClass } from './helpers.js';
import template from './template.js';

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
        this.$todoList.innerHTML = template.todoItem(stateFilter);
        this.init();
    }
    renderCounter(leftTodo, completedTodo, state) {
        if (state === 'completed') {
            this.$todoCounter.innerHTML = template.completedCounter(completedTodo);
        } else {
            this.$todoCounter.innerHTML = template.leftCounter(leftTodo);
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