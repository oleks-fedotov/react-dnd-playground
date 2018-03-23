import React from 'react';
import _ from 'lodash';
import { withProps, toClass } from 'recompose';

import { columns, tasks } from './config/tasks';

import TasksColumn from './components/TasksColumn';
import InitHtml5DragDropContext from './decorators/InitHtml5DragDropContext';

import './App.css';

const App = () => (
  <div className="boards-container">
    {columns.map(({ title, value }) => {
      const DragDropColumn = InitHtml5DragDropContext(
        toClass(
          withProps({
            title,
            tasks: _.filter(tasks, { status: value })
          })(TasksColumn)
        )
      );

      return <DragDropColumn key={value} />;
    })}
  </div>
);

export default App;
