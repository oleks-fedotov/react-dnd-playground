import _ from 'lodash';

export const assignIndexToTasks = tasks =>
  tasks.map((task, index) => ({ ...task, index }));

export const getReorderedTasks = (tasks, hoveredTask, draggedTask) => {
  const isTaskDraggedOverEarlierTasks = draggedTask.index > hoveredTask.index;
  const isTaskDraggedOverLaterTasks = draggedTask.index < hoveredTask.index;

  let {
    reorderedTasks: resultTasks,
    isDraggedTaskAdded: isResultComplete
  } = tasks.reduce(
    ({ reorderedTasks, isDraggedTaskAdded, lastIndex }, task) => {
      if (task.id === draggedTask.id) {
        return {
          reorderedTasks,
          isDraggedTaskAdded,
          lastIndex
        };
      }

      if (isTaskDraggedOverEarlierTasks && task.id === hoveredTask.id) {
        return {
          reorderedTasks: [
            ...reorderedTasks,
            {
              ...draggedTask,
              status: hoveredTask.status,
              index: lastIndex + 1
            },
            { ...hoveredTask, index: lastIndex + 2 }
          ],
          isDraggedTaskAdded: true,
          lastIndex: lastIndex + 2
        };
      }

      if (isTaskDraggedOverLaterTasks && task.id === hoveredTask.id) {
        return {
          reorderedTasks: [
            ...reorderedTasks,
            { ...hoveredTask, index: lastIndex + 1 },
            {
              ...draggedTask,
              status: hoveredTask.status,
              index: lastIndex + 2
            }
          ],
          isDraggedTaskAdded: true,
          lastIndex: lastIndex + 2
        };
      }

      return {
        isDraggedTaskAdded,
        reorderedTasks: [...reorderedTasks, { ...task, index: lastIndex + 1 }],
        lastIndex: lastIndex + 1
      };
    },
    {
      reorderedTasks: [],
      isDraggedTaskAdded: false,
      lastIndex: -1
    }
  );

  if (!isResultComplete) {
    resultTasks = [
      ...resultTasks,
      { ...draggedTask, index: resultTasks.length - 1 }
    ];
  }

  return resultTasks;
};

export const getTasksForColumn = (tasks, column) =>
  tasks.filter(({ status }) => status === column);

export const orderTaskByIndex = tasks => _.sortBy(tasks, 'index');

export const updateTaskIn = (tasks, task, newProps) =>
  tasks.map(
    oldTask =>
      oldTask.id === task.id
        ? {
            ...oldTask,
            ...newProps
          }
        : oldTask
  );
