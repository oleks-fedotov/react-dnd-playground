import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import DropContainer from './../DropContainer';
import DragBox from './../DragBox';

class DragNDropArea extends Component {
  render() {
    return (
      <div>
        <DropContainer />
        <DragBox />
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(DragNDropArea);
