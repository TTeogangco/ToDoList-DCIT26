import { useState } from "react"

function App() {
  const [task, setTask] = useState("")
  const [tasks, setTasks] = useState([])

  // Add a new task
  const addTask = () => {
    if (task.trim() === "") return

    const newTask = {
      id: Date.now(),
      text: task,
      completed: false,
    }

    setTasks([...tasks, newTask])
    setTask("")
  }

  // Mark task as Done / Not Done
  const toggleTask = (id) => {
    setTasks(
      tasks.map((item) =>
        item.id === id
          ? { ...item, completed: !item.completed }
          : item
      )
    )
  }

  // Delete a task
  const deleteTask = (id) => {
    setTasks(tasks.filter((item) => item.id !== id))
  }

  // Clear all tasks
  const clearTasks = () => {
    setTasks([])
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="mx-auto max-w-3xl">

        {/* Header */}
        <div className="mb-6 rounded-xl bg-gray-900 p-6 text-center text-white shadow-lg">
          <h1 className="text-3xl font-bold">
            Study To-Do List
          </h1>

          <p className="mt-2 text-gray-300">
            Manage your tasks and deadlines
          </p>
        </div>

        {/* Add Task */}
        <div className="mb-6 rounded-xl bg-white p-5 shadow-md">
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              type="text"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  addTask()
                }
              }}
              placeholder="Enter a new task..."
              className="flex-1 rounded-lg border-2 border-gray-300 px-4 py-3 outline-none focus:border-gray-900"
            />

            <button
              onClick={addTask}
              className="rounded-lg bg-gray-900 px-6 py-3 font-bold text-white hover:bg-gray-700"
            >
              + Add Task
            </button>
          </div>
        </div>

        {/* Task Summary */}
        <div className="mb-6 grid grid-cols-3 gap-3">
          <div className="rounded-xl bg-white p-4 text-center shadow">
            <p className="text-sm text-gray-500">
              Total Tasks
            </p>
            <p className="text-2xl font-bold">
              {tasks.length}
            </p>
          </div>

          <div className="rounded-xl bg-white p-4 text-center shadow">
            <p className="text-sm text-gray-500">
              Done
            </p>
            <p className="text-2xl font-bold text-green-600">
              {tasks.filter((item) => item.completed).length}
            </p>
          </div>

          <div className="rounded-xl bg-white p-4 text-center shadow">
            <p className="text-sm text-gray-500">
              Not Done
            </p>
            <p className="text-2xl font-bold text-red-600">
              {tasks.filter((item) => !item.completed).length}
            </p>
          </div>
        </div>

        {/* Task List */}
        <div className="mb-6 rounded-xl bg-white p-5 shadow-md">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-bold">
              My Tasks
            </h2>

            {tasks.length > 0 && (
              <button
                onClick={clearTasks}
                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-bold text-white hover:bg-red-700"
              >
                Clear All
              </button>
            )}
          </div>

          {tasks.length === 0 ? (
            <div className="rounded-lg border-2 border-dashed border-gray-300 p-8 text-center text-gray-500">
              No tasks yet. Add your first task!
            </div>
          ) : (
            <div className="space-y-3">
              {tasks.map((item) => (
                <div
                  key={item.id}
                  className={`flex flex-col gap-3 rounded-lg border-2 p-4 sm:flex-row sm:items-center sm:justify-between ${
                    item.completed
                      ? "border-green-300 bg-green-50"
                      : "border-gray-200 bg-gray-50"
                  }`}
                >
                  <div className="flex-1">
                    <p
                      className={`text-lg font-semibold ${
                        item.completed
                          ? "text-gray-500 line-through"
                          : "text-gray-900"
                      }`}
                    >
                      {item.text}
                    </p>

                    <p
                      className={`mt-1 text-sm font-bold ${
                        item.completed
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      Status:{" "}
                      {item.completed
                        ? "DONE"
                        : "NOT DONE"}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => toggleTask(item.id)}
                      className={`rounded-lg px-4 py-2 text-sm font-bold text-white ${
                        item.completed
                          ? "bg-orange-500 hover:bg-orange-600"
                          : "bg-green-600 hover:bg-green-700"
                      }`}
                    >
                      {item.completed
                        ? "Mark Not Done"
                        : "Mark Done"}
                    </button>

                    <button
                      onClick={() => deleteTask(item.id)}
                      className="rounded-lg bg-red-600 px-4 py-2 text-sm font-bold text-white hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* User Guide */}
        <div className="rounded-xl bg-white p-6 shadow-md">
          <h2 className="mb-4 text-xl font-bold">
            User Guide
          </h2>

          <div className="space-y-3 text-gray-700">
            <p>
              <strong>1. Add a task:</strong> Type your task
              in the input box and click "Add Task".
            </p>

            <p>
              <strong>2. Mark as Done:</strong> Click "Mark
              Done" when you finish a task.
            </p>

            <p>
              <strong>3. Mark as Not Done:</strong> Click
              "Mark Not Done" if you want to return the task
              to an unfinished status.
            </p>

            <p>
              <strong>4. Delete a task:</strong> Click
              "Delete" to permanently remove a task.
            </p>

            <p>
              <strong>5. Clear All:</strong> Click "Clear
              All" to remove all tasks.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>DCIT 26 - Application Development</p>
          <p className="mt-1">
            React + Tailwind CSS
          </p>
        </div>

      </div>
    </div>
  )
}

export default App
