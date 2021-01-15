const addTodo = (data) => ({ type: 'ADD_TODO', payload: data });
const deleteTodo = (data) => ({ type: 'DELETE_TODO', payload: data });
const editDoneTodo = (data) => ({ type: 'EDIT_TODO', payload: data });
const starTodo = (data) => ({ type: 'STAR_TODO', payload: data });
const completeTodo = (data) => ({ type: 'COMPLETE_TODO', payload: data });
const switchStatus = (data) => ({ type: 'SWITCH_STATUS', payload: data });

export {
  addTodo,
  deleteTodo,
  editDoneTodo,
  starTodo,
  completeTodo,
  switchStatus,
};
