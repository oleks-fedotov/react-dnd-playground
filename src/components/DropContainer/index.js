import React from 'react';
import { DropTarget } from 'react-dnd';

import './styles.css';

const DropContainer = ({ children, connectDropTarget }) =>
  connectDropTarget(<div className="drop-container">{children}</div>);

const allowedTypes = ['drag-box'];
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
    debugger;
    console.log('drop');
    return {
      children: component
    }
  },
  hover(props) {
    console.log('hover');
  }
};

export default DropTarget(allowedTypes, dropTargetSpec, collect)(DropContainer);
