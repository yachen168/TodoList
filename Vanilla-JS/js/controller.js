export default class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.state = 'all';

    this.init();

  }

  init = () => {
    this.renderTodos();
    this.bindNewConfirmButton();
  }

  renderTodos = () => {
    this.view.renderTodos(this.model.stateFilter(this.state));
    this.bindEventHandler();

    this.view.switchState(e => {
      this.state = e.target.dataset.name;
      this.view.renderTodos(this.model.stateFilter(this.state));
      this.bindEventHandler();
    });
  }

  renderCounter = () => {
    let leftTodo = this.model.leftCounter();
    let completedTodo = this.model.completedCounter();
    this.view.renderCounter(leftTodo, completedTodo, this.state);
  }

  addNewTodo = () => {
    const newTodo = this.view.addNewTodo();
    const todoTitleEmpty = /^\s*$/;
    const isTodoTitleEmpty = todoTitleEmpty.test(newTodo.todoTitle);

    if (!isTodoTitleEmpty) {
      this.model.addNewTodo(this.view.addNewTodo());
      this.view.clearNewTodo();
      this.renderTodos();
    }
  }

  editDone = () => {
    this.view.bindConfirmEditButton((e, index) => {
      this.model.editDone(this.view.editDone(index), e.target.dataset.id);
      this.renderTodos();
    });
  }

  bindHandler = (bindType) => {
    return this.view[bindType](e => {
      this.model[bindType](e.target.dataset.id);
      this.renderTodos();
    })
  }

  editCanceled = () => {
    this.view.bindCancelEditButton(() => this.renderTodos());
  }

  bindNewConfirmButton = () => {
    this.view.bindNewConfirmButton(this.addNewTodo);
  }

  bindEventHandler = () => {
    this.renderCounter();
    this.bindHandler('bindStar');
    this.bindHandler('bindCheckbox');
    this.bindHandler('deleteTodo');
    this.editDone();
    this.editCanceled();
  }
}
