import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

const Task = ({ title }) => <div className="task-container">{title}</div>;

Task.propTypes = {
  title: PropTypes.string.isRequired
};

export default Task;
