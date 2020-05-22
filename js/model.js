'use strict'

export default class Model {
    constructor() {
        const localStorage = window.localStorage;
        this.todos = [];
    }
    addNewTodo(newTodo) {
        this.todos.push({
            id: this.todos.length > 0 ? this.todos.length + 1 : 1,
            todoTitle: newTodo.todoTitle,
            todoDate: newTodo.todoDate,
            todoTime: newTodo.todoTime,
            todoComment: newTodo.todoComment,
            isStared: newTodo.isStared,
            isCompleted: newTodo.isCompleted
        });
    }
    inProgressFilter() {
        const inProgressTodos = this.todos.filter((todo, i) => {
            todo.isCompleted === false;
        });
        return inProgressTodos;
    }
    completedFilter() {

        // const result = words.filter(word => word===3);
        const completedTodos = this.todos.filter(todo => todo.isCompleted === true);

        return completedTodos;
    }
    editDone(editTodo, index) {
        const i = this.todos.length - index - 1;
        this.todos[i] = editTodo;
    }
    deleteTodo(index) {
        const i = this.todos.length - index - 1;
        this.todos.splice(i, 1);
    }
    todoFilter(index) {

    }
    todoCount() {
        let leftTodo = 0;
        this.todos.forEach((todo) => {
            if (!todo.isCompleted) leftTodo++;
        })
        return leftTodo;
    }
    bindStar(index) {
        const i = this.todos.length - index - 1;
        this.todos[i].isStared = !this.todos[i].isStared;
    }
    bindCheckbox(index) {
        const i = this.todos.length - index - 1;
        this.todos[i].isCompleted = !this.todos[i].isCompleted;
    }
}