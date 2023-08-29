import { useContext, useMemo, useState } from "react";
import { TaskContext } from "../context/task_context";
import EmptyTaskScreen from "./EmptyTaskScreen";
import TaskCard from "./TaskCard";

const Tasks = () => {
  const { tasks, deleteAll} = useContext(TaskContext);
  const [sort, setSort] = useState(false);

  const pendingTasks = useMemo(() => {
    return tasks.filter((task) => !task.isCompleted);
  }, [tasks]);

  const completedTasks = useMemo(() => {
    return tasks.filter((task) => task.isCompleted);
  }, [tasks]);

  const handleSort = () => setSort(!sort);

  return (
    <>
      <section className="mx-auto min-h-[90vh] min-w-[MIN(92%,480px)] p-6 px-4 flex flex-col gap-4 items-center">
        {tasks.length <= 0 ? (
          <EmptyTaskScreen />
        ) : (
          <>
            <h2 className="text-xl p-2 border-b w-full text-center ">Tasks</h2>
            <div className="flex gap-1 items-center self-start">
              <button
                onClick={deleteAll}
                className="bg-transparent text-sm uppercase p-1 min-w-fit"
              >
                Delete all
              </button>
              <button
                onClick={handleSort}
                className="bg-transparent text-sm uppercase p-1 min-w-fit"
              >
                {sort ? "show all" : "sort"}
              </button>
            </div>

            {!sort &&
              tasks.map((task, index) => <TaskCard key={index} {...task} />)}
            {sort && pendingTasks.length > 0 && (
              <>
                <h3 className="self-start mt-4">Pending tasks</h3>
                {pendingTasks.map((task, index) => (
                  <TaskCard key={index} {...task} />
                ))}
              </>
            )}
            {sort && completedTasks.length > 0 && (
              <>
                <h3 className="self-start mt-4">Completed tasks</h3>
                {completedTasks.map((task, index) => (
                  <TaskCard key={index} {...task} />
                ))}
              </>
            )}
          </>
        )}
      </section>
    </>
  );
};

export default Tasks;
