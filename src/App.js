import React, {Component} from 'react';
import {toClass} from 'recompose';
import _ from 'lodash';

import {columns, tasks} from './config/tasks';

import TasksColumn from './components/TasksColumn';
import Task from './components/Task';
import InitHtml5DragDropContext from './decorators/InitHtml5DragDropContext';

import './App.css';
import DraggableTask from './decorators/DraggableTask';
import DroppableColumn from './decorators/DroppableColumn';
import HoverableTask from './decorators/HoverableTask';
import {assignIndexToTasks, getReorderedTasks, getTasksForColumn, updateTaskIn} from './utils/tasksProcessor';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			tasks: assignIndexToTasks(tasks),
			columns: columns
		};
	}

	onTaskDropped = (task) => {
		this.setState(({tasks}) => ({
				tasks: assignIndexToTasks(updateTaskIn(tasks, task, {isDragging: false}))
			})
		);
	};

	onTaskDragStarted = (task) => {

		setTimeout(() => {
			this.setState(({tasks}) => ({
				tasks: updateTaskIn(tasks, task, {isDragging: true})
			}));
		}, 1);

	};

	onTaskHovered = (hoveredTask) => (draggedTask) => {

		if (hoveredTask.id === draggedTask.id || !draggedTask.isDragging) {
			return;
		}

		this.setState(({tasks}) => ({tasks: getReorderedTasks(tasks, hoveredTask, draggedTask)}));
	};

	onTaskDroppedInColumn = (column) => (task) => {
		const taskUpdatedProps = {
			isDragging: false,
			status: column
		};

		const updatedTasks = assignIndexToTasks(updateTaskIn(this.state.tasks, task, taskUpdatedProps));

		this.setState({
			tasks: updatedTasks
		});
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
									tasks={getTasksForColumn(tasks, value)}
									renderTask={task => {
										const HoverDragTask = DraggableTask(HoverableTask(Task));
										return <HoverDragTask
											key={task.id}
											model={task}
											beginDrag={this.onTaskDragStarted}
											drop={this.onTaskDropped}
											hover={_.throttle(this.onTaskHovered(task), 100)}
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
