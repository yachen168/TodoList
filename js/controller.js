export default class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.renderTodos();
        // this.bindNavItem();
        this.view.bindNewConfirmButton(this.addNewTodo.bind(this));
    }
    renderTodos() {
        this.view.renderTodos(this.model.todos);
        this.bindEventHandler();
    }
    bindNavItem() {
        this.view.bindNavItem(this.renderTodos.bind(this));
    }
    bindEventHandler() {
        this.todoCount();
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
            this.renderTodos();
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
    bindAllStar() {
            this.view.bindStar(function(e, index) {
                this.model.bindStar(index);
                this.renderTodos();
            }.bind(this));
        }
        // bindCompletedStar() {
        //     this.view.bindStar(function(e, index) {
        //         this.model.bindStar(index);
        //         this.renderCompletedTodos();
        //     }.bind(this));
        // }
    bindCheckbox() {
        this.view.bindCheckbox(function(e, index) {
            this.model.bindCheckbox(index);
            console.log(index);
            this.renderTodos();
        }.bind(this));
    }
}