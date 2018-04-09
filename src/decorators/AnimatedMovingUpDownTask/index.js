import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './styles.css';

class AnimatedMovingTask extends Component {
  componentDidMount() {
    setTimeout(() => {
      this.props.animationPlayed();
    }, 150);
  }

  shouldComponentUpdate(newProps) {
    return (
      newProps.isMovingDown !== this.props.isMovingDown &&
      newProps.isMovingUp !== this.props.isMovingUp
    );
  }

  render() {
    const { isMovingUp, isMovingDown, children } = this.props;

    return (
      <div
        className={`${'animated'}
    ${isMovingDown ? 'moving-down' : ''}
    ${isMovingUp ? 'moving-up' : ''}
    `}
      >
        {children}
      </div>
    );
  }
}

AnimatedMovingTask.propTypes = {
  isMovingUp: PropTypes.bool,
  isMovingDown: PropTypes.bool,
  animationPlayed: PropTypes.func.isRequired
};

AnimatedMovingTask.defaultProps = {
  isMovingUp: false,
  isMovingDown: false
};

export default AnimatedMovingTask;
