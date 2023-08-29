import { useContext } from "react";
import { Task, TaskContext } from "../context/task_context";

const TaskCard = ({ id, name, due_date, isCompleted }: Task) => {
  const { completeTask, deleteTask } = useContext(TaskContext);

  return (
    <div className="px-0 py-0 border w-full rounded-lg flex flex-wrap justify-between items-center">
      <p
        className={`px-4 py-4 first-letter:uppercase w-[65%] whitespace-break-spaces break-words ${
          isCompleted ? "line-through" : ""
        }`}
      >
        {name}
      </p>

      {/* task control buttons */}
      <div className="bg-transparent flex gap-[1/2]">
        <button
          className="border bg-transparent cursor-pointer"
          aria-label="Complete task"
          disabled={isCompleted}
          onClick={() => completeTask(id)}
        >
          <i
            className={`fa-solid fa-check ${
              !isCompleted ? "text-green-500" : ""
            }`}
          ></i>
        </button>
        <button
          className="bg-transparent cursor-pointer"
          aria-label="Delete task"
          onClick={() => deleteTask(id)}
        >
          <i className={`fa-solid fa-trash text-red-600`}></i>
        </button>
      </div>

      <div className="text-sm border-t py-2 flex w-full px-4 justify-between items-center">
        {!isCompleted ? (
          <>
            <p>Due Date: </p>
            <p>{due_date}</p>
          </>
        ) : (
          <p>Completed</p>
        )}
      </div>
    </div>
  );
};

export default TaskCard;
