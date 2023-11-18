import React from 'react';

interface TaskProps {
  task: {
    id: number;
    name: string;
    completed: boolean;
    category: string;
  };
  deleteTask: (id: number) => void;
  toggleComplete: (id: number) => void;
}

const Task: React.FC<TaskProps> = ({ task, deleteTask, toggleComplete }) => {
  return (
    <div className='flex item-center justify-center'>
    <div className='md:w-1/2 w-full'>
    <li className="py-2">
      <div className="flex items-center">
        <input
          type="checkbox"
          className="mr-2"
          checked={task.completed}
          onChange={() => toggleComplete(task.id)}
        />
        <span className={`${task.completed ? 'line-through' : ''}`}>
          {task.name}
        </span>
        <button
          className="ml-auto bg-red-500 text-white py-1 px-2 rounded-md"
          onClick={() => deleteTask(task.id)}
        >
          Delete
        </button>
      </div>
    </li>
    </div>
    </div>
  );
};

export default Task;
