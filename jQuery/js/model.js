export default class Model {
  constructor() {
    this.todos = this.getLocalStorage();
  }
  addNewTodo(newTodo) {
    this.todos.push({
      todoId: Date.now(),
      ...newTodo,
    });
    this.setLocalStorage();
  }
  stateFilter(state = "all") {
    return this.sortTodos().filter((todo) => {
      if (state === "all") return this.sortTodos();
      if (state === "inProgress") return !todo.isCompleted;
      if (state === "completed") return todo.isCompleted;
    });
  }
  setLocalStorage() {
    localStorage.setItem("todos-js", JSON.stringify(this.todos));
  }
  getLocalStorage() {
    return JSON.parse(localStorage.getItem("todos-js")) || [];
  }
  sortTodos() {
    return this.todos.sort((a, b) => {
      let scoreA = (a.isStarred ? 100 : 0) + (a.isCompleted ? -200 : 0);
      let scoreB = (b.isStarred ? 100 : 0) + (b.isCompleted ? -200 : 0);
      return scoreA - scoreB;
    });
  }
  editDone(editTodo, todoId) {
    const isSameId = (todo) => todo.todoId === +todoId;
    const index = this.todos.findIndex(isSameId);
    this.todos[index] = { todoId: this.todos[index].todoId, ...editTodo };
    this.setLocalStorage();
  }
  deleteTodo(todoId) {
    const isSameId = (todo) => todo.todoId === +todoId;
    const index = this.todos.findIndex(isSameId);
    this.todos.splice(index, 1);
    this.setLocalStorage();
  }
  leftCounter() {
    return this.todos.filter((todo) => !todo.isCompleted).length;
  }
  completedCounter() {
    return this.todos.filter((todo) => todo.isCompleted).length;
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
