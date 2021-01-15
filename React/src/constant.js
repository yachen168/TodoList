const navItems = () => {
  return [
    { title: 'My Tasks', status: 'all' },
    { title: 'In progress', status: 'inProgress' },
    { title: 'Completed', status: 'completed' },
  ];
};

const defaultNewTodo = () => {
  return {
    todoTitle: '',
    todoComment: '',
    todoDate: '',
    todoTime: '',
    isStarred: false,
    isCompleted: false,
    isEditing: false,
  };
};

export { navItems, defaultNewTodo };
