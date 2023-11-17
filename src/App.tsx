import React, { useState, useEffect } from 'react';
import Task from './Task';

interface TaskItem {
  id: number;
  name: string;
  completed: boolean;
  category: string;
}

const App: React.FC = () => {
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [taskName, setTaskName] = useState<string>('');
  const [taskCategory, setTaskCategory] = useState<string>('All');
  const [selectedTab, setSelectedTab] = useState<string>('All');

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (taskName.trim() !== '') {
      const newTask: TaskItem = {
        id: Date.now(),
        name: taskName,
        completed: false,
        category: taskCategory,
      };
      setTasks([...tasks, newTask]);
      setTaskName('');
    }
  };

  const deleteTask = (id: number) => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
  };

  const toggleComplete = (id: number) => {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const categories = ['All', 'Personal', 'Work', 'Shopping', 'Others']; 

  return (
    <div className="container mx-auto mt-8 px-4 ">
      <h1 className="text-3xl font-bold mb-4">To-Do List</h1>
      <div className="mb-4 flex flex-col sm:flex-row justify-center items-center">
        <div className="mb-4 sm:mb-0">
          <input
            type="text"
            className="border rounded-md py-2 px-4 mb-2 sm:mr-2 sm:mb-0 w-full sm:w-auto"
            placeholder="Add Task..."
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
          />
          <select
            className="border rounded-md py-2 px-4 sm:mr-2 w-full sm:w-auto"
            value={taskCategory}
            onChange={(e) => setTaskCategory(e.target.value)}
          >
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-md"
          onClick={addTask}
        >
          Add
        </button>
      </div>
      <div className="flex flex-wrap mt-4">
        {categories.map((category, index) => (
          <button
            key={index}
            className={`px-4 py-2 rounded-md mr-4 mb-2 ${
              selectedTab === category ? 'bg-blue-500 text-white' : 'bg-gray-300'
            }`}
            onClick={() => setSelectedTab(category)}
          >
            {category}
          </button>
        ))}
      </div>
      <ul className="divide-y divide-gray-300">
        {tasks
          .filter(task =>
            selectedTab === 'All' ? true : task.category === selectedTab
          )
          .map((task) => (
            <Task
              key={task.id}
              task={task}
              deleteTask={deleteTask}
              toggleComplete={toggleComplete}
            />
          ))}
      </ul>
    </div>
  );
};

export default App;
