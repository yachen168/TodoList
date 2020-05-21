'use strict'

export default class Model {
    constructor() {
        const localStorage = window.localStorage;
        this.todos = [{
            id: 1,
            todoTitle: '吃飯',
            todoDate: '2020-05-05',
            todoTime: '12:00',
            todoComment: '二碗',
            isStared: false,
            isCompleted: false
        }, {
            id: 2,
            todoTitle: '睡覺',
            todoDate: '',
            todoTime: '',
            todoComment: '一天',
            isStared: false,
            isCompleted: false
        }];
    }
    addNewTodo(newTodo) {
        this.todos.push({
            id: 3,
            todoTitle: newTodo.todoTitle,
            todoDate: newTodo.todoDate,
            todoTime: newTodo.todoTime,
            todoComment: newTodo.todoComment,
            isStared: false,
            isCompleted: false
        });
    }
    editDone(editTodo, index) {
        // const copyTodos = this.todos.map(item => item);
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