import _ from 'lodash';
import { getReorderedTasks } from './tasksProcessor';

describe('getReorderedTasks', () => {
  test('drag top task down', () => {
    const tasks = [
      {
        title: 'task 1',
        status: 'todo',
        id: 1,
        index: 0
      },
      {
        title: 'task 2',
        status: 'todo',
        id: 2,
        index: 1
      },
      {
        title: 'task 3',
        status: 'todo',
        id: 3,
        index: 2
      }
    ];

    const reorderedTasks = getReorderedTasks(tasks, tasks[1], tasks[0]);

    const expectedReorderedTasks = [
      { ...tasks[1], index: 0 },
      { ...tasks[0], index: 1 },
      tasks[2]
    ];

    expect(reorderedTasks).toEqual(expectedReorderedTasks);
  });

  test('drag middle task up', () => {
    const tasks = [
      {
        title: 'task 1',
        status: 'todo',
        id: 1,
        index: 0
      },
      {
        title: 'task 2',
        status: 'todo',
        id: 2,
        index: 1
      },
      {
        title: 'task 3',
        status: 'todo',
        id: 3,
        index: 2
      }
    ];

    const reorderedTasks = getReorderedTasks(tasks, tasks[0], tasks[1]);

    const expectedReorderedTasks = [
      { ...tasks[1], index: 0 },
      { ...tasks[0], index: 1 },
      tasks[2]
    ];

    expect(reorderedTasks).toEqual(expectedReorderedTasks);
  });

  test('drag middle task down', () => {
    const tasks = [
      {
        title: 'task 1',
        status: 'todo',
        id: 1,
        index: 0
      },
      {
        title: 'task 2',
        status: 'todo',
        id: 2,
        index: 1
      },
      {
        title: 'task 3',
        status: 'todo',
        id: 3,
        index: 2
      }
    ];

    const reorderedTasks = getReorderedTasks(tasks, tasks[2], tasks[1]);

    const expectedReorderedTasks = [
      tasks[0],
      { ...tasks[2], index: 1 },
      { ...tasks[1], index: 2 }
    ];

    expect(reorderedTasks).toEqual(expectedReorderedTasks);
  });

  test('drag bottom task up', () => {
    const tasks = [
      {
        title: 'task 1',
        status: 'todo',
        id: 1,
        index: 0
      },
      {
        title: 'task 2',
        status: 'todo',
        id: 2,
        index: 1
      },
      {
        title: 'task 3',
        status: 'todo',
        id: 3,
        index: 2
      }
    ];

    const reorderedTasks = getReorderedTasks(tasks, tasks[1], tasks[2]);

    const expectedReorderedTasks = [
      tasks[0],
      { ...tasks[2], index: 1 },
      { ...tasks[1], index: 2 }
    ];

    expect(reorderedTasks).toEqual(expectedReorderedTasks);
  });

  test('drag task down 2 times', () => {
    const tasks = [
      {
        title: 'task 1',
        status: 'todo',
        id: 1,
        index: 0
      },
      {
        title: 'task 2',
        status: 'todo',
        id: 2,
        index: 1
      },
      {
        title: 'task 3',
        status: 'todo',
        id: 3,
        index: 2
      }
    ];

    const reorderedTasks1 = getReorderedTasks(tasks, tasks[1], tasks[0]);
    const reorderedTasks2 = getReorderedTasks(
      reorderedTasks1,
      _.find(reorderedTasks1, { id: 3 }),
      _.find(reorderedTasks1, { id: 1 })
    );

    const expectedReorderedTasks = [
      { ...tasks[1], index: 0 },
      { ...tasks[2], index: 1 },
      { ...tasks[0], index: 2 }
    ];

    expect(reorderedTasks2).toEqual(expectedReorderedTasks);
  });

  test('drag bottom task up 2 times', () => {
    const tasks = [
      {
        title: 'task 1',
        status: 'todo',
        id: 1,
        index: 0
      },
      {
        title: 'task 2',
        status: 'todo',
        id: 2,
        index: 1
      },
      {
        title: 'task 3',
        status: 'todo',
        id: 3,
        index: 2
      }
    ];

    const reorderedTasks1 = getReorderedTasks(tasks, tasks[1], tasks[2]);
    const reorderedTasks2 = getReorderedTasks(
      reorderedTasks1,
      _.find(reorderedTasks1, { id: 1 }),
      _.find(reorderedTasks1, { id: 3 })
    );

    const expectedReorderedTasks = [
      { ...tasks[2], index: 0 },
      { ...tasks[0], index: 1 },
      { ...tasks[1], index: 2 }
    ];

    expect(reorderedTasks2).toEqual(expectedReorderedTasks);
  });

  test('drag middle task down, then up', () => {
    const tasks = [
      {
        title: 'task 1',
        status: 'todo',
        id: 1,
        index: 0
      },
      {
        title: 'task 2',
        status: 'todo',
        id: 2,
        index: 1
      },
      {
        title: 'task 3',
        status: 'todo',
        id: 3,
        index: 2
      }
    ];

    const reorderedTasks1 = getReorderedTasks(tasks, tasks[2], tasks[1]);
    const reorderedTasks2 = getReorderedTasks(
      reorderedTasks1,
      _.find(reorderedTasks1, { id: 3 }),
      _.find(reorderedTasks1, { id: 2 })
    );

    expect(reorderedTasks2).toEqual(tasks);
  });
});
