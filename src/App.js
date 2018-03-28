import React, {Component} from 'react';
import _ from 'lodash';
import {toClass} from 'recompose';

import {columns, tasks} from './config/tasks';

import TasksColumn from './components/TasksColumn';
import Task from './components/Task';
import InitHtml5DragDropContext from './decorators/InitHtml5DragDropContext';

import './App.css';
import DraggableTask from './decorators/DraggableTask';
import DroppableColumn from './decorators/DroppableColumn';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			tasks: tasks,
			columns: columns
		};
	}

	onTaskDroppedInColumn = (column) => (task) => {
		const updatedTasks = this.state.tasks.map(oldTask => {
			return oldTask.id === task.id
				? {
					...oldTask,
					status: column
				}
				: oldTask;
		});

		this.setState({
			tasks: updatedTasks
		})
	};

	render() {

		const {tasks, columns} = this.state;

		return (
			<div className="boards-container">
				{columns.map(({title, value}) => {
					const DragDropColumn = InitHtml5DragDropContext(
						toClass(
							DroppableColumn(
								<TasksColumn
									title={title}
									tasks={_.filter(tasks, {status: value})}
									renderTask={taskProps => {
										const DragTask = DraggableTask(Task);
										return <DragTask
											key={taskProps.id}
											{...taskProps}
										/>;
									}}
								/>
							)
						)
					);

					return <DragDropColumn
						key={value}
						onTaskDropped={this.onTaskDroppedInColumn(value)}
					/>;
				})}
			</div>
		);
	}
}

export default App;
