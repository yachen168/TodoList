export default class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.view.bindConfirmButton(this.addNewTodo.bind(this));
        this.renderTodos();
    }
    renderTodos() {
        this.view.getTodos(this.model.todos);
    }
    addNewTodo() {
        this.model.addNewTodo(this.view.addNewTodo());
        this.view.clearInputValue();
        this.renderTodos();
        console.log(this.model.todos);
    }
}