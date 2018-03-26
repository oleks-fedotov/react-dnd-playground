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
    const {dropHandler} = monitor.getItem();

    dropHandler();
    return {
      result: true
    };
  },
  hover(props) {
    console.log('hover');
  }
};

export default componentToWrap =>
  DropTarget(allowedTypes, dropTargetSpec, collect)(({ connectDropTarget }) =>
    connectDropTarget(<div>{componentToWrap}</div>)
  );
