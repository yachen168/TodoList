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
        this.todos[index] = editTodo;
        this.setLocalStorage();
    }
    deleteTodo(index) {
        this.todos.splice(index, 1);
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
        this.todos[index].isStared = !this.todos[index].isStared;
        this.setLocalStorage();
    }
    bindCheckbox(index) {
        this.todos[index].isCompleted = !this.todos[index].isCompleted;
        this.setLocalStorage();
    }
}