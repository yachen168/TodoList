import React from 'react';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faFile } from '@fortawesome/free-solid-svg-icons';

import './index.scss';

const TodoDropdown = ({ children, todo, editTodo }) => {
  return (
    <div className="card">
      <div className="card-body">
        <div className="deadline">
          <h3>
            <FontAwesomeIcon icon={faCalendarAlt} />
            Deadline
          </h3>
          <div className="input-wrapper">
            <input
              className="date"
              type="date"
              value={todo.todoDate}
              onChange={editTodo('todoDate')}
            />
            <input
              className="time"
              type="time"
              value={todo.todoTime}
              onChange={editTodo('todoTime')}
            />
          </div>
        </div>
        <div className="file">
          <h3>
            <FontAwesomeIcon icon={faFile} />
            File
          </h3>
          <label className="upload">
            <input className="upload-input" type="file" />
            <span className="upload-icon">+</span>
          </label>
        </div>
        <div className="comment">
          <h3>
            <i className="far fa-comment-dots"></i>Comment
          </h3>
          <textarea
            className="comment-content"
            placeholder="Type your memo here..."
            value={todo.todoComment}
            onChange={editTodo('todoComment')}
          ></textarea>
        </div>
      </div>
      <div className="card-footer">{children}</div>
    </div>
  );
};

TodoDropdown.propTypes = {
  todo: PropTypes.object.isRequired,
  editTodo: PropTypes.func.isRequired,
};

export default TodoDropdown;
