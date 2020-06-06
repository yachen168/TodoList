export default class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.state = 'all';
        this.renderTodos();
        this.bindNewConfirmButton();
    }
    renderTodos() {
        this.view.renderTodos(this.model.stateFilter(this.state));
        this.bindEventHandler();

        this.view.switchState(function(e) {
            this.state = e.target.dataset.name;
            this.view.renderTodos(this.model.stateFilter(this.state));
            this.bindEventHandler();
        }.bind(this));
    }
    renderCounter() {
        let leftTodo = this.model.leftCounter();
        let completedTodo = this.model.completedCounter();
        this.view.renderCounter(leftTodo, completedTodo, this.state);
    }
    addNewTodo() {
        const newTodo = this.view.addNewTodo();
        const todoTitleEmpty = /^$|^\s*$/;
        const isTodoTitleEmpty = todoTitleEmpty.test(newTodo.todoTitle);
        if (!isTodoTitleEmpty) {
            this.model.addNewTodo(this.view.addNewTodo());
            this.view.clearNewTodo();
            this.renderTodos();
        }
    }
    editDone() {
        this.view.bindConfirmEditButton(function(e, index) {
            this.model.editDone(this.view.editDone(index), e.target.dataset.id);
            this.renderTodos();
        }.bind(this));
    }
    editCanceled() {
        this.view.bindCancelEditButton(function(e) {
            console.log(123)
            this.renderTodos();
        }.bind(this));
    }
    deleteTodo() {
        this.view.bindDeleteButton(function(e) {
            this.model.deleteTodo(e.target.dataset.id);
            this.renderTodos();
        }.bind(this));
    }
    bindAllStar() {
        this.view.bindStar(function(e) {
            this.model.bindStar(e.target.dataset.id);
            this.renderTodos();
        }.bind(this));
    }
    bindCheckbox() {
        this.view.bindCheckbox(function(e) {
            this.model.bindCheckbox(e.target.dataset.id);
            this.renderTodos();
        }.bind(this));
    }
    bindNewConfirmButton() {
        this.view.bindNewConfirmButton(this.addNewTodo.bind(this));
    }
    bindEventHandler() {
        this.renderCounter();
        this.deleteTodo();
        this.bindAllStar();
        this.editDone();
        this.editCanceled();
        this.bindCheckbox();
    }
}