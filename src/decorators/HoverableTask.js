import React from 'react';
import { DropTarget } from 'react-dnd';

const allowedTypes = ['task'];

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget()
  };
}

const dropTargetSpec = {
  hover(props, monitor) {
    props.hover(monitor.getItem());
  },
  drop(props, monitor) {
    props.drop(monitor.getItem());
  }
};

export default ComponentToWrap =>
  DropTarget(allowedTypes, dropTargetSpec, collect)(
    ({ connectDropTarget, hover, model, ...restProps }) =>
      connectDropTarget(
        <div>
          <ComponentToWrap hover={hover} model={model} {...restProps} />
        </div>
      )
  );
