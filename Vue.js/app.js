(function() {
    const app = new Vue({
        el: '#app',
        data: {
            todos: JSON.parse(localStorage.getItem('todos')) || [],
            newTodo: {
                todoTitle: '',
                todoComment: '',
                todoDate: '',
                todoTime: '',
                isStared: false,
                isCompleted: false,
                isEditing: false
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
                    isCompleted: this.newTodo.isCompleted,
                    isEditing: false
                });
                this.clearNewTodo();
                this.setLocalStorage();
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
            editDone(todo, index) {
                this.todos[index] = todo;
                this.toggleEditCard(index);
                this.setLocalStorage();
            },
            deleteTodo(index) {
                this.todos.splice(index, 1);
                this.setLocalStorage();
            },
            setLocalStorage() {
                localStorage.setItem('todos', JSON.stringify(this.todos));
            },
            // getLocalStorage() {
            //     return JSON.parse(localStorage.getItem('todos')) || [];
            // },
            markNewTodo() {
                this.newTodo.isStared = !this.newTodo.isStared;
            },
            markTodo(index) {
                this.todos[index].isStared = !this.todos[index].isStared;
                this.setLocalStorage();
            },
            leftCounter() {
                return this.todos.filter(todo => !todo.isCompleted).length;
            },
            completedCounter() {
                return this.todos.filter(todo => todo.isCompleted).length;
            },
            toggleCompleted(index) {
                this.todos[index].isCompleted = !this.todos[index].isCompleted;
            },
            toggleNewEditCard() {
                this.isEditingNewTodo = !this.isEditingNewTodo;
            },
            toggleEditCard(index) {
                this.todos[index].isEditing = !this.todos[index].isEditing;
                console.log(this.todos);
            },
        }
    })
})()