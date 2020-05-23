export default class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.renderTodos();
        this.view.bindNewConfirmButton(this.addNewTodo.bind(this));
    }
    renderTodos() {
        let todos = this.model.todos;
        let leftTodo = this.model.leftCounter();
        let completedTodo = this.model.completedCounter();
        this.view.renderTodos(todos, leftTodo, completedTodo);
        this.bindEventHandler();
    }
    bindNavItem() {
        this.view.bindNavItem(this.renderTodos.bind(this));
    }
    bindEventHandler() {
        this.editCancel();
        this.deleteTodo();
        this.bindAllStar();
        this.editDone();
        this.bindCheckbox();
        this.bindNavItem();
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
            console.log(index);
            this.renderTodos();
        }.bind(this));
    }
}