import React from 'react';
import { DragSource } from 'react-dnd';

const MakeDraggable = ComponentToWrap => ({ connectDragSource }) =>
  connectDragSource(
    <div>
      <ComponentToWrap />
    </div>
  );

/**
 * Implements the drag source contract.
 */
const dragSourceContract = {
  beginDrag(props, monitor) {
    console.log(props);

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
    MakeDraggable(ComponentToWrap)
  );
