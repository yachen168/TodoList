export default class Controller {
    constructor(model, view) {
        this.model = model
        this.view = view
        this.renderTodos();
    }
    renderTodos() {
        this.view.getTodos(this.model.todos);
    }
}