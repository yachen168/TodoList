import React, { useContext } from 'react';
import { ContextStore } from '../../App';

import Counter from '../../components/counter';
import Hint from '../../components/hint';
import './index.scss';

const Footer = () => {
  const { state } = useContext(ContextStore);

  const leftNum = state.todos.filter((todo) => !todo.isCompleted).length;
  const completedNum = state.todos.length - leftNum;
  const isShowLeftCount = state.status !== 'completed';

  return (
    <footer>
      <Counter
        isShowLeftCount={isShowLeftCount}
        leftNum={leftNum}
        completedNum={completedNum}
      />
      <Hint />
    </footer>
  );
};

export default Footer;
