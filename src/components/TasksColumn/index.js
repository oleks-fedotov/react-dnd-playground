import React from 'react';
import PropTypes from 'prop-types';
import { withProps } from 'recompose';

import DraggableTask from './../../decorators/draggableTask';

import './style.css';

const TasksColumn = ({
  title: columnTitle,
  tasks,
  columnBackground,
  TaskComponent
}) => (
  <div className="tasks-column" style={{ backgroundColor: columnBackground }}>
    <h2 className="title">{columnTitle}</h2>
    {tasks.map(taskProps => {
      const Task = DraggableTask(withProps(taskProps)(TaskComponent));
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
  TaskComponent: PropTypes.oneOfType([
    PropTypes.func.isRequired,
    PropTypes.node.isRequired,
    PropTypes.element.isRequired
  ]).isRequired
};

export default TasksColumn;
