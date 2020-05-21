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
            isStared: false,
            isCompleted: false
        });
    }
    editDone(editTodo, index) {
        this.todos[index] = editTodo;
    }
    todoCount() {
        let leftTodo = 0;
        this.todos.forEach((todo) => {
            if (!todo.isCompleted) {
                leftTodo++;
            } else {
                leftTodo--;
            }
            if (leftTodo < 0) {
                leftTodo = 0;
            }
        })
        return leftTodo;
    }
    toggleStar() {
        // this.isStared = !this.isStared;
    }
    toggleCompleted(todo) {
        todo.isCompleted = !todo.isCompleted;
    }
}