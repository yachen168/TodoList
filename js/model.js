'use strict'

export default class Model {
    constructor() {
        this.todos = this.getLocalStorage() || [];
    }
    addNewTodo(newTodo) {
        this.todos.push({
            todoTitle: newTodo.todoTitle,
            todoDate: newTodo.todoDate,
            todoTime: newTodo.todoTime,
            todoComment: newTodo.todoComment,
            isStared: newTodo.isStared,
            isCompleted: newTodo.isCompleted
        });
        this.setLocalStorage();
    }
    setLocalStorage() {
        localStorage.setItem('todos', JSON.stringify(this.todos));
    }
    getLocalStorage() {
        return JSON.parse(localStorage.getItem('todos'));
    }
    sortTodos() {
        return this.todos.sort((a, b) => {
            let scoreA = (a.isStared ? 100 : 0) + (a.isCompleted ? -200 : 0);
            let scoreB = (b.isStared ? 100 : 0) + (b.isCompleted ? -200 : 0);
            return scoreA - scoreB;
        })
    }
    editDone(editTodo, index) {
        const i = this.todos.length - index - 1;
        this.todos[i] = editTodo;
        this.setLocalStorage();
    }
    deleteTodo(index) {
        const i = this.todos.length - index - 1;
        this.todos.splice(i, 1);
        this.setLocalStorage();
    }
    leftCounter() {
        let leftTodo = 0;
        this.todos.forEach(todo => {
            if (!todo.isCompleted) leftTodo++;
        })
        return leftTodo;
    }
    completedCounter() {
        let completedTodo = 0;
        this.todos.forEach(todo => {
            if (todo.isCompleted) completedTodo++;
        })
        return completedTodo;
    }
    bindStar(index) {
        const i = this.todos.length - index - 1;
        this.todos[i].isStared = !this.todos[i].isStared;
        this.setLocalStorage();
    }
    bindCheckbox(index) {
        const i = this.todos.length - index - 1;
        this.todos[i].isCompleted = !this.todos[i].isCompleted;
        this.setLocalStorage();
    }
}