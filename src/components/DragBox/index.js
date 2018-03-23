import React from 'react';
import { DragSource } from 'react-dnd';
import './style.css';

const DragBox = ({ isDragging, connectDragSource }) =>
  connectDragSource(
    <div className="drag-me-box" style={{ opacity: isDragging ? 0.6 : 1 }}>
      drag me
    </div>
  );

/**
 * Implements the drag source contract.
 */
const dragSourceContract = {
  beginDrag() {
    console.log(1);
    return {
      isDragging: true
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

DragBox.propTypes = {};

export default DragSource('drag-box', dragSourceContract, collect)(DragBox);
