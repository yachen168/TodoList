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
            isCompleted: false
        });
    }
    editDone(editTodo, index) {
        this.todos.splice(index, 1, editTodo);
    }
    deleteTodo(index) {
        this.todos.splice(this.todos.length - index - 1, 1);
    }
    todoCount() {
        let leftTodo = 0;
        this.todos.forEach((todo) => {
            if (!todo.isCompleted) {
                leftTodo++;
            } else {
                leftTodo--;
            }
        })
        return leftTodo;
    }
    bindStared(index) {
        this.todos[this.todos.length - index - 1].isStared = !this.todos[this.todos.length - index - 1].isStared;
    }
    toggleCompleted() {}
}