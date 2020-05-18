class Model {
    constructor() {
        this.todos = [];
        this.addTodo();
    }
    addTodo(todoTitle, todoComment) {
        const todo = {
            id: this.todos.length > 0 ? this.todos.length + 1 : 1,
            title: todoTitle,
            deadline: [],
            comment: todoComment,
            isStared: false,
            isCompleted: false
        }
        this.todos.push(todo);
    }
    getTodo() {
        this.todos.forEach((todo, i) => {

        })
    }
    toggleStar() {
        this.isStared = !this.isStared;
    }
    toggleCompleted(todo) {
        this.isCompleted = !this.isCompleted;
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
            this.$addTaskButtons = document.querySelector('.add-todo');
            this.$todoCounter = document.querySelector('.todo-count');
            this.$newTodoName = document.querySelector('.new-todo-name');
            this.$newTodoEditArea = document.querySelector('.new-todo-edit-area');
            this.$newTodoComment = document.querySelector('.add-comment');
            this.$newCardFooter = document.querySelector('.new-card-footer');
            this.$newCancelButton = document.querySelector('.new-button-cancel');
            this.$newConfirmButton = document.querySelector('.new-button-confirm');
            this.init();
        }
        // 初始化綁定事件
    init() {
            this.updateNode();
            this.$addTaskButtons.addEventListener('click', this.bindButtonAddTask);
            this.$stars.forEach(($star, i) => {
                $star.i = i;
                $star.addEventListener('click', this.bindClickStar);
            })
            this.$pens.forEach(($pen, i) => {
                $pen.i = i;
                $pen.addEventListener('click', this.bindClickPen);
            })
            this.$navItems.forEach(($navItem, i) => {
                $navItem.i = i;
                $navItem.addEventListener('click', this.bindClickNavItem);
            })
            this.$cardFooters.forEach(($cardFooter, i) => {
                $cardFooter.i = i;
                $cardFooter.addEventListener('click', this.bindCardFooter);
            })
            this.$newCardFooter.addEventListener('click', this.bindNewCardFooter);
            this.$newConfirmButton.addEventListener('click', this.addTodoItem);
        }
        // 更新動態產生的節點
    updateNode() {
        this.$todoBars = document.querySelectorAll('.todo-bar');
        this.$todoTitles = document.querySelectorAll('.todo-title');
        this.$editCards = document.querySelectorAll('.card');
        this.$navItems = document.querySelectorAll('.nav-item');
        this.$todoNames = document.querySelectorAll('.todo-name');
        this.$cardFooters = document.querySelectorAll('.card-footer');
        this.$cancelButtons = document.querySelectorAll('.button-cancel');
        this.$confirmButtons = document.querySelectorAll('.button-confirm');
        this.$stars = document.querySelectorAll('.star');
        this.$pens = document.querySelectorAll('.pen');
    }
    addTodoItem() {
        let todoTitle = that.$newTodoName.value;
        let todoComment = that.$newTodoComment.value;
        let todo = `
        <div class="edit-area">
                <div class="todo-bar" data-id="">
                    <div class="hover-dots">
                        <span>∙</span>
                        <span>∙</span>
                        <span>∙</span>
                    </div>
                    <label class="todo-title">
                    <input class="checkbox" type="checkbox">
                    <input class="todo-name" type="text" value="${todoTitle}" placeholder="Type Something Here…" disabled>
                </label>
                    <div class="icon-wrapper">
                        <span class="star"><i class="fas fa-star"></i><i class="far fa-star active"></i></span>
                        <span class="pen"><i class="fas fa-pen"></i></span>
                    </div>
                    <div class="hint-icons">
                        <i class="far fa-calendar-alt"></i><span>5/14</span>
                        <i class="far fa-file"></i>
                        <i class="far fa-comment-dots"></i>
                    </div>
                </div>
                <div class="card">
                    <div class="card-body">
                        <div class="deadline">
                            <h3><i class="far fa-calendar-alt"></i>Deadline</h3>
                            <div class="input-wrapper">
                                <input type="date" placeholder="yyyy/mm/dd">
                                <input type="time" placeholder="hh:mm">
                            </div>
                        </div>
                        <div class="file">
                            <h3><i class="far fa-file"></i>File</h3>
                            <label class="upload">
                                <input class="upload-input" type="file">
                                <span class="upload-icon">+</span>
                            </label>
                        </div>
                        <div class="comment">
                            <h3><i class="far fa-comment-dots"></i>Comment</h3>
                            <textarea placeholder="Type your memo here...">${todoComment}</textarea>
                        </div>
                    </div>
                    <div class="card-footer">
                        <button class="button-cancel"><i class="fas fa-times"></i>Cancel</button>
                        <button class="button-confirm"><i class="fas fa-plus"></i>Save</button>
                    </div>
                </div>
            </div>
        `
        that.$todoList.insertAdjacentHTML('beforeend', todo);
        that.$newTodoName.value = '';
        that.$newTodoComment.value = '';
        that.init();
    }
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
        if (!this.classList.contains('new-pen')) {
            toggleActive(this.firstElementChild);
            that.$todoNames[this.i].disabled = !that.$todoNames[this.i].disabled;
        }
        toggleActive(that.$editCards[this.i]);
    }
    bindButtonAddTask() {
        toggleActive(that.$newTodoEditArea);
        that.$todoNames[0].disabled = !that.$todoNames[0].disabled;
    }
    bindNewCardFooter() {
        toggleActive(that.$newTodoEditArea);
    }
    bindCardFooter() {
        toggleActive(that.$pens[this.i].firstElementChild);
        toggleActive(that.$editCards[this.i]);
        that.$todoNames[this.i].disabled = !that.$todoNames[this.i].disabled;
    }
    clearClass() {
        that.$navItems.forEach($navItem => $navItem.classList.remove('active'));
    }
}

// Controller
class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.upDateToto();
    }
    addTodo() {
        // this.view.
    }
    upDateToto() {
        // this.model.addTodo();
        console.log(this.model);
    }
}

const app = new Controller(new Model(), new View());

// helpers
function toggleActive(nodeItem) {
    nodeItem.classList.toggle('active');
}