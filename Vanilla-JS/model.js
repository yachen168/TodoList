export default class Model {
    constructor() {
        this.todos = this.getLocalStorage();
        this.state = 'all';
    }
    addNewTodo(newTodo) {
        this.todos.push({
            todoTitle: newTodo.todoTitle,
            todoDate: newTodo.todoDate,
            todoTime: newTodo.todoTime,
            todoComment: newTodo.todoComment,
            isStarred: newTodo.isStarred,
            isCompleted: newTodo.isCompleted
        });
        this.setLocalStorage();
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
    stateFilter(state = 'all') {
        return this.sortTodos().filter(todo => {
            if (state === 'all') return this.sortTodos();
            if (state === 'inProgress') return !todo.isCompleted;
            if (state === 'completed') return todo.isCompleted;
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
        return this.todos.filter(todo => !todo.isCompleted).length;
    }
    completedCounter() {
        return this.todos.filter(todo => todo.isCompleted).length;
    }
    bindStar(index) {
        this.todos[index].isStarred = !this.todos[index].isStarred;
        this.setLocalStorage();
    }
    bindCheckbox(index) {
        this.todos[index].isCompleted = !this.todos[index].isCompleted;
        this.setLocalStorage();
    }
}