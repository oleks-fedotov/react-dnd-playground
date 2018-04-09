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
import {
	assignIndexToTasks, getReorderedTasks, getTasksForColumn, orderTaskByIndex,
	updateTaskIn
} from './utils/tasksProcessor';
import AnimatedMovingTask from './decorators/AnimatedMovingUpDownTask';

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

		if (
			hoveredTask.id === draggedTask.id || !draggedTask.isDragging ||
			(this.state.animatedTask && this.state.animatedTask.id === hoveredTask.id)
		) {
			return;
		}

		this.setState(({tasks}) => {
			const draggedUpdatedTask = _.find(tasks, {id: draggedTask.id});
			const {reorderedTasks, hoveredTaskMoveDirection} = getReorderedTasks(tasks, hoveredTask, draggedUpdatedTask);
			return {
				tasks: reorderedTasks,
				animatedTask: {
					id: hoveredTask.id,
					animationDirection: hoveredTaskMoveDirection
				}
			};
		});
	};

	onTaskDroppedInColumn = (column) => (task) => {
		const taskUpdatedProps = {
			isDragging: false,
			status: column
		};

		const updatedTasks = assignIndexToTasks(updateTaskIn(this.state.tasks, task, taskUpdatedProps));

		this.setState({
			tasks: updatedTasks,
			animatedTask: null
		});
	};

	onTaskHoverColumn = (column) => (task) => {
		this.setState(({tasks}) => {
			const lastTaskState = _.find(tasks, {id: task.id});
			return lastTaskState.status === column
				? null
				: {
					tasks: assignIndexToTasks(updateTaskIn(tasks, lastTaskState, {status: column, index: 0}))
				};
		});
	};

	movingAnimationPlayed = () => {
		this.setState({animatedTask: null});
	};

	render() {

		const {tasks, columns} = this.state;

		console.log(this.state.animatedTask);

		return (
			<div className="boards-container">
				{columns.map(({title, value}) => {
					const DragDropColumn = InitHtml5DragDropContext(
						toClass(
							DroppableColumn(
								<TasksColumn
									title={title}
									tasks={orderTaskByIndex(getTasksForColumn(tasks, value))}
									renderTask={task => {
										const HoverDragTask = DraggableTask(HoverableTask(Task));
										const taskToRender = <HoverDragTask
											key={task.id}
											model={task}
											beginDrag={this.onTaskDragStarted}
											drop={this.onTaskDropped}
											hover={_.throttle(this.onTaskHovered(task), 100)}
										/>;
										return this.state.animatedTask && task.id === this.state.animatedTask.id ?
											<AnimatedMovingTask
												key={task.id}
												isMovingUp={this.state.animatedTask.animationDirection === 'up'}
												isMovingDown={this.state.animatedTask.animationDirection === 'down'}
												animationPlayed={this.movingAnimationPlayed}
											>
												{taskToRender}
											</AnimatedMovingTask>
											: taskToRender;
									}}
								/>
							)
						)
					);

					return <DragDropColumn
						key={value}
						onTaskDropped={this.onTaskDroppedInColumn(value)}
						onTaskHover={this.onTaskHoverColumn(value)}
					/>;
				})}
			</div>
		);
	}
}

export default App;
