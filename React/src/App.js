import React, { createContext, useReducer, useEffect } from 'react';
import Header from './containers/header';
import AddNewTodo from './containers/newTodo';
import TodoList from './containers/todoList';
import Footer from './containers/footer';

import reducer from './reducers';

const ContextStore = createContext();

const initialState = {
  todos: JSON.parse(localStorage.getItem('react-todo')) || [],
  status: 'all',
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    setLocalStorage();
  }, [state.todos]);

  const setLocalStorage = () => {
    window.localStorage.setItem('react-todo', JSON.stringify(state.todos));
  };

  return (
    <ContextStore.Provider value={{ state, dispatch }}>
      <div className="App">
        <Header />
        <main>
          <AddNewTodo />
          <TodoList />
        </main>
        <Footer />
      </div>
    </ContextStore.Provider>
  );
};

export { App, ContextStore };
