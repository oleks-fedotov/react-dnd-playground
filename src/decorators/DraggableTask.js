import React from 'react';
import { DragSource } from 'react-dnd';

/**
 * Implements the drag source contract.
 */
const dragSourceContract = {
  beginDrag(props) {
    if (props.beginDrag) {
      props.beginDrag(props.model);
    }

    return {
      ...props.model,
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

export default ComponentToWrap =>
  DragSource('task', dragSourceContract, collect)(
    ({ connectDragSource, model, ...restProps }) =>
      connectDragSource(
        <div>
          <ComponentToWrap model={model} {...restProps} />
        </div>
      )
  );
