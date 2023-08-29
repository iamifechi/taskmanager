import React, { createContext, PropsWithChildren, useState } from "react";

export interface Task {
  id: number;
  name: string;
  due_date: string;
  isCompleted: boolean;
}

interface TasksState {
  tasks: Task[];
  addTask: (task: Task) => void;
  completeTask: (id: number) => void;
  deleteTask: (id: number) => void;
  deleteAll: () => void;
  toggleModal: (isOpen?: boolean) => void;
  modal: boolean;
}

const TaskContext = createContext<TasksState>({
  tasks: [],
  addTask: () => null,
  completeTask: () => null,
  deleteTask: () => null,
  deleteAll: () => null,
  toggleModal: () => null,
  modal: false,
});

const TaskProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [modal, setModal] = useState(false);

  const addTask = (task: Task) => {
    setTasks([task, ...tasks]);
  };

  const completeTask = (id: number) => {
    const updatedTasks = [
      ...tasks.map((task) => {
        if (task.id === id) {
          task.isCompleted = true;
        }
        return task;
      }),
    ];
    setTasks(updatedTasks);
  };

  const deleteTask = (id: number) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  const deleteAll = () => {
    setTasks([]);
  };

  const toggleModal = (isOpen?: boolean) => {
    setModal(isOpen || !modal);
  };

  const contextValue: TasksState = {
    tasks,
    modal,
    addTask,
    completeTask,
    deleteTask,
    toggleModal,
    deleteAll,
  };

  return (
    <TaskContext.Provider value={contextValue}>{children}</TaskContext.Provider>
  );
};

export { TaskProvider, TaskContext };
