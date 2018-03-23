import React from 'react';
import { DropTarget } from 'react-dnd';

import './styles.css';

const DropContainer = () => <div className="drop-container" />;

const allowedTypes = ['drag-box'];
const collect = (connect, monitor) => ({});

export default DropTarget(allowedTypes, {}, collect)(DropContainer);
