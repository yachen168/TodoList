export default class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.renderTodos();
        this.view.bindNewConfirmButton(this.addNewTodo.bind(this));
    }
    renderTodos() {
        this.view.renderTodos(this.model.todos);
        // 重新綁定
        this.todoCount();
        this.editCancel();
        this.deleteTodo();
        this.bindStar();
        this.editDone();
    }
    addNewTodo() {
        this.model.addNewTodo(this.view.addNewTodo());
        this.view.clearNewTodo();
        this.todoCount();
        this.renderTodos();
    }
    editCancel() {
        this.view.bindCancelEditButton(this.renderTodos.bind(this));
    }
    editDone() {
        this.view.bindConfirmEditButton(function(e, index) {
            // console.log(e.target);
            this.model.editDone(this.view.editDone(index), index);
            console.log(this.model.todos);
            // this.renderTodos.call(this);
        }.bind(this));
    }
    deleteTodo() {
        this.view.bindDeleteButton(function(e, index) {
            this.model.deleteTodo(index);
            this.renderTodos();
        }.bind(this));
    }
    todoCount() {
        this.view.todoCount(this.model.todoCount());
    }
    bindStar() {
        this.view.bindStar(function(e, index) {
            this.view.bindStar(this.model.todos);
            this.model.bindStared(index);
            this.renderTodos();
        }.bind(this));
    }

    toggleCompeted() {}
    findTodo() {
        this.view.findTodo(this.model.todos);
    }
}