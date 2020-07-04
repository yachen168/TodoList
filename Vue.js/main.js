(function() {
    return new Vue({
        el: '#app',
        data: {
            todos: [],
            cacheTodos: [],
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
                if (!this.newTodo.todoTitle) {
                    alert(`尚未輸入代辦事項名稱`);
                } else {
                    this.todos.push({ id: Date.now(), ...this.newTodo });
                    this.clearNewTodo();
                    this.toggleNewEditCard();
                    this.setLocalStorage();
                }
            },
            clearNewTodo() {
                this.newTodo = Object.assign({}, this.initNewTodo);
            },
            editDone(todo, id) {
                if (!todo.todoTitle) {
                    alert(`尚未輸入代辦事項名稱`);
                } else {
                    const index = this.todos.findIndex(todo => todo.id === id);
                    this.todos[index] = todo;
                    this.toggleEditCard(todo);
                    this.setLocalStorage();
                }
            },
            editCanceled(todo, id) {
                const index = this.todos.findIndex(todo => todo.id === id);
                this.todos.splice(index, 1, JSON.parse(JSON.stringify(this.cacheTodos))[index]);
                this.todos[index].isEditing = false;
            },
            deleteTodo(id) {
                const index = this.todos.findIndex(todo => todo.id === id);
                this.todos.splice(index, 1);
                // this.todos = [...this.todos.slice(0, index), ...todos.slice(index + 2)]
                // originObject = Object.assign({}, originObject)
                this.setLocalStorage();
            },
            setLocalStorage() {
                localStorage.setItem('todos-vue', JSON.stringify(this.sortTodos));
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
            setCacheTodos() {
                this.cacheTodos = JSON.parse(JSON.stringify(this.todos));
            },
            toggleEditCard(todo) {
                todo.isEditing = !todo.isEditing;
                this.setCacheTodos();
            },
            toggleCompleted(todo) {
                todo.isCompleted = !todo.isCompleted;
                this.setLocalStorage();
            }
        },
        computed: {
            initNewTodo() {
                return {
                    todoTitle: '',
                    todoComment: '',
                    todoDate: '',
                    todoTime: '',
                    isStared: false,
                    isCompleted: false,
                    isEditing: false,
                }
            },
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
        },
        created() {
            this.todos = JSON.parse(localStorage.getItem('todos-vue')) || [];
        }
    })
})()