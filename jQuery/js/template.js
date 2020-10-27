export default class Template {
  todoItem(todos) {
    return todos.reduce(
      (a, todo) =>
        a +
        `<form class="edit-area">
      <div class="todo-bar 
           ${todo.isStarred ? 'active' : ''}" 
           data-id="${todo.todoId}"
           draggable="true">
          <div class="hover-dots">
              <span>∙</span>
              <span>∙</span>
              <span>∙</span>
          </div>
          <label class="todo-title">
              <input class="checkbox" data-id="${
                todo.todoId
              }" type="checkbox" ${todo.isCompleted ? "checked" : ""}>
              <input class="todo-name" type="text" value="${
                todo.todoTitle
              }" placeholder="Type Something Here…" disabled>
          </label>
          <div class="icon-wrapper">
              <span class="star"><i class="far fa-star" data-id="${
                todo.todoId
              }"></i></span>
              <span class="pen"><i data-name="edit" class="fas fa-pen"></i></span>
              <span class="delete"><i class="fas fa-trash-alt" data-id="${
                todo.todoId
              }"></i></span>
          </div>
          <div class="hint-icons">
              <i class="far fa-calendar-alt ${
                todo.todoDate ? 'active' : ''
              }"><span class="hint-date">${todo.todoDate.split('-').join('/')}</span></i>
              <i class="far fa-file"></i>
              <i class="far fa-comment-dots ${
                todo.todoComment ? 'active' : ''
              }"></i>
          </div>
      </div>
      <div class="card">
          <div class="card-body">
              <div class="deadline">
                  <h3><i class="far fa-calendar-alt"></i>Deadline</h3>
                  <div class="input-wrapper">
                      <input class="date" type="date" value="${todo.todoDate}">
                      <input class="time" type="time" value="${todo.todoTime}">
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
                  <textarea class="comment-content" placeholder="Type your memo here...">${
                    todo.todoComment
                  }</textarea>
              </div>
          </div>
          <div class="card-footer">
              <button type="submit" class="button-cancel"><i class="fas fa-times"> Cancel </i></button>
              <button type="submit" class="button-confirm" data-id="${
                todo.todoId
              }"><i class="fas fa-plus"> Save </i></button>
          </div>
      </div>
  </form>`,
      ""
    );
  }
  completedCounter(leftTodo) {
    return leftTodo > 1
      ? `${leftTodo} tasks completed`
      : `${leftTodo} task completed`;
  }
  leftCounter(completedTodo) {
    return completedTodo > 1
      ? `${completedTodo} tasks left`
      : `${completedTodo} task left`;
  }
}
