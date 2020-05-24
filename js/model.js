'use strict'

export default class Model {
    constructor() {
        this.todos = [];
        this.sortTodos();
    }
    addNewTodo(newTodo) {
        this.todos.push({
            todoTitle: newTodo.todoTitle,
            todoDate: newTodo.todoDate,
            todoTime: newTodo.todoTime,
            todoComment: newTodo.todoComment,
            isStared: newTodo.isStared,
            isCompleted: newTodo.isCompleted,
        });
    }
    sortTodos() {
        return this.todos.sort((a, b) => {
            let scoreA = (a.isStared ? 100 : 0) + (a.isCompleted ? -200 : 0)
            let scoreB = (b.isStared ? 100 : 0) + (b.isCompleted ? -200 : 0)
            return scoreA - scoreB;
        })
    }
    editDone(editTodo, index) {
        const i = this.todos.length - index - 1;
        this.todos[i] = editTodo;
    }
    deleteTodo(index) {
        const i = this.todos.length - index - 1;
        this.todos.splice(i, 1);
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
    }
    bindCheckbox(index) {
        const i = this.todos.length - index - 1;
        this.todos[i].isCompleted = !this.todos[i].isCompleted;
    }
}