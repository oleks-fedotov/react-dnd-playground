import React from 'react';
import { DropTarget } from 'react-dnd';

const MakeDroppable = ComponentToWrap => ({ connectDropTarget }) =>
  connectDropTarget(<div><ComponentToWrap /></div>);

const allowedTypes = ['task'];

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget()
  };
}

const dropTargetSpec = {
  canDrop: (props, monitor) => {
    console.log('can drop');
    console.log('monitor.getItem()', monitor.getItem());
    return true;
  },
  drop(props, monitor, component) {
    console.log('drop');
    return {
      children: component
    };
  },
  hover(props) {
    console.log('hover');
  }
};

export default ComponentToWrap =>
  DropTarget(allowedTypes, dropTargetSpec, collect)(
    MakeDroppable(ComponentToWrap)
  );
