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
    todoCount() {
        let leftTodo = 0;
        this.todos.forEach((todo) => {
            if (!todo.isCompleted) {
                leftTodo++;
            }
        })
        return leftTodo;
    }
    toggleStar() {
        // this.isStared = !this.isStared;
    }
    toggleCompleted(todo) {
        this.isCompleted = !this.isCompleted;
    }
}