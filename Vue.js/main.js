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
            isEditing: false,
        },
        state: 'all',
        isEditingNewTodo: false
    },
    methods: {
        addNewTodo() {
            this.todos.push({
                id: Date.now(),
                todoTitle: this.newTodo.todoTitle,
                todoComment: this.newTodo.todoComment,
                todoDate: this.newTodo.todoDate,
                todoTime: this.newTodo.todoTime,
                isStared: this.newTodo.isStared,
                isCompleted: this.newTodo.isCompleted,
                isEditing: false,
            });
            this.clearNewTodo();
            this.setLocalStorage();
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
            this.toggleEditCard(todo);
            this.setLocalStorage();
        },
        deleteTodo(index) {
            this.todos.splice(index, 1);
            this.setLocalStorage();
        },
        setLocalStorage() {
            localStorage.setItem('todos', JSON.stringify(this.sortTodos));
        },
        markNewTodo() {
            this.newTodo.isStared = !this.newTodo.isStared;
        },
        markTodo(todo) {
            todo.isStared = !todo.isStared;
            this.setLocalStorage();
        },
        toggleNewEditCard() {
            this.isEditingNewTodo = !this.isEditingNewTodo;
        },
        toggleEditCard(todo) {
            todo.isEditing = !todo.isEditing;
        },
        toggleCompleted(todo) {
            todo.isCompleted = !todo.isCompleted;
            this.setLocalStorage();
        }
    },
    computed: {
        sortTodos() {
            return this.todos.sort((a, b) => {
                let scoreA = (a.isStared ? 100 : 0) + (a.isCompleted ? -200 : 0);
                let scoreB = (b.isStared ? 100 : 0) + (b.isCompleted ? -200 : 0);
                return scoreA - scoreB;
            })
        },
        todoFilter() {
            return this.sortTodos.filter(todo => {
                if (this.state === 'all') return this.sortTodos;
                if (this.state === 'inProgress') return !todo.isCompleted;
                if (this.state === 'completed') return todo.isCompleted;
            })
        },
        leftCounter() {
            return this.todos.filter(todo => !todo.isCompleted).length;
        },
        completedCounter() {
            return this.todos.filter(todo => todo.isCompleted).length;
        }
    }
})