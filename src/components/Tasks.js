import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Plus, Trash2, ClipboardList } from "lucide-react";

const Task = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/tasks", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(res.data);
    } catch (error) {
      console.error("Fetch tasks error:", error);
    } finally {
      setLoading(false);
    }
  };

  



const AddTask = ({ fetchTasks }) => {
  // 🧩 Define states for title and description
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // 🧠 Add task function
  const addTask = async () => {
    if (!title.trim()) {
      alert("Please enter a task title.");
      return;
    }

    try {
      const token = localStorage.getItem("token"); // JWT from login

      const res = await axios.post(
        "http://localhost:5000/api/tasks",
        { title, description }, // ✅ sending data
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Task added:", res.data);
      alert("✅ Task added successfully!");

      // Clear input fields
      setTitle("");
      setDescription("");

      // Refresh task list if parent function is provided
      if (fetchTasks) fetchTasks();

    } catch (error) {
      console.error("Error adding task:", error.response?.data || error.message);
      alert("❌ Failed to add task. Check console for details.");
    }
  };

  return (
    <div className="p-4 bg-gray-900 rounded-xl shadow-lg flex flex-col gap-3 max-w-md mx-auto mt-4">
      <input
        type="text"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="p-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none"
      />

      <textarea
        placeholder="Task description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="p-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none"
      />

      <button
        onClick={addTask}
        className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl transition"
      >
        Add Task
      </button>
    </div>
  );
};



  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (error) {
      console.error("Delete task error:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    

    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex flex-col items-center justify-center p-6">
      {/* Card Container */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white/90 backdrop-blur-md shadow-2xl rounded-3xl p-8 w-full max-w-xl"
      >
        {/* Header */}
        <h1 className="text-3xl font-extrabold text-center text-indigo-700 flex items-center justify-center gap-2 mb-6">
          <ClipboardList className="w-7 h-7 text-indigo-600" />
          My Task Manager
        </h1>

        {/* Input */}
        <div className="flex gap-2 mb-6">
          <input
            type="text"
            placeholder="Enter a new task..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            className="flex-1 border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
          />
          <button
            onClick={addTask}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl flex items-center gap-1 transition-all"
          >
            <Plus size={18} /> Add
          </button>
        </div>

        {/* Task List */}
        {loading ? (
          <p className="text-center text-gray-500">Loading tasks...</p>
        ) : tasks.length === 0 ? (
          <p className="text-center text-gray-400">
            No tasks yet. Add your first task! ✨
          </p>
        ) : (
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {tasks.map((task) => (
              <motion.div
                key={task._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-r from-indigo-100 to-indigo-50 shadow-md rounded-xl p-3 flex justify-between items-center hover:shadow-lg transition-all"
              >
                <span className="text-gray-800 font-medium">{task.title}</span>
                <button
                  onClick={() => deleteTask(task._id)}
                  className="text-red-500 hover:text-red-700 transition"
                >
                  <Trash2 size={18} />
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Task;
