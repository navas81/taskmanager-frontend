import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const API_URL = "http://localhost:5000/api/tasks";

const TasksPage = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  // Redirect if no token
  useEffect(() => {
    if (!token) navigate("/login");
  }, [token, navigate]);

  // Fetch tasks
  const fetchTasks = async () => {
    try {
      const res = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(res.data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  };

  // Create new task
  const createTask = async () => {
    if (!title.trim()) return;
    try {
      const res = await axios.post(
        API_URL,
        { title, description },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTasks([res.data.task, ...tasks]);
      setTitle("");
      setDescription("");
    } catch (err) {
      console.error("Error creating task:", err);
    }
  };

  // Delete a task
  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(tasks.filter((t) => t._id !== id));
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  // Toggle task status
  const toggleStatus = async (id, status) => {
    try {
      const res = await axios.put(
        `${API_URL}/${id}`,
        { status: !status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTasks(tasks.map((t) => (t._id === id ? res.data.task : t)));
    } catch (err) {
      console.error("Error updating task:", err);
    }
  };

  // Logout handler
  const handleLogout = () => {
  localStorage.removeItem("token");
  toast.info("👋 Logged out!");
  setTimeout(() => navigate("/login"), 1500);
};


  useEffect(() => {
    fetchTasks();
  }, );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white p-6">
      <div className="bg-white/20 backdrop-blur-lg p-6 rounded-2xl shadow-xl w-full max-w-lg border border-white/30">
        {/* Header + Logout */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-center">📝 My Task Manager</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-all"
          >
            Logout
          </button>
        </div>

        {/* Add Task Form */}
        <div className="flex flex-col space-y-2 mb-5">
          <input
            type="text"
            placeholder="Task title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="px-4 py-2 rounded-lg text-gray-800"
          />
          <textarea
            placeholder="Task description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="px-4 py-2 rounded-lg text-gray-800"
          />
          <button
            onClick={createTask}
            className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg transition-all"
          >
            Add Task
          </button>
        </div>

        {/* Task List */}
        {tasks.length === 0 ? (
          <p className="text-center text-white/80 italic">
            No tasks yet. Add your first task!
          </p>
        ) : (
          <ul className="space-y-3 max-h-80 overflow-y-auto">
            {tasks.map((task) => (
              <li
                key={task._id}
                className={`flex justify-between items-center bg-white/30 px-3 py-2 rounded-lg ${
                  task.status ? "line-through text-gray-300" : "text-white"
                }`}
              >
                <div
                  onClick={() => toggleStatus(task._id, task.status)}
                  className="cursor-pointer"
                >
                  <h3 className="font-semibold">{task.title}</h3>
                  {task.description && (
                    <p className="text-sm text-white/70">{task.description}</p>
                  )}
                </div>
                <button
                  onClick={() => deleteTask(task._id)}
                  className="text-red-300 hover:text-red-500 font-semibold"
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TasksPage;
