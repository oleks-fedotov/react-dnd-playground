import React from 'react';
import { DropTarget } from 'react-dnd';

const allowedTypes = ['task'];

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget()
  };
}

const dropTargetSpec = {
  drop(props, monitor) {
    const task = monitor.getItem();
    const { onTaskDropped } = props;
    return onTaskDropped(task);
  },
  hover(props, monitor) {
    const task = monitor.getItem();
    const {onTaskHover} = props;
    return onTaskHover && onTaskHover(task);
  }
};

export default componentToWrap =>
  DropTarget(allowedTypes, dropTargetSpec, collect)(({ connectDropTarget }) =>
    connectDropTarget(<div>{componentToWrap}</div>)
  );
