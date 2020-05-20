export default class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.view.bindNewConfirmButton(this.addNewTodo.bind(this));
        this.renderTodos();
        this.todoCount();
    }
    renderTodos() {
        this.view.getTodos(this.model.todos);
    }
    addNewTodo() {
        this.model.addNewTodo(this.view.addNewTodo());
        this.view.clearInputValue();
        this.todoCount();
        this.renderTodos();
        console.log(this.model.todos);
    }
    todoCount() {
        this.view.todoCount(this.model.todoCount());
    }

}