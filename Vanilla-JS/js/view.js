import { toggleActive, clearAllClass , qs, qsAll } from './helpers.js';
import Template from './template.js';

export default class View {
  constructor() {
    this.template = new Template();
    this.$todoList = qs('.todo-list');
    this.$addTaskButton = qs('.add-todo');
    this.$newTodoBar = qs('.new-todo .todo-bar');
    this.$newStar = qs('.new-todo .star');
    this.$newCheckbox = qs('.new-todo .checkbox');
    this.$newTodoName = qs('.new-todo-name');
    this.$newTodoEditArea = qs('.new-todo-edit-area');
    this.$newTodoDate = qs('.new-date');
    this.$newTodoTime = qs('.new-time');
    this.$newTodoComment = qs('.add-comment');
    this.$newCardFooter = qs('.new-todo .new-card-footer');
    this.$newCancelButton = qs('.new-button-cancel');
    this.$newConfirmButton = qs('.new-button-confirm');
    this.$navItems = qsAll('.nav-item');
    this.$todoCounter = qs('.todo-count');
    this.$nav = qs('nav ul');

    this.$addTaskButton.addEventListener('click', this.toggleNewCard);
    this.$newConfirmButton.addEventListener('click', this.newConfirmButtonHandler);
    this.$newCancelButton.addEventListener('click', this.toggleNewCard);
    this.$newCancelButton.addEventListener('click', this.clearNewTodo);
    this.$newStar.addEventListener('click', this.markNewTodo);

    this.init();
  }

  init() {
    this.updateNode();
    this.$pens.forEach(($pen, i) => {
      $pen.addEventListener('click', this.switchToggle.bind(this.$editAreas, i));
      $pen.addEventListener('click', this.toggleInput.bind(this.$todoNames[i]));
    });
    this.$navItems.forEach(($navItem, i) => {
      $navItem.addEventListener('click', this.switchToggle.bind(this.$navItems, i));
    });
    this.$allInputs.forEach($input => {
      $input.addEventListener('click', this.autoSelected);
    });
    this.$allTextAreas.forEach($textArea => {
      $textArea.addEventListener('click', this.autoSelected);
    });
  }

  updateNode() {
    this.$todoBars = qsAll('.todo-bar',this.$todoList,this.$todoList);
    this.$todoNames = qsAll('.todo-name',this.$todoList);
    this.$todoDates = qsAll('.date',this.$todoList);
    this.$todoTimes = qsAll('.time',this.$todoList);
    this.$todoComments = qsAll('.comment-content',this.$todoList);
    this.$cancelButtons = qsAll('.button-cancel',this.$todoList);
    this.$confirmButtons = qsAll('.button-confirm',this.$todoList);
    this.$cardFooters = qsAll('.card-footer',this.$todoList);
    this.$stars = qsAll('.star',this.$todoList);
    this.$pens = qsAll('.pen',this.$todoList);
    this.$deleteButtons = qsAll('.delete',this.$todoList);
    this.$checkboxes = qsAll('.checkbox',this.$todoList);
    this.$editAreas = qsAll('.edit-area',this.$todoList);
    this.$allInputs = qsAll('input',this.$todoList);
    this.$allTextAreas = qsAll('textarea',this.$todoList);
  }

  bindNewConfirmButton(listener) {
    this.$newConfirmButton.addEventListener('click', listener);
  }

  bindCancelEditButton(listener) {
    this.$cancelButtons.forEach(($cancelButton, i) => {
      $cancelButton.addEventListener('click', function(e) {
        listener(e, i);
      });
    });
  }

  bindConfirmEditButton(listener) {
    this.$confirmButtons.forEach(($confirmButton, i) => {
      $confirmButton.addEventListener('click', function(e) {
        listener(e, i);
      });
    });
  }

  deleteTodo(listener) {
    this.$deleteButtons.forEach($deleteButton => {
      $deleteButton.addEventListener('click', function(e) {
        listener(e);
      });
    });
  }

  bindStar(listener) {
    this.$stars.forEach($star => {
      $star.addEventListener('click', function(e) {
        listener(e);
      });
    });
  }

  bindCheckbox(listener) {
    this.$checkboxes.forEach($checkbox => {
      $checkbox.addEventListener('click', function(e) {
        listener(e);
      });
    });
  }

  switchState(listener) {
    this.$nav.addEventListener('click', function(e) {
      if (e.target.matches('li')) {
        listener(e);
      }
    });
  }

  renderTodos(todos) {
    this.$todoList.innerHTML = this.template.todoItem(todos);
    this.init();
  }

  renderCounter(leftTodo, completedTodo, state) {
    if (state === 'completed'){
      this.$todoCounter.innerHTML = this.template.completedCounter( completedTodo);
    }else {
      this.$todoCounter.innerHTML = this.template.leftCounter(leftTodo);
    }
  }

  addNewTodo() {
    return {
      todoTitle: this.$newTodoName.value,
      todoComment: this.$newTodoComment.value,
      todoDate: this.$newTodoDate.value,
      todoTime: this.$newTodoTime.value,
      isStarred: this.$newTodoBar.classList.contains('active'),
      isCompleted: this.$newCheckbox.checked,
    };
  }

  newConfirmButtonHandler = (e) => {
    e.preventDefault();
    const isTodoTitleEmpty = this.$newTodoName.value.trim();
    if (!isTodoTitleEmpty){
      alert('尚未輸入代辦事項名稱');
    }else {
      toggleActive(this.$newTodoEditArea);
    }
  }

  markNewTodo = () => {
    toggleActive(this.$newTodoBar);
  }

  toggleNewCard = (e) => {
    e.preventDefault();
    toggleActive(this.$newTodoEditArea);
  }

  clearNewTodo = () => {
    this.$newTodoName.value = '';
    this.$newTodoComment.value = '';
    this.$newTodoDate.value = '';
    this.$newTodoTime.value = '';
    this.$newTodoBar.classList.remove('active');
    this.$newCheckbox.checked = false;
  }

  editDone(index) {
    return {
      todoTitle: this.$todoNames[index].value,
      todoComment: this.$todoComments[index].value,
      todoDate: this.$todoDates[index].value,
      todoTime: this.$todoTimes[index].value,
      isStarred: this.$todoBars[index].classList.contains('active'),
      isCompleted: this.$checkboxes[index].checked,
    };
  }

  autoSelected() {
    this.select();
  }

  switchToggle(index) {
    clearAllClass(this);
    toggleActive(this[index]);
  }

  toggleInput() {
    this.disabled = !this.disabled;
  }
}
