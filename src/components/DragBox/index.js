import React from 'react';
import { DragSource } from 'react-dnd';
import { withProps } from 'recompose';
import './style.css';

const DragBox = ({ text, isDragging, connectDragSource }) =>
  connectDragSource(
    <div className="drag-me-box" style={{ opacity: isDragging ? 0.6 : 1 }}>
      {text}
    </div>
  );

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

DragBox.propTypes = {};

const DragBoxWithText = withProps({ text: 'Drag Me' })(DragBox);

export default DragSource('drag-box', dragSourceContract, collect)(
  DragBoxWithText
);
