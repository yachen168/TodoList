export default class Model {
    constructor() {
        this.todos = this.getLocalStorage();
    }
    addNewTodo(newTodo) {
        this.todos.push({
            todoId: Date.now(),
            todoTitle: newTodo.todoTitle,
            todoDate: newTodo.todoDate,
            todoTime: newTodo.todoTime,
            todoComment: newTodo.todoComment,
            isStarred: newTodo.isStarred,
            isCompleted: newTodo.isCompleted
        });
        this.setLocalStorage();
    }
    stateFilter(state = 'all') {
        return this.sortTodos().filter(todo => {
            if (state === 'all') return this.sortTodos();
            if (state === 'inProgress') return !todo.isCompleted;
            if (state === 'completed') return todo.isCompleted;
        })
    }
    setLocalStorage() {
        localStorage.setItem('todos', JSON.stringify(this.todos));
    }
    getLocalStorage() {
        return JSON.parse(localStorage.getItem('todos')) || [];
    }
    sortTodos() {
        return this.todos.sort((a, b) => {
            let scoreA = (a.isStarred ? 100 : 0) + (a.isCompleted ? -200 : 0);
            let scoreB = (b.isStarred ? 100 : 0) + (b.isCompleted ? -200 : 0);
            return scoreA - scoreB;
        })
    }
    editDone(editTodo, todoId) {
        const isSameId = (todo) => todo.todoId === +todoId;
        const index = this.todos.findIndex(isSameId);
        this.todos[index].todoTitle = editTodo.todoTitle;
        this.todos[index].todoComment = editTodo.todoComment;
        this.todos[index].todoDate = editTodo.todoDate;
        this.todos[index].todoTime = editTodo.todoTime;
        this.todos[index].isStarred = editTodo.isStarred;
        this.todos[index].isCompleted = editTodo.isCompleted;
        this.setLocalStorage();
    }
    deleteTodo(todoId) {
        const isSameId = (todo) => todo.todoId === +todoId;
        const index = this.todos.findIndex(isSameId);
        this.todos.splice(index, 1);
        this.setLocalStorage();
    }
    leftCounter() {
        return this.todos.filter(todo => !todo.isCompleted).length;
    }
    completedCounter() {
        return this.todos.filter(todo => todo.isCompleted).length;
    }
    bindStar(todoId) {
        const isSameId = (todo) => todo.todoId === +todoId;
        const index = this.todos.findIndex(isSameId);
        this.todos[index].isStarred = !this.todos[index].isStarred;
        this.setLocalStorage();
    }
    bindCheckbox(todoId) {
        const isSameId = (todo) => todo.todoId === +todoId;
        const index = this.todos.findIndex(isSameId);
        this.todos[index].isCompleted = !this.todos[index].isCompleted;
        this.setLocalStorage();
    }
}