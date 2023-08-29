import { useContext, useState } from "react";
import CustomInput from "./CustomInput";
import { Task, TaskContext } from "../context/task_context";

const AddTaskModal = () => {
  const today = new Date().toISOString().split("T")[0];
  const { addTask } = useContext(TaskContext);
  const [taskName, setTaskName] = useState("");
  const [dueDate, setDueDate] = useState(today);
  const [taskNameError, setTaskNameError] = useState("");
  const [dueDateError, setDueDateError] = useState("");
  const { toggleModal } = useContext(TaskContext);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!taskName) {
      setTaskNameError("Please add a task name!");
    }
    if (!dueDate) {
      setDueDateError("Please set a due date for your task!");
    }

    if (taskName && dueDate) {
      const task: Task = {
        id: Date.now(),
        name: taskName,
        due_date: new Date().toLocaleDateString(),
        isCompleted: false,
      };

      addTask(task);
      toggleModal();
    }
  };

  const handleTaskName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskNameError("");
    setTaskName(e?.target?.value);
  };

  const handleDueDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDueDateError("");
    setDueDate(e?.target?.value);
  };

  const closeModal = () => {
    toggleModal(false);
  };

  return (
    <>
      <div
        className="z-8 fixed min-h-screen w-screen"
        onClick={closeModal}
      ></div>
      <form
        onSubmit={handleSubmit}
        className="fixed z-10 bg-white dark:bg-[#242424] dark:text-white shadow-full p-4 py-6 min-w-[MIN(320px,80%)] min-h-[MAX(400px,50vh)] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-2xl border-white flex flex-col items-center justify-between"
      >
        <header className="text-center w-full relative flex justify-center">
          <h2 className="font-[500] mx-auto">New Task</h2>
          <button
            className="px-2 border rounded-full py-0"
            onClick={closeModal}
          >
            X
          </button>
        </header>

        <div className="h-full w-full">
          <CustomInput
            label={"Task Name"}
            type="text"
            onChange={handleTaskName}
            value={taskName}
            error={taskNameError}
          />
          <CustomInput
            label={"Due Date"}
            type="date"
            onChange={handleDueDate}
            min={today}
            value={dueDate}
            error={dueDateError}
          />
        </div>
        <button
          type="submit"
          className={`border ${
            taskName && dueDate ? "border-green-500" : "border-slate-400"
          }  border-1 rounded-lg`}
        >
          Add Task
        </button>
      </form>
    </>
  );
};

export default AddTaskModal;
