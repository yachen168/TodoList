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


// View
let that;
class View {
    constructor(template) {
            that = this;
            this.template = template;
            this.$main = document.querySelector('main');
            this.$todoList = document.querySelector('.todo-list');
            this.$todoCounter = document.querySelector('.todo-count');
            this.$newTodo = document.querySelector('.new-todo');
            this.$navItems = document.querySelectorAll('.nav-item');
            this.$todoBars = document.querySelectorAll('.todo-bar');
            this.$stars = document.querySelectorAll('.star');
            this.$pens = document.querySelectorAll('.pen');
            this.$todoTitles = document.querySelectorAll('.todo-title');
            this.$editCards = document.querySelectorAll('.card');
            this.init();
        }
        // 頁面加載完就先進行初始化綁定事件
    init() {
        this.$stars.forEach(($star, i) => {
            $star.i = i;
            $star.addEventListener('click', this.bindClickStar);
        })
        this.$pens.forEach(($pen, i) => {
            $pen.i = i;
            $pen.addEventListener('click', this.bindClickPen)
        })
        this.$navItems.forEach(($navItem, i) => {
            $navItem.i = i;
            $navItem.addEventListener('click', this.bindClickNavItem)
        })
    }
    addTodoItem() {}
    removeTodoItem() {}
    editTodoItem() {}
    markTodo() {}
    dragTodo() {}
    bindClickNavItem() {
        that.clearClass();
        toggleActive(this);
    }
    bindClickStar() {
        toggleActive(this.firstElementChild);
        toggleActive(this.lastElementChild);
        toggleActive(that.$todoBars[this.i]);
        toggleActive(that.$todoTitles[this.i].lastElementChild);
    }
    bindClickPen() {
        toggleActive(this.firstElementChild);
        toggleActive(that.$editCards[this.i]);
    }
    clearClass() {
        that.$navItems.forEach($navItem => $navItem.classList.remove('active'));
    }
}

// Controller
class Controller {
    constructor(model, view) {
        this.model = model
        this.view = view
    }
}

const app = new Controller(new Model(), new View());


// helpers
function toggleActive(nodeItem) {
    nodeItem.classList.toggle('active');
}