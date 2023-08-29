import { useContext } from "react";
import AddTaskModal from "./components/AddTaskModal";
import Tasks from "./components/Tasks";
import { TaskContext } from "./context/task_context";

function App() {
  const { modal, toggleModal } = useContext(TaskContext);
  const openModal = () => {
    toggleModal(true);
  };

  return (
    <main className="w-screen flex flex-col relative bg-inherit">
      <Tasks />
      {modal && <AddTaskModal />}
      <button
        onClick={openModal}
        className="fixed bottom-5 right-10 bg-green-500 text-white shadow-md text-2xl w-16 h-16 rounded-full flex justify-center items-center"
      >
        +
      </button>
    </main>
  );
}

export default App;
