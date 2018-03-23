import React from 'react';
import PropTypes from 'prop-types';

import './style.css';

const TasksColumn = ({
  title: columnTitle,
  tasks,
  columnBackground,
  RenderTask
}) => (
  <div className="tasks-column" style={{ backgroundColor: columnBackground }}>
    <h2 className="title">{columnTitle}</h2>
    {tasks.map(taskProps => {
      const Task = RenderTask(taskProps);
      return <Task key={taskProps.id} />;
    })}
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
  RenderTask: PropTypes.oneOfType([
    PropTypes.func.isRequired,
    PropTypes.node.isRequired,
    PropTypes.element.isRequired
  ]).isRequired
};

export default TasksColumn;
