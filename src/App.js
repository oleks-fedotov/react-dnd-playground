import React from 'react';
import _ from 'lodash';
import { withProps, toClass } from 'recompose';

import { columns, tasks } from './config/tasks';

import TasksColumn from './components/TasksColumn';
import Task from './components/Task';
import InitHtml5DragDropContext from './decorators/InitHtml5DragDropContext';

import './App.css';
import DraggableTask from './decorators/DraggableTask';
import DroppableColumn from './decorators/DroppableColumn';

const App = () => (
  <div className="boards-container">
    {columns.map(({ title, value }) => {
      const DragDropColumn = InitHtml5DragDropContext(
        toClass(
          DroppableColumn(
            withProps({
              title,
              tasks: _.filter(tasks, { status: value }),
              RenderTask: taskProps => DraggableTask(withProps(taskProps)(Task))
            })(TasksColumn)
          )
        )
      );

      return <DragDropColumn key={value} />;
    })}
  </div>
);

export default App;
