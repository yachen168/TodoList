export default class Model {
    constructor() {
        const localStorage = window.localStorage;
        this.todos = [{
            id: 1,
            title: '吃飯',
            todoDate: '2020/05/05',
            todoTime: '12:00',
            comment: '二碗',
            isStared: false,
            isCompleted: false
        }, {
            id: 2,
            title: '睡覺',
            todoDate: '',
            todoTime: '',
            comment: '一天',
            isStared: false,
            isCompleted: false
        }];
    }
    addTodo(todo) {
        this.todos.push(todo);
    }
    toggleStar() {
        // this.isStared = !this.isStared;
    }
    toggleCompleted(todo) {
        this.isCompleted = !this.isCompleted;
    }
}