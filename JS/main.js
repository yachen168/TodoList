class Model {
    constructor() {
        this.todos = [{
            id: 1,
            title: '吃飯',
            deadline: [],
            comment: '哈哈哈',
            important: false,
            completed: false
        }]
    }
    addTodo(todoTitle, todoComment) {
        const todo = {
            id: this.todos.length > 0 ? this.todos.length + 1 : 1,
            title: todoTitle,
            deadline: [],
            comment: todoComment,
            important: false,
            completed: false
        }
        this.todos.push(todo);
    }
    editTodo() {}
    removeTodo() {}
    toggleTodo() {}
}
//  view
class View {
    constructor(template) {
            this.template = template;
            this.$main = document.querySelector('main');
            this.$todoList = document.querySelector('.todo-list');
            this.$todoCounter = document.querySelector('.todo-count');
            this.$newTodo = document.querySelector('.new-todo');
        }
        // 頁面加載完就先進行初始化綁定事件
    getElement() {}
        // 新增 todo
    addTodoItem() {}
        // 移除 todo
    removeTodoItem() {}
        // 編輯
    editTodoItem() {}
        // 重新獲取動態添加的元素
    updateNode() {}
        // CSS class 切換
    toggleClass() {}
        // 清除 CSS class
    clearClass() {}

}

// controller
class Controller {
    constructor(model, view) {
        this.model = model
        this.view = view
    }
}

const app = new Controller(new Model(), new View())