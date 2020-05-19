export default class Model {
    constructor() {
        this.todos = [];
        this.addTodo();
    }
    addTodo(todoTitle, todoComment) {
        const todo = {
            id: this.todos.length > 0 ? this.todos.length + 1 : 1,
            title: todoTitle,
            deadline: [],
            comment: todoComment,
            isStared: false,
            isCompleted: false
        }
        this.todos.push(todo);
    }
    getTodo() {
        this.todos.forEach((todo, i) => {})
    }
    orderTodos() {}
    toggleStar() {
        this.isStared = !this.isStared;
    }
    toggleCompleted(todo) {
        this.isCompleted = !this.isCompleted;
    }
    editTodo() {}
    removeTodo() {}
    toggleTodo() {}
}