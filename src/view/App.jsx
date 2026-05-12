import { useMemo, useState } from "react";
import TaskStore from "../model/TaskStore";
import TaskController from "../controller/TaskController";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [tasks, setTasks] = useState([]);

  const store = useMemo(() => TaskStore.getInstance(), []);
  const controller = useMemo(
    () => new TaskController(store, setTasks),
    [store],
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    controller.handleAddTask(inputValue);
    setInputValue("");
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">
      <div className="w-full max-w-xl rounded-2xl bg-white shadow-lg p-6">
        <h1 className="text-3xl font-bold text-slate-800 mb-6">To-Do List</h1>

        <form onSubmit={handleSubmit} className="flex gap-3 mb-6">
          <input
            type="text"
            placeholder="Napíš novú úlohu..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="flex-1 rounded-xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-slate-400"
          />
          <button
            type="submit"
            className="rounded-xl bg-slate-800 px-5 py-3 text-white hover:bg-slate-700 transition"
          >
            Pridať
          </button>
        </form>

        <ul className="space-y-3">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3"
            >
              <span
                className={
                  task.isCompleted
                    ? "text-slate-400 line-through"
                    : "text-slate-800"
                }
              >
                {task.name}
              </span>

              <div className="flex gap-2">
                <button
                  onClick={() => controller.handleToggleTask(task.id)}
                  className="rounded-lg bg-green-500 px-3 py-2 text-sm text-white hover:bg-green-600 transition"
                >
                  Hotovo
                </button>
                <button
                  onClick={() => controller.handleDeleteTask(task.id)}
                  className="rounded-lg bg-red-500 px-3 py-2 text-sm text-white hover:bg-red-600 transition"
                >
                  Zmazať
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
