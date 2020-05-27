(function() {
    const app = new Vue({
        el: '#app',
        data: {
            todos: [{
                todoTitle: '吃飯',
                todoComment: '肯德基',
                todoDate: '',
                todoTime: '',
                isStared: false,
                isCompleted: false,
                isEditing: false
            }, {
                todoTitle: '睡覺',
                todoComment: '三小時',
                todoDate: '2015-12-12',
                todoTime: '',
                isStared: false,
                isCompleted: false,
                isEditing: false
            }, {
                todoTitle: '看電視',
                todoComment: '一小時',
                todoDate: '',
                todoTime: '',
                isStared: false,
                isCompleted: false,
                isEditing: false
            }],
            newTodo: {
                todoTitle: '',
                todoComment: '',
                todoDate: '',
                todoTime: '',
                isStared: false,
                isCompleted: false,
            },
            navItemState: 'all',
            isEditingNewTodo: false
        },
        methods: {
            addNewTodo() {
                this.todos.push({
                    todoTitle: this.newTodo.todoTitle,
                    todoComment: this.newTodo.todoComment,
                    todoDate: this.newTodo.todoDate,
                    todoTime: this.newTodo.todoTime,
                    isStared: this.newTodo.isStared,
                    isCompleted: this.newTodo.isCompleted
                });
                this.clearNewTodo();
                console.log(this.todos);
            },
            clearNewTodo() {
                this.newTodo.todoTitle = '';
                this.newTodo.todoComment = '';
                this.newTodo.todoDate = '';
                this.newTodo.todoTime = '';
                this.newTodo.isStared = false;
                this.newTodo.isCompleted = false;
            },
            deleteTodo(index) {
                this.todos.splice(index, 1);
            },
            markNewTodo() {
                this.newTodo.isStared = !this.newTodo.isStared;
            },
            markTodo(index) {
                this.todos[index].isStared = !this.todos[index].isStared;
            },
            leftCounter() {
                return this.todos.filter(todo => !todo.isCompleted).length;
            },
            completedCounter() {
                return this.todos.filter(todo => todo.isCompleted).length;
            }
        }
    })
})()