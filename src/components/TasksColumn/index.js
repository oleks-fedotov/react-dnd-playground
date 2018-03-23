import React from 'react';
import PropTypes from 'prop-types';
import Task from '../Task';

import './style.css';

const TasksColumn = ({ title: columnTitle, tasks, columnBackground }) => (
  <div className="tasks-column" style={{ backgroundColor: columnBackground }}>
    <h2 className="title">{columnTitle}</h2>
    {tasks.map(({ title, id }) => <Task key={id} title={title} />)}
  </div>
);

TasksColumn.defaultProps = {
  tasks: [],
  columnBackground: 'darkgrey'
};

TasksColumn.propTypes = {
  title: PropTypes.string.isRequired,
  tasks: PropTypes.arrayOf(PropTypes.shape({ title: PropTypes.string })),
  columnBackground: PropTypes.string
};

export default TasksColumn;
