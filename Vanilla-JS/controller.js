export default class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.renderTodos();
        this.bindNavItem();
        this.bindNewConfirmButton();
    }
    renderTodos() {
        this.model.sortTodos();
        this.view.renderTodos(this.model.todos);
        this.bindEventHandler();
    }
    renderCounter() {
        let leftTodo = this.model.leftCounter();
        let completedTodo = this.model.completedCounter();
        this.view.renderCounter(leftTodo, completedTodo);
    }
    addNewTodo() {
        this.model.addNewTodo(this.view.addNewTodo());
        this.view.clearNewTodo();
        this.renderTodos();
    }
    editCancel() {
        this.view.bindCancelEditButton(this.renderTodos.bind(this));
    }
    editDone() {
        this.view.bindConfirmEditButton(function(e, index) {
            this.model.editDone(this.view.editDone(index), index);
            this.renderTodos();
        }.bind(this));
    }
    deleteTodo() {
        this.view.bindDeleteButton(function(e, index) {
            this.model.deleteTodo(index);
            this.renderTodos();
        }.bind(this));
    }
    bindAllStar() {
        this.view.bindStar(function(e, index) {
            this.model.bindStar(index);
            this.renderTodos();
        }.bind(this));
    }
    bindCheckbox() {
        this.view.bindCheckbox(function(e, index) {
            this.model.bindCheckbox(index);
            this.renderTodos();
        }.bind(this));
    }
    bindNavItem() {
        this.view.bindNavItem(this.renderTodos.bind(this));
    }
    bindNewConfirmButton() {
        this.view.bindNewConfirmButton(this.addNewTodo.bind(this));
    }
    bindEventHandler() {
        this.renderCounter();
        this.editCancel();
        this.deleteTodo();
        this.bindAllStar();
        this.editDone();
        this.bindCheckbox();
    }
}