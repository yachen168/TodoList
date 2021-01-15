import React from 'react';
import PropTypes from 'prop-types';

import './index.scss';

const Counter = ({ isShowLeftCount, leftNum, completedNum }) => {
  const LeftCounter = (
    <>
      {leftNum} <span>{leftNum > 1 ? 'tasks' : 'task'}</span> left
    </>
  );
  const CompletedCounter = (
    <>
      {completedNum} <span>{completedNum > 1 ? 'tasks' : 'task'}</span>{' '}
      completed
    </>
  );

  return (
    <>
      <h4 className="todo-count ">
        {isShowLeftCount ? LeftCounter : CompletedCounter}
      </h4>
    </>
  );
};

Counter.propTypes = {
  isShowLeftCount: PropTypes.bool.isRequired,
  leftNum: PropTypes.number.isRequired,
  completedNum: PropTypes.number.isRequired,
};

export default Counter;
