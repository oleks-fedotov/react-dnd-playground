export const assignIndexToTasks = tasks =>
  tasks.map((task, index) => ({ ...task, index }));

export const getReorderedTasks = (tasks, hoveredTask, draggedTask) => {
  const isTaskDraggedOverEarlierTasks = draggedTask.index > hoveredTask.index;
  const isTaskDraggedOverLaterTasks = draggedTask.index < hoveredTask.index;

  let {
    reorderedTasks: resultTasks,
    isDraggedTaskAdded: isResultComplete
  } = tasks.reduce(
    ({ reorderedTasks, isDraggedTaskAdded }, task) => {
      if (task.id === draggedTask.id) {
        return {
          reorderedTasks,
          isDraggedTaskAdded
        };
      }

      if (isTaskDraggedOverEarlierTasks && task.id === hoveredTask.id) {
        return {
          reorderedTasks: [
            ...reorderedTasks,
            {
              ...draggedTask,
              index: hoveredTask.index,
              status: hoveredTask.status
            },
            { ...hoveredTask, index: draggedTask.index }
          ],
          isDraggedTaskAdded: true
        };
      }

      if (isTaskDraggedOverLaterTasks && task.id === hoveredTask.id) {
        return {
          reorderedTasks: [
            ...reorderedTasks,
            { ...hoveredTask, index: draggedTask.index },
            {
              ...draggedTask,
              index: hoveredTask.index,
              status: hoveredTask.status
            }
          ],
          isDraggedTaskAdded: true
        };
      }

      return {
        isDraggedTaskAdded,
        reorderedTasks: [...reorderedTasks, task]
      };
    },
    {
      reorderedTasks: [],
      isDraggedTaskAdded: false
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
