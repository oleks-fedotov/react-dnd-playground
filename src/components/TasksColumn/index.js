import React from 'react';
import PropTypes from 'prop-types';

import './style.css';

const TasksColumn = ({
  title: columnTitle,
  tasks,
  columnBackground,
  renderTask
}) => (
  <div className="tasks-column" style={{ backgroundColor: columnBackground }}>
    <h2 className="title">{columnTitle}</h2>
    {tasks.map(renderTask)}
  </div>
);

TasksColumn.defaultProps = {
  tasks: [],
  columnBackground: 'darkgrey'
};

TasksColumn.propTypes = {
  title: PropTypes.string.isRequired,
  tasks: PropTypes.arrayOf(PropTypes.shape({ title: PropTypes.string })),
  columnBackground: PropTypes.string,
  renderTask: PropTypes.oneOfType([
    PropTypes.func.isRequired,
    PropTypes.node.isRequired,
    PropTypes.element.isRequired
  ]).isRequired
};

export default TasksColumn;
