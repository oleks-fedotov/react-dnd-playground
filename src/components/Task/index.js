import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.css';

class Task extends Component {
  shouldComponentUpdate(nextProps) {
    return (
      nextProps.model.title !== this.props.model.title ||
      nextProps.model.isDragging !== this.props.model.isDragging ||
      nextProps.model.index !== this.props.model.index
    );
  }

  render() {
    const { model } = this.props;

    return (
      <div
        className={`task-container ${model.isDragging ? 'placeholder' : ''}`}
      >
        {model.title}
      </div>
    );
  }
}

Task.propTypes = {
  model: PropTypes.shape({
    title: PropTypes.string.isRequired,
    isDragging: PropTypes.bool,
    index: PropTypes.number
  }).isRequired
};

export default Task;
