import React from 'react';
import { DragSource } from 'react-dnd';

const MakeDraggable = ComponentToWrap => ({ connectDragSource, isDragging }) =>
  connectDragSource(<div><ComponentToWrap isDragging /></div>);

/**
 * Implements the drag source contract.
 */
const dragSourceContract = {
  beginDrag() {
    console.log('drag start');
    return {
      isDragging: true
    };
  },
  endDrag() {
    console.log('drag end');
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
    MakeDraggable(ComponentToWrap)
  );
