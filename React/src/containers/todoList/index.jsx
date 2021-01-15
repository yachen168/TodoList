import React, { useContext } from 'react';
import { ContextStore } from '../../App';

import TodoItem from '../todoItem';
import './index.scss';

const TodoList = () => {
  const { state } = useContext(ContextStore);

  const { todos, status } = state;

  const sortTodos = (todos) => {
    return [...todos].sort((a, b) => {
      let scoreA = (a.isStarred ? 100 : 0) + (a.isCompleted ? -200 : 0);
      let scoreB = (b.isStarred ? 100 : 0) + (b.isCompleted ? -200 : 0);
      return scoreA - scoreB;
    });
  };

  const todosFilter = (todos, status) => {
    return todos.filter((todo) => {
      if (status === 'all') return true;
      if (status === 'inProgress') return !todo.isCompleted;
      if (status === 'completed') return todo.isCompleted;
    });
  };

  const displayedTodos = todosFilter(sortTodos(todos), status);

  return (
    <section className="todo-list">
      {displayedTodos.map((todo) => {
        return <TodoItem key={todo.todoId} todo={todo} />;
      })}
    </section>
  );
};

export default TodoList;
