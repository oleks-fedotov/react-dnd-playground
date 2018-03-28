import React from 'react';
import { DragSource } from 'react-dnd';

/**
 * Implements the drag source contract.
 */
const dragSourceContract = {
  beginDrag(props) {
    return {
      isDragging: true,
      ...props
    };
  },
  endDrag() {
    console.log('drag end');
    return {
      task: 1
    };
  }
};

/**
 * Specifies the props to inject into your component.
 */
function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

export default ComponentToWrap =>
  DragSource('task', dragSourceContract, collect)(
    ({ connectDragSource, ...props }) =>
      connectDragSource(
        <div>
          <ComponentToWrap {...props} />
        </div>
      )
  );
